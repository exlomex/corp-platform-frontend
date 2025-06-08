import { classNames } from '@/shared/lib/classNames';
import cls from './TaskInfoContent.module.scss';
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {useSelector} from "react-redux";
import {
    AddTaskFileService, AddTaskFileServiceInputData,
    getSelectedTaskInfo,
    getSelectedTaskInfoIsFetching,
    getSelectedTaskUniqueTitle, getTaskNavigationHistory, RemoveTaskFileService,
    TaskActions, UploadTaskFileInputData, UploadTaskFileService
} from "@/entities/Task";
import {EditableTitle} from "@/features/TaskInfo/EditableTitle/ui/EditableTitle.tsx";
import {Button} from "@/shared/ui/Button";
import MediumPlusIcon from "@/shared/assets/icons/mediumPlusIcon.svg"
import {EditableDescription} from "@/features/TaskInfo/EditableDescription/ui/EditableDescription.tsx";
import {Typography} from "@/shared/ui/Typography";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";
import {CommentActions} from "@/features/TaskInfo";
import {useNavigate} from "react-router";
import BackIcon from '@/shared/assets/icons/backIcon.svg'
import {AdditionalTaskInfo} from "../../AdditionalTaskInfo/AdditionalTaskInfo.tsx";
import {StatusActions} from "@/entities/Status";
import {EditableTaskPriority} from "../../EditableTaskPriority/EditableTaskPriority.tsx";
import {DropDown, DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {Theme} from "@/shared/types/theme.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {TaskFileWrapper} from "@/features/File";
import SubtasksIcon from '@/shared/assets/icons/subtasksIcon.svg'
import ClipPaperIcon from '@/shared/assets/icons/mediumClipPaperIcon.svg'
import {EditableTaskStoryPoints} from "../../EditableTaskStoryPoints/EditableTaskStoryPoints.tsx";
import {EditableTaskDeadline} from "../../EditableTaskDeadline/EditableTaskDeadline.tsx";
import {TaskInfoTabs} from "../../TaskInfoTabs/TaskInfoTabs.tsx";
import {useTaskSearchParams} from "@/shared/hooks/useTaskSearchParams";
import {getSelectedTaskSnapshots} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {FetchTaskSnapshots} from "@/features/TaskInfo/Snapshots/model/services/fetchTaskSnapshots.ts";

interface TaskInfoContentProps {
    className?: string;
}

export const TaskInfoContent = (props: TaskInfoContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const selectedUniqueTitle = useSelector(getSelectedTaskUniqueTitle)
    const selectedProject = useSelector(getProjectSelectedProject)

    const {selectedTaskType, selectedSnapshotVersion, selectedTask, queryParams} = useTaskSearchParams()

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const taskSnapshots = useSelector(getSelectedTaskSnapshots)

    useEffect(() => {
        if (selectedProject) {
            if (selectedTaskType === 'snapshot') {
                const fetchData = async () => {
                    if (!taskSnapshots) {
                        if (!selectedTaskInfo) {
                            const response = await dispatch(fetchTaskInfoService({
                                uniqueTitle: selectedUniqueTitle,
                                projectId: selectedProject?.id,
                                dispatchData: false
                            })).unwrap();
                            const fetchedTaskSnapshots = await dispatch(FetchTaskSnapshots({taskId: response.id})).unwrap();
                            const currentSnapshot = fetchedTaskSnapshots.find(snapshot => String(snapshot.version) === selectedSnapshotVersion);
                            if (currentSnapshot) {
                                dispatch(TaskActions.setSelectedTaskInfo(currentSnapshot.snapshot))
                            }
                        }
                    } else {
                        const currentSnapshot = taskSnapshots.find(
                            snapshot => String(snapshot.version) === selectedSnapshotVersion
                        );
                        console.log(currentSnapshot, selectedTaskInfo);
                        if (
                            currentSnapshot
                        ) {
                            console.log(131312);
                            dispatch(TaskActions.setSelectedTaskInfo(currentSnapshot.snapshot));
                        }
                    }
                };

                fetchData();
            }

            if (selectedTaskType === 'task') {
                if (!selectedTaskInfo && selectedUniqueTitle) {
                    dispatch(fetchTaskInfoService({uniqueTitle: selectedUniqueTitle, projectId: selectedProject?.id}))
                }
            }
        }
    }, [dispatch, selectedProject, selectedSnapshotVersion, selectedTaskType, selectedUniqueTitle, taskSnapshots]);


    const selectedTaskInfoIsFetching = useSelector(getSelectedTaskInfoIsFetching)

    const [isEditTitleActive, setIsEditTitleActive] = useState<boolean>(false)
    const [isEditDescriptionActive, setIsEditDescriptionActive] = useState<boolean>(false)

    // if (!selectedTaskInfo || selectedTaskInfoIsFetching) {
    //     return  <div className={classNames(cls.TaskInfoContent, {}, [className])}></div>
    // }

    useEffect(() => {
        if (selectedTaskInfo && selectedTaskInfo.id) {
            dispatch(FetchCommentsService({taskId: selectedTaskInfo?.id}))
        }
    }, [dispatch, selectedTaskInfo]);

    const navigate = useNavigate()

    const onSubtaskClickHandler = (taskTitle: string) => () => {
        if (selectedSnapshotVersion) {
            dispatch(TaskActions.pushToNavigationHistory({
                historyTaskType: "snapshot",
                uniqueTitle: selectedTask,
                selectedSnapshotVersion: selectedSnapshotVersion,
            }))
        } else if (selectedTask) {
            dispatch(TaskActions.pushToNavigationHistory({
                historyTaskType: "task",
                uniqueTitle: selectedTask,
            }))
        }

        dispatch(StatusActions.setSelectedTaskBoardStatuses([]))
        dispatch(TaskActions.setSelectedTaskInfo(undefined))
        dispatch(CommentActions.resetSlice())
        // dispatch(TaskActions.setSelectedTaskUniqueTitle(''))

        setIsEditDescriptionActive(false)

        navigate({
            pathname: location.pathname,
            search: `?selectedTask=${taskTitle}`,
        });
    }


    const taskHistory = useSelector(getTaskNavigationHistory);

    const onBackButtonClickHandler = () => {
        if (taskHistory.length === 0) return;

        const previousHistoryItem = taskHistory[taskHistory.length - 1];

        dispatch(TaskActions.popFromNavigationHistory());
        dispatch(TaskActions.setSelectedTaskInfo(undefined));
        dispatch(CommentActions.resetSlice());
        dispatch(StatusActions.setSelectedTaskBoardStatuses([]))
        setIsEditDescriptionActive(false)

        if (previousHistoryItem.historyTaskType === 'task') {
            navigate({
                pathname: location.pathname,
                search: `?selectedTask=${previousHistoryItem.uniqueTitle}`,
            });
        } else {
            navigate({
                pathname: location.pathname,
                search: `?selectedTask=${previousHistoryItem.uniqueTitle}&selectedSnapshotVersion=${previousHistoryItem.selectedSnapshotVersion}`,
            });
        }
    };

    const AddToTaskButtonItems: DropdownItem[] = [
        {
            content: (<span className={classNames(cls.Item, {}, [cls.SubTaskIcon])}><SubtasksIcon/> Подзадачу</span>),
            onClick: () => {dispatch(TaskActions.setIsOpenSubTaskModal(true))}
        },
        {
            content: (<span className={classNames(cls.Item, {}, [cls.ClipPaperIcon])}><ClipPaperIcon/> Вложение</span>),
            onClick: () => inputRef.current?.click()
        },
    ]

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const uploadBody: UploadTaskFileInputData = {
                file: file,
                projectId: selectedProject.id
            }
            try {
                const uploadFile = await dispatch(UploadTaskFileService(uploadBody)).unwrap()
                    // .then(resFile => setTaskFiles([...taskFiles, resFile]));
                const addFileBody: AddTaskFileServiceInputData = {
                    taskId: selectedTaskInfo.id,
                    addData: {url: uploadFile.url},
                    projectId: selectedProject.id
                }

                await dispatch(AddTaskFileService(addFileBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle, projectId: selectedProject.id})).unwrap()
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log('Ошибка добавление файла');
        }
    };

    const onFileDeleteHandler = (fileId: number) => async () => {
        try {
             await dispatch(RemoveTaskFileService({fileId, taskId: selectedTaskInfo.id, projectId: selectedProject.id})).unwrap()
             await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle, projectId: selectedProject.id})).unwrap()
        } catch (e) {
            console.error(e)
        }
    }

    const DetailsTaskOptions: {
        label: string,
        content: ReactNode
    }[] = [
        {
            label: 'Приоритет:',
            content: <EditableTaskPriority />
        },
        {
            label: 'Оценка:',
            content: <EditableTaskStoryPoints/>
        },
        {
            label: 'Сделать до:',
            content: <EditableTaskDeadline/>
        },
    ]

    return (
        <div className={classNames(cls.TaskInfoContent, {}, [className])}>
            <div className={cls.TaskInfoLeftSide}>
                {taskHistory.length >= 1 && <Button buttonType={'SMART_WITH_ICON_BTN_OUTLINED'} onClick={onBackButtonClickHandler} className={cls.PrevButton}><BackIcon/> Назад</Button>}

                <div className={cls.editableTitleWrapper}>
                    {(!selectedTaskInfo || selectedTaskInfoIsFetching)
                        ? <Typography className={cls.FieldName} size={'PARAGRAPH-18-REGULAR'}>Задача</Typography>
                        : <EditableTitle
                            uniqueTitle={selectedTaskInfo.uniqueTitle}
                            className={cls.EditableTitle}
                            taskTitle={selectedTaskInfo.title}
                            taskId={selectedTaskInfo.id}
                            boardId={selectedTaskInfo.boardId}
                            taskDescription={selectedTaskInfo.description}
                            isEditTitleActive={isEditTitleActive}
                            setIsEditTitleActive={setIsEditTitleActive}
                        />
                    }

                </div>

                <DropDown
                    menuItemsClassName={cls.CustomDropDown}
                    items={AddToTaskButtonItems}
                    trigger={<Button className={cls.ExtraAddButton} buttonType={'SMART_WITH_ICON_BTN_OUTLINED'}><MediumPlusIcon/>Добавить</Button>}
                    direction={'bottom start'}
                    gap={6}
                    fSize={14}
                    theme={Theme.LIGHT_THEME}
                />

                <input
                    type="file"
                    className={cls.HiddenInput}
                    ref={inputRef}
                    onChange={handleFileChange}
                />

                <Typography size={'PARAGRAPH-18-REGULAR'}>Детали задачи</Typography>

                <div className={cls.TaskDetails}>
                    {DetailsTaskOptions.map((option, index) => (
                        <div key={index} className={cls.TaskDetailOption}>
                            <p className={cls.TaskDetailsLabel}>{option.label} </p>
                            <div className={cls.DetailsTaskOptionsContent}>{option.content}</div>
                        </div>
                    ))

                    }
                </div>

                {(!selectedTaskInfo || selectedTaskInfoIsFetching)
                    ? <Typography className={cls.FieldName} size={'TEXT-20-MEDIUM'}>Описание</Typography>
                    : <EditableDescription
                        className={cls.EditableTitle}
                        taskTitle={selectedTaskInfo.title}
                        taskId={selectedTaskInfo.id}
                        uniqueTitle={selectedTaskInfo.uniqueTitle}
                        boardId={selectedTaskInfo.boardId}
                        taskDescription={selectedTaskInfo.description}
                        isEditDescriptionActive={isEditDescriptionActive}
                        setIsEditDescriptionActive={setIsEditDescriptionActive}
                    />
                }

                { selectedTaskInfo?.files.length > 0 && <div>
                    <Typography size={'PARAGRAPH-18-REGULAR'}>Вложения</Typography>

                    <div className={cls.TaskFiles}>
                        {selectedTaskInfo.files.map(file => <TaskFileWrapper key={file.id} file={file} onFileDelete={onFileDeleteHandler(file.id)}/>)}
                    </div>
                </div>
                }

                <div className={cls.TaskChildrenWrapper}>
                    {selectedTaskInfo && !selectedTaskInfoIsFetching && selectedTaskInfo?.subtasks.length >= 1 && (
                        <>
                            <Typography size={'PARAGRAPH-18-REGULAR'}>Подзадачи</Typography>
                            <span className={cls.SubTaskLine}></span>

                            <div className={cls.SubTasks}>
                                {selectedTaskInfo.subtasks.map(subTask => (
                                    <div key={subTask.id} className={cls.Subtask} onClick={onSubtaskClickHandler(subTask.uniqueTitle)}>
                                        <span className={cls.SubTaskUniqueTitle}>{subTask.uniqueTitle}</span>
                                        <span className={cls.SubTaskTitle}>{subTask.title}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )

                    }
                </div>

                {selectedTaskInfo && <TaskInfoTabs/>}
            </div>

            <AdditionalTaskInfo/>
        </div>
    )
};
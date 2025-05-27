import { classNames } from '@/shared/lib/classNames';
import cls from './CreateExtendedTaskModalContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {ComboBox, ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useSelector} from "react-redux";
import {getProjectUserProjects} from "@/entities/Project";
import {getCreateTaskBoardsBySelectedProject} from "@/entities/Board";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useLocation, useParams} from "react-router";
import {Input} from "@/shared/ui/Input";
import {getUserCompanyId, getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUsersByCompanyIdService} from "@/entities/User";
import {Button} from "@/shared/ui/Button";
import {
    createNewTaskService,
    createNewTaskServiceInputData
} from "@/features/CreateNewTask/model/services/createNewTaskService.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {priorityOptions} from "@/features/CreateNewTask/const/priorityConsts.tsx";
import {FetchProjectTreeTasksService, Priority, UploadTaskFileInputData, UploadTaskFileService} from "@/entities/Task";
import PaperClipIcon from "@/shared/assets/icons/Paperclip.svg";
import {File as FileI, TaskFileWrapper} from "@/features/File";
import {CalendarPopover} from "@/features/TasksFilters/ui/CalendarPopover/CalendarPopover.tsx";
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";
import {getRouteMain, getRouteProjectBoard} from "@/shared/const/router.ts";

interface CreateExtendedTaskModalContentProps {
    className?: string;
    onCloseModalHandler: () => void;
}

export const CreateExtendedTaskModalContent = (props: CreateExtendedTaskModalContentProps) => {
    const { className, onCloseModalHandler } = props;

    const params = useParams();
    const dispatch = useAppDispatch()

    // projects
    const [normalizedProjects, setNormalizedProjects] = useState<ComboBoxOption[]>(null)
    const userProjects = useSelector(getProjectUserProjects)
    const selectedProject = useSelector(getProjectSelectedProject)

    const [pickedProject, setPickedProject] = useState<ComboBoxOption>(null)

    useEffect(() => {
        if (userProjects?.length) {
            setNormalizedProjects(
                userProjects.map(project => {
                    return {
                        id: project.id,
                        label: project.title,
                        value: project.title
                    }})
            )
        }
    }, [userProjects]);

    useEffect(() => {
        if (normalizedProjects && selectedProject) {
            setPickedProject(normalizedProjects.find(project => project.id === selectedProject.id))
        }
    }, [normalizedProjects, selectedProject]);

    const onSelectProjectHandler = () => {
        validateBoard(pickedBoard.value)
    }

    // boards
    const [normalizedBoards, setNormalizedBoards] = useState<ComboBoxOption[]>(null)

    useEffect(() => {
        if (pickedProject && pickedProject.id) {
            dispatch(FetchUserBoardsByProjectId({projectId: pickedProject.id, fetchType: 'create'}))
        }
    }, [dispatch, pickedProject]);

    const userBoards = useSelector(getCreateTaskBoardsBySelectedProject)
    const [pickedBoard, setPickedBoard] = useState<ComboBoxOption>(null)
    const [boardError, setBoardError] = useState<string>('')

    const validateBoard = (value: string) => {
        if (!value) {
            setBoardError('Необходимо выбрать доску');
            return 'Необходимо выбрать доску';
        } else {
            setBoardError('')
            return '';
        }
    }

    useEffect(() => {
        if (userBoards?.length) {
            const userSelectedBoard = userBoards.find(board => board.id === +params.board)
            if (userSelectedBoard) {
                setPickedBoard({
                    label: userSelectedBoard.title,
                    value: userSelectedBoard.title,
                    id: userSelectedBoard.id
                })
            }

            setNormalizedBoards(
                userBoards.map(project => {
                    return {
                        id: project.id,
                        label: project.title,
                        value: project.title
                    }})
            )
        } else {
            setNormalizedBoards([{
                label: 'Не выбрано',
                value: ''
            }])
        }
    }, [params.board, userBoards, userProjects]);

    useEffect(() => {
        if (normalizedBoards && !pickedBoard) {
            setPickedBoard(normalizedBoards[0])
        }
    }, [normalizedBoards, pickedBoard]);

    useEffect(() => {
        if (pickedBoard?.value) {
            setBoardError('')
        }
    }, [pickedBoard]);

    // title
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskTitleError, setTaskTitleError] = useState<string>('');

    const validateTitle = (value: string) => {
        if (value.trim() === '') {
            const error = 'Название задачи не может быть пустым'
            setTaskTitleError(error);
            return error
        } else {
            setTaskTitleError('');
            return ''
        }
    };
    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e?.target?.value)
        // validateTitle(e?.target?.value)
    }

    const onTaskTitleBlur = () => {
        validateTitle(taskTitle);
    };

    // priority
    const [selectedPriority, setSelectedPriority] = useState<ComboBoxOption>(null)


    // description
    const [descriptionTitle, setDescriptionTitle] = useState<string>('')

    const onTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionTitle(e?.target?.value)
    }

    // assignee
    const [normalizedUser, setNormalizedUser] = useState<ComboBoxOption[]>(null)
    const [pickedUser, setPickedUser] = useState<ComboBoxOption>(null)

    const selectedCompanyId = useSelector(getUserCompanyId)

    useEffect(() => {
        if (selectedCompanyId) {
            dispatch(FetchUsersByCompanyIdService({companyId: selectedCompanyId}))
        }
    }, [dispatch, selectedCompanyId]);

    const companyUsers = useSelector(getUserCompanyUsers)

    useEffect(() => {
        if (companyUsers?.length) {
            setNormalizedUser(
                [{ label: 'Не выбрано', value: '' },
                    ...companyUsers.map(user => {
                        return {
                            id: user.id,
                            label: `${user.firstName} ${user.lastName}`,
                            value: user.firstName,
                            data: {
                                image: user.imageUrl
                            }
                        }})
                ]
            )
        }
    }, [companyUsers]);

    const locate = useLocation();

    const selectedBoard = +params.board
    const onSubmitCreateButton = async () => {
        const error = validateTitle(taskTitle)
        const localBoardError = validateBoard(pickedBoard.value)
        const filesArray = messageFiles.map(file => file.url)

        if (!localBoardError && !taskTitleError && !error) {
            const createBody: createNewTaskServiceInputData = {
                title: taskTitle,
                projectId: +selectedProject.id,
                boardId: +pickedBoard.id,
                ...(descriptionTitle && { description: descriptionTitle }),
                ...(pickedUser?.id && { assignedTo: pickedUser.id }),
                ...(selectedPriority?.value && {priority: selectedPriority.value as keyof typeof Priority}),
                ...(storyPoints && storyPoints !== '' && { storyPoints: +storyPoints }),
                ...(deadlineTo && { deadLine: dateConverter(deadlineTo)}),
                files: filesArray
            }
            const currentPath = decodeURIComponent(location.pathname)

            try {
                await dispatch(createNewTaskService(createBody)).unwrap()

                if (currentPath === getRouteMain()) {
                    await dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id})).unwrap()
                }

                if (selectedBoard === pickedBoard.id) {
                    await dispatch(FetchBoardTasks({boardId: selectedBoard, projectId: selectedProject.id})).unwrap()
                }

                onCloseModalHandler()
            } catch (e) {
                console.error(e?.message || e)
            }
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const [messageFiles, setMessageFiles] = useState<FileI[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // && file.size <= 3.5 * 1024 * 1024
        if (file) {
            const uploadBody: UploadTaskFileInputData = {
                file: file,
                projectId: selectedProject.id
            }
            try {
                await dispatch(UploadTaskFileService(uploadBody)).unwrap()
                    .then(resFile => setMessageFiles([...messageFiles, resFile]));
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log('Ошибка добавление файла');
        }
    };

    const onDeleteFileHandler = (fileId: number) => () => {
        setMessageFiles(messageFiles.filter((file) => fileId !== file.id));
    }

    const [deadlineTo, setDeadlineTo] = useState<Date>(null)
    const [storyPoints, setStoryPoints] = useState<string>('')

    return (
        <div className={classNames(cls.CreateExtendedTaskModalContent, {}, [className])}>
            <form >
                <Typography size={'PARAGRAPH-18-MEDIUM'}>Новая задача</Typography>
                <Typography className={cls.SubTitle} size={'PARAGRAPH-16-REGULAR'}>Обязательные поля отмечены звездочкой<span>*</span></Typography>

                <div className={cls.FormField}>
                    <p className={cls.fieldLabel}>Проект<span>*</span></p>
                    {normalizedProjects && pickedProject && <ComboBox value={pickedProject} onSelectAction={onSelectProjectHandler} setStateFunc={setPickedProject} options={normalizedProjects}/>}
                </div>

                <div className={cls.FormField}>
                    <p className={cls.fieldLabel}>Доска<span>*</span></p>
                    {normalizedBoards &&
                        <ComboBox value={pickedBoard} setStateFunc={setPickedBoard} options={normalizedBoards}/>}
                    {boardError && <span className={cls.Error}>{boardError}</span>}
                </div>

                <div className={cls.FormFieldTitle}>
                    <p className={cls.fieldLabel}>Название задачи<span>*</span></p>
                    <Input className={cls.FormTitle} value={taskTitle} onBlur={onTaskTitleBlur} onChange={onTaskTitleChange}
                           variant={'SMART_INPUT'}/>
                    <span className={cls.Error}>{taskTitleError}</span>
                </div>

                <div className={cls.PriorityWrapper}>
                    <p>Приоритет задачи</p>
                    <ComboBox withSvgComponent options={priorityOptions} value={selectedPriority} setStateFunc={setSelectedPriority}/>
                </div>

                <div className={cls.FormComboFields}>
                    <div>
                        <p className={cls.fieldLabel}>Оценка Story Points</p>
                        <input value={storyPoints} onChange={(e: ChangeEvent<HTMLInputElement>) => setStoryPoints(e.target.value)} type="number" className={cls.StoryPointInput}/>
                    </div>

                    <div>
                        <p className={cls.fieldLabel}>Сделать до</p>
                        <CalendarPopover disablePast fullWidth isDateResettable activeDate={deadlineTo} setActiveDate={setDeadlineTo}/>
                    </div>
                </div>

                <div className={cls.FormField}>
                    <p className={cls.fieldLabel}>Описание</p>
                    <textarea className={cls.FormDescription} value={descriptionTitle} onChange={onTaskDescriptionChange}/>
                </div>

                <div className={cls.FormField}>
                    <p className={cls.fieldLabel}>Исполнитель</p>
                    <div>{normalizedUser && <ComboBox withImage value={pickedUser} setStateFunc={setPickedUser} options={normalizedUser}/>}</div>
                </div>

                {messageFiles && <div className={cls.TasksFilesWrapper}>
                    {messageFiles.map((file) => (
                        <TaskFileWrapper fileVariant={'CreateTask'} key={file.id} file={file} onFileDelete={onDeleteFileHandler(file.id)}/>
                    ))}
                </div>}

                <div className={cls.FormBottomLine}>
                    <input
                        type="file"
                        className={cls.HiddenInput}
                        ref={inputRef}
                        onChange={handleFileChange}
                    />
                    <Button onClick={() => inputRef.current?.click()} buttonType={'SMART_ICON_BTN_TRANSPARENT'}><PaperClipIcon/>Прикрепить файл</Button>

                    <div className={cls.FormBottomLineRightButtons}>
                        <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onCloseModalHandler}>Отмена</Button>
                        <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitCreateButton}>Создать</Button>
                    </div>
                </div>
            </form>
        </div>
    )
};
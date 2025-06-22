import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalEditableTaskParent.module.scss';
import {useSelector} from "react-redux";
import {
    getBoardTasks,
    getSelectedTaskInfo
} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {useEffect, useRef, useState} from "react";
import {
    AddSubTaskInputData,
    AddSubTaskService, FetchProjectTreeTasksService,
    RemoveSubTaskInputData,
    RemoveSubTaskService,
    TaskI
} from "@/entities/Task";
import {ComboBox, ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Skeleton} from "@/shared/ui/Skeleton";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {prepareFiltersFromState} from "@/features/TasksFilters";
import {getRouteMain} from "@/shared/const/router.ts";
import {getTaskFiltersState} from "@/features/TasksFilters/model/selectors/getTaskFilters.ts";

interface EditableTaskParentProps {
    className?: string;
    editIsPossible: boolean
}

export const AdditionalEditableTaskParent = (props: EditableTaskParentProps) => {
    const { className, editIsPossible } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const dispatch = useAppDispatch();

    const selectedProject = useSelector(getProjectSelectedProject)
    const boardTasks = useSelector(getBoardTasks)

    const filtersState = useSelector(getTaskFiltersState);

    useEffect(() => {
        if (selectedTaskInfo) {
            dispatch(FetchBoardTasks({boardId: selectedTaskInfo?.boardId, projectId: selectedProject?.id}))
        }
    }, [dispatch, filtersState, selectedProject, selectedTaskInfo]);

    const filteredBoardTasks = useRef<TaskI[]>(null)
    const [normalizedBoardTasks, setNormalizedBoardTasks] = useState<ComboBoxOption[]>(null)

    useEffect(() => {
        if (boardTasks.length >= 1 && selectedTaskInfo?.id) {
            filteredBoardTasks.current = boardTasks.filter(task => task.id !== selectedTaskInfo?.id)

            setNormalizedBoardTasks(
                [{ label: 'Не выбрано', value: '' },
                    ...filteredBoardTasks.current.map(task => {
                        return {
                            id: task.id,
                            label: `${task.uniqueTitle} ${task.title}`,
                            value: task.uniqueTitle
                        }})]
            )
        }
    }, [boardTasks, selectedTaskInfo]);

    const [selectedTask, setSelectedTask] = useState<ComboBoxOption>(null)

    useEffect(() => {
        const parent = selectedTaskInfo?.parent

        if (parent) {
            setSelectedTask({
                id: parent.id,
                label: parent.title,
                value: parent.uniqueTitle
            })
        } else {
            setSelectedTask(null)
        }
    }, [selectedTaskInfo]);

    const onSelectNewParentHandler = async (option: ComboBoxOption) => {
        if (selectedTaskInfo?.id) {
            if (option.value === '' && !selectedTaskInfo?.parent) {
                setEditIsActive(false)
                return
            }

            if (option?.id === selectedTaskInfo?.parent?.id) {
                setEditIsActive(false)
                return
            }

            const filters = prepareFiltersFromState({
                ...filtersState,
            });

            if (option?.id) {
                const AddSubTaskBody: AddSubTaskInputData = {
                    createData: {
                        parentTaskId: option.id,
                        subtaskId: selectedTaskInfo.id
                    },
                    projectId: selectedProject.id
                }

                try {
                    await dispatch(AddSubTaskService(AddSubTaskBody)).unwrap()
                    await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo?.uniqueTitle, projectId: selectedProject.id})).unwrap()
                    setEditIsActive(false)

                    if (location.pathname === getRouteMain()) {
                        dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id, filters: filters}))
                    }
                } catch (e) {
                    setEditIsActive(false)
                    console.error(e)
                }
            } else {
                const RemoveSubTaskBody: RemoveSubTaskInputData = {
                    removeData: {
                        parentTaskId: selectedTaskInfo?.parent?.id,
                        subtaskId: selectedTaskInfo.id
                    },
                    projectId: selectedProject.id
                }

                try {
                    await dispatch(RemoveSubTaskService(RemoveSubTaskBody)).unwrap()
                    await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo?.uniqueTitle, projectId: selectedProject.id})).unwrap()

                    if (location.pathname === getRouteMain()) {
                        dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id, filters: filters}))
                    }
                    setEditIsActive(false)
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    const [editIsActive, setEditIsActive] = useState<boolean>(false)

    useEffect(() => {
        console.log(selectedTask);
    }, [selectedTask]);

    return (
        <div className={classNames(cls.EditableTaskParent, {}, [className])}>
            {
                !editIsActive ? (
                    selectedTaskInfo ? (
                        <div
                            onClick={() => {
                                if (editIsPossible) {
                                    setEditIsActive(true);
                                }
                            }}
                            className={classNames(cls.ParentNameWrapper, { [cls.EditIsNotPossible]: !editIsPossible }, [])}
                        >
                            <div className={cls.ParentNameBg}></div>
                            <div className={cls.ParentName}>{selectedTaskInfo.parent?.title
                                ? `${selectedTaskInfo.parent.uniqueTitle} ${selectedTaskInfo.parent.title}`
                                : 'Нет'}</div>
                        </div>
                    ) : (
                        <Skeleton height={30} width={140} border={6} />
                    )
                ) : (
                    <>
                        {normalizedBoardTasks && (
                            <ComboBox
                                value={selectedTask}
                                options={normalizedBoardTasks}
                                onSelectAction={onSelectNewParentHandler}
                            />
                        )}
                    </>
                )
            }

        </div>
    )
};

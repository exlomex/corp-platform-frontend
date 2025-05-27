import { classNames } from '@/shared/lib/classNames';
import cls from './AgileBoard.module.scss';
import {useEffect, useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {getIsUserBoardsFetching, getUserBoardsBySelectedProject} from "@/entities/Board";
import {useNavigate, useParams} from "react-router";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {ChangeStatusOrderService, getBoardStatuses, StatusActions, StatusI} from "@/entities/Status";
import {SortableColumn} from "@/entities/Column";
import {ChangeTaskStatusService, DraggableTask, TaskActions, TaskI} from "@/entities/Task";
import {DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getBoardTasks} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {TaskWrapper} from "@/entities/Task/ui/TaskWrapper/TaskWrapper.tsx";
import {CreateColumnNewTask} from "@/features/CreateNewTask";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {ColumnWrapper} from "@/entities/Column/ui/ColumnWrapper/ColumnWrapper.tsx";
import {CreateNewColumn} from "@/features/CreateNewColumn";
import {getUserAsideIsCollapsed} from "@/entities/User";

interface AgileBoardProps {
    className?: string;
}

export const AgileBoard = (props: AgileBoardProps) => {
    const { className } = props;

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const userBoards = useSelector(getUserBoardsBySelectedProject)
    const selectedProject = useSelector(getProjectSelectedProject)

    const userBoardsFetching = useSelector(getIsUserBoardsFetching)

    useEffect(() => {
        if (selectedProject && params.project) {
            if (userBoards.length >= 1 && params.board) {
                const isCorrectBoardPath = userBoards.findIndex(board => board.id === +params.board);
                if (isCorrectBoardPath !== undefined && isCorrectBoardPath !== -1) {
                    dispatch(FetchBoardStatuses({boardId: +params.board, projectId: selectedProject.id}))
                    dispatch(FetchBoardTasks({boardId: +params.board, projectId: selectedProject.id}))
                } else {
                    // navigate('/not')
                }
            }
        }
    }, [dispatch, navigate, params.board, params.project, selectedProject, userBoards]);

    const boardStatuses = useSelector(getBoardStatuses);
    const boardTasks = useSelector(getBoardTasks);

    const [activeTask, setActiveTask] = useState<Partial<TaskI>>({});
    const [activeColumn, setActiveColumn] = useState<Partial<StatusI>>({});

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const onDragEndHandle = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || String(active?.data?.current?.statusId) === String(over.id)) return;

        const activeId = String(active.id).replace(/^task-/, '').replace(/^column-/, '');
        if (String(active.id).startsWith('task-')) {
            try {
                dispatch(TaskActions.changeTaskStatus({taskId: +activeId, newStatusId: +over.id}))
                await dispatch(ChangeTaskStatusService({taskId: +activeId, statusId: +over.id, projectId: selectedProject.id})).unwrap()
                await dispatch(FetchBoardTasks({boardId: +params.board, projectId: selectedProject.id}))
            } catch (e) {
                console.error(e)
            }
        } else if (String(active.id).startsWith('column-')) {
            if (activeId === String(over.id)) return;

            try {
                dispatch(StatusActions.changeStatusOrder(
                    {
                        newStatusOrder: +over?.data?.current?.order,
                        oldStatusOrder: +active?.data?.current?.order,
                        overStatusId: +over.id,
                        activeStatusId: +activeId,
                    })
                )
                await dispatch(ChangeStatusOrderService({toOrder: +over?.data?.current?.order, statusId: +activeId, projectId:selectedProject.id})).unwrap()
                await dispatch(FetchBoardStatuses({boardId: +params.board, projectId: selectedProject.id})).unwrap()
            } catch (e) {
                console.error(e)
            }

        }

        if (active) {
            setActiveTask({})
            setActiveColumn({})
        }
    }

    const onTaskClickHandler = (taskTitle: string) => () => {
        navigate({
            pathname: location.pathname,
            search: `?selectedTask=${taskTitle}`,
        });
    }


    const boardId = +params.board || 0

    const isCollapsed = useSelector(getUserAsideIsCollapsed)

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({active}) => {
                if (String(active.id).startsWith('task-')) {
                    setActiveTask({
                        id: +active.id,
                        title: active?.data?.current?.title,
                        statusId: active?.data?.current?.statusId,
                        uniqueTitle: active?.data?.current?.uniqueTitle,
                    })
                }
                if (String(active.id).startsWith('column-')) {
                    setActiveColumn({
                        id: +String(active.id).replace('column-', ''),
                        title: active?.data?.current?.title,
                    })
                }
            }}
            onDragEnd={onDragEndHandle}
        >
            <div className={classNames(cls.AgileBoard, {[cls.isCollapsed]: isCollapsed}, [className])}>
                <div className={cls.AgileBoardWrapper}>
                    {boardStatuses && (
                        <SortableContext
                            items={boardStatuses.map(boardStatus => `column-${boardStatus.id}`)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {boardStatuses
                                .slice()
                                .sort((a, b) => a.order - b.order)
                                .map((boardStatus, index) => (
                                <SortableColumn
                                    key={boardStatus.id}
                                    boardId={boardId}
                                    boardStatus={boardStatus}
                                    createNewTask={(isHovered) => (
                                        <CreateColumnNewTask
                                            className={classNames('', {[cls.IsActiveOffset]: boardTasks.filter(task => task?.statusId === boardStatus.id).length >= 1}, [])}
                                            boardId={boardId} projectId={selectedProject.id || 0}
                                            statusId={boardStatus.id}
                                            isHovered={index === 0 ? true : isHovered}
                                        />
                                )}>
                                    {boardTasks &&
                                        boardTasks
                                            .filter(task => task?.statusId === boardStatus.id)
                                            .map(task => (
                                                <DraggableTask
                                                    assignee={task.assignee}
                                                    taskPriority={task.priority}
                                                    boardId={boardId}
                                                    key={`${task.id}-${task?.statusId}`}
                                                    taskTitle={task.title}
                                                    taskUniqueTitle={task?.uniqueTitle}
                                                    taskId={task.id}
                                                    statusId={task?.statusId}
                                                    onClick={onTaskClickHandler(task.uniqueTitle)}
                                                    taskDescription={task.description ? task.description : null}
                                                />
                                            ))
                                    }
                                </SortableColumn>
                            ))}
                        </SortableContext>
                    )}

                    <CreateNewColumn boardId={boardId}/>
                </div>
            </div>

            <DragOverlay
                dropAnimation={null}
            >
                {Object.keys(activeTask).length >= 1 ? (
                    <TaskWrapper
                        className={cls.Overlay}
                        taskTitle={activeTask.title}
                        taskUniqueTitle={activeTask.uniqueTitle}
                        taskId={1}
                        boardId={1}
                        taskDescription={null}
                    />
                ) : null}

                {Object.keys(activeColumn).length >= 1 ? (
                    <ColumnWrapper
                        className={cls.Overlay}
                        columnTitle={activeColumn.title}
                        statusId={1}
                        boardId={1}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
};

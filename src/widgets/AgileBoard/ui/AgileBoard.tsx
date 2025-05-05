import { classNames } from '@/shared/lib/classNames';
import cls from './AgileBoard.module.scss';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {useNavigate, useParams} from "react-router";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {getBoardStatuses} from "@/entities/Status";
import { DroppableColumn} from "@/entities/Column";
import {ChangeTaskStatusService, DraggableTask, TaskActions, TaskI} from "@/entities/Task";
import {DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getBoardTasks} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {TaskWrapper} from "@/entities/Task/ui/TaskWrapper/TaskWrapper.tsx";

interface AgileBoardProps {
    className?: string;
}

export const AgileBoard = (props: AgileBoardProps) => {
    const { className } = props;

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const userBoards = useSelector(getUserBoardsBySelectedProject)
    const selectedUserProject = useSelector(getProjectSelectedProject)
    useEffect(() => {
        if (selectedUserProject && params.project) {
            if (userBoards.length >= 1 && params.board) {
                const isCorrectBoardPath = userBoards.findIndex(board => board.id === +params.board);
                if (isCorrectBoardPath !== undefined && isCorrectBoardPath !== -1) {
                    dispatch(FetchBoardStatuses({boardId: +params.board}))
                    dispatch(FetchBoardTasks({boardId: +params.board}))
                } else {
                    navigate('/not')
                }
            }
        }
    }, [dispatch, navigate, params.board, params.project, selectedUserProject, userBoards]);

    const boardStatuses = useSelector(getBoardStatuses);
    const boardTasks = useSelector(getBoardTasks);

    const [activeTask, setActiveTask] = useState<Partial<TaskI>>({});

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const onDragEndHandle = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.data.current.statusId === over.id) return

        console.log(active, over);

        try {
            dispatch(TaskActions.changeTaskStatus({taskId: +active.id, newStatusId: +over.id}))
            await dispatch(ChangeTaskStatusService({taskId: +active.id, statusId: +over.id})).unwrap()
            await dispatch(FetchBoardTasks({boardId: +params.board}))
        } catch (e) {
            console.error(e)
        }

    }

    const onTaskClickHandler = (taskTitle: string) => () => {
        navigate({
            pathname: location.pathname,
            search: `?selectedTask=${taskTitle}`,
        });
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({active}) => {
                setActiveTask({
                    id: +active.id,
                    title: active?.data?.current?.title,
                    statusId: active?.data?.current?.statusId,
                    uniqueTitle: active?.data?.current?.uniqueTitle,
                })
            }}
            onDragEnd={onDragEndHandle}
        >
            <div className={classNames(cls.AgileBoard, {}, [className])}>
                <div className={cls.AgileBoardWrapper}>
                    {boardStatuses && (
                        boardStatuses.map(boardStatus => (
                            <DroppableColumn
                                statusId={boardStatus.id}
                                key={boardStatus.id}
                                columnTitle={boardStatus.title}
                            >
                                {
                                    boardTasks && (
                                        boardTasks
                                            .filter(task => task.statusId === boardStatus.id)
                                            .map(task => (
                                                <DraggableTask
                                                    key={task.id}
                                                    taskTitle={task.title}
                                                    taskUniqueTitle={task.uniqueTitle}
                                                    taskId={task.id}
                                                    statusId={task.statusId}
                                                    onClick={onTaskClickHandler(task.uniqueTitle)}
                                                />
                                            )
                                        )
                                    )
                                }

                            </DroppableColumn>
                        ))
                    )}
                </div>
            </div>

            <DragOverlay
                dropAnimation={null}
            >
                {activeTask ? (
                    <TaskWrapper className={cls.Overlay} taskTitle={activeTask.title} taskUniqueTitle={activeTask.uniqueTitle}/>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
};

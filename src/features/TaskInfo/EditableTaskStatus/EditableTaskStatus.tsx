import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskStatus.module.scss';
import {useSelector} from "react-redux";
import {ChangeTaskStatusService, FetchProjectTreeTasksService, getSelectedTaskInfo} from "@/entities/Task";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {getSelectedTaskBoardStatuses} from "@/entities/Status";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {Select} from "@/shared/ui/Select";
import {ChangeTaskStatusInputData} from "@/entities/Task/model/services/changeTaskStatusService.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {useLocation, useNavigate, useParams} from "react-router";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getRouteMain, getRouteProjectBoard} from "@/shared/const/router.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface EditableTaskStatusProps {
    className?: string;
    editIsPossible: boolean
}

export const EditableTaskStatus = (props: EditableTaskStatusProps) => {
    const { className, editIsPossible } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const selectedProject = useSelector(getProjectSelectedProject)
    const dispatch = useAppDispatch()

    const selectedTaskBoardStatuses = useSelector(getSelectedTaskBoardStatuses)

    const [normalizedBoardStatuses, setNormalizedBoardStatuses] = useState<ComboBoxOption[]>([])
    const [selectedBoardStatus, setSelectedBoardStatus] = useState<ComboBoxOption>(null)

    const location = useLocation()

    useEffect(() => {
        if (selectedTaskBoardStatuses.length >= 1 && selectedTaskInfo?.id && !selectedTaskInfo?.archived) {
            setNormalizedBoardStatuses(
                [...selectedTaskBoardStatuses.map(boardStatus => {
                    if (boardStatus.id === selectedTaskInfo?.statusId) {
                        setSelectedBoardStatus({
                            value: boardStatus.title,
                            label: boardStatus.title,
                            id: boardStatus.id
                        })
                    }

                    return {
                        value: boardStatus.title,
                        label: boardStatus.title,
                        id: boardStatus.id
                    }
                })]
            )
        }
    }, [selectedTaskBoardStatuses, selectedTaskInfo]);

    useEffect(() => {
        if (selectedTaskInfo?.boardId && selectedProject?.id) {
            dispatch(FetchBoardStatuses({boardId: selectedTaskInfo.boardId, type: "selectedTask", projectId: selectedProject.id}))
        }
        // if (selectedTaskInfo?.boardId)
    }, [dispatch, selectedProject, selectedTaskInfo]);

    const onSelectOption = async (option: ComboBoxOption) => {
        if (selectedTaskInfo.id) {
            const changeBody: ChangeTaskStatusInputData = {
                taskId: selectedTaskInfo.id,
                statusId: option.id,
                projectId: selectedProject.id
            }

            try {
                await dispatch(ChangeTaskStatusService(changeBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle, projectId: selectedProject.id})).unwrap()
                if (location.pathname === getRouteMain()) {
                    await dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id}))
                } else {
                    await dispatch(FetchBoardTasks({boardId: selectedTaskInfo?.boardId, projectId: selectedProject.id})).unwrap()
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    if (selectedTaskInfo?.archived || !editIsPossible) {
        return <div className={cls.NonActiveStatus}>
            {selectedTaskInfo?.archived ? 'Архивирована' : selectedBoardStatus?.value || 'Статус'}
        </div>
    }

    return (
        <Select
            widthType={'FIT_CONTENT'}
            colorType={'PURPLE'}
            value={selectedBoardStatus}
            onSelectFunc={setSelectedBoardStatus}
            onSelectAction={onSelectOption}
            options={normalizedBoardStatuses}
            className={classNames(cls.EditableTaskStatus, {}, [className])}
        />
    )
};

import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskStatus.module.scss';
import {useSelector} from "react-redux";
import {ChangeTaskStatusService, getSelectedTaskInfo} from "@/entities/Task";
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
import {getRouteProjectBoard} from "@/shared/const/router.ts";

interface EditableTaskStatusProps {
    className?: string;
}

export const EditableTaskStatus = (props: EditableTaskStatusProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const dispatch = useAppDispatch()

    const selectedTaskBoardStatuses = useSelector(getSelectedTaskBoardStatuses)

    const [normalizedBoardStatuses, setNormalizedBoardStatuses] = useState<ComboBoxOption[]>([])
    const [selectedBoardStatus, setSelectedBoardStatus] = useState<ComboBoxOption>(null)

    useEffect(() => {
        if (selectedTaskBoardStatuses.length >= 1) {
            setNormalizedBoardStatuses(
                [...selectedTaskBoardStatuses.map(boardStatus => {
                    if (boardStatus.id === selectedTaskInfo.statusId) {
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
        if (selectedTaskInfo?.boardId) {
            dispatch(FetchBoardStatuses({boardId: selectedTaskInfo.boardId, type: "selectedTask"}))
        }
        // if (selectedTaskInfo?.boardId)
    }, [dispatch, selectedTaskInfo]);

    const params = useParams()
    const onSelectOption = async (option: ComboBoxOption) => {
        if (selectedTaskInfo.id) {
            const changeBody: ChangeTaskStatusInputData = {
                taskId: selectedTaskInfo.id,
                statusId: option.id
            }

            try {
                await dispatch(ChangeTaskStatusService(changeBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle})).unwrap()
                await dispatch(FetchBoardTasks({boardId: +params.board})).unwrap()
            } catch (e) {
                console.error(e)
            }
        }
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

import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskPriority.module.scss';
import React, { useEffect, useState } from 'react';
import { ComboBox, ComboBoxOption } from '@/shared/ui/ComboBox/ComboBox';
import { useSelector } from 'react-redux';
import { priorityOptions } from '@/features/CreateNewTask/const/priorityConsts.tsx';
import {FetchProjectTreeTasksService, getSelectedTaskInfo, Priority, TaskActions, TaskI} from '@/entities/Task';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {ChangeTaskPriorityService} from "@/entities/Task/model/services/changeTaskPriorityService.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Skeleton} from "@/shared/ui/Skeleton";
import {getRouteMain} from "@/shared/const/router.ts";
import {useLocation} from "react-router";
import {getTaskFiltersState} from "@/features/TasksFilters/model/selectors/getTaskFilters.ts";
import {prepareFiltersFromState} from "@/features/TasksFilters";

interface EditableTaskPriorityProps {
    className?: string;
    editIsPossible: boolean;
}

export const EditableTaskPriority = (props: EditableTaskPriorityProps) => {
    const { className, editIsPossible} = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const [fieldIsActive, setFieldIsActive] = useState(false);
    const [pickedPriority, setPickedPriority] = useState<ComboBoxOption | null>(null);

    useEffect(() => {
        if (selectedTaskInfo) {
            if (selectedTaskInfo?.priority) {
                const current = priorityOptions.find(option => option.label === selectedTaskInfo.priority);
                if (current) {
                    setPickedPriority(current);
                }
            } else {
                setPickedPriority(null)
            }
        }
    }, [selectedTaskInfo]);

    const onFieldClickHandler = () => {
        if (editIsPossible) {
            setFieldIsActive(true);
        }
    };

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)
    const location = useLocation()

    const filtersState = useSelector(getTaskFiltersState);

    const onSelectPriorityHandler = async (option: ComboBoxOption) => {
        if (selectedTaskInfo?.id) {
            if (option.value === pickedPriority?.value) {
                setFieldIsActive(false);
                return;
            }

            const filters = prepareFiltersFromState({
                ...filtersState,
            });

            try {
                const response: TaskI = await dispatch(ChangeTaskPriorityService({
                    priority: option.value as keyof typeof Priority,
                    taskId: selectedTaskInfo.id,
                    projectId: selectedProject.id
                })).unwrap()

                if (location.pathname === getRouteMain()) {
                    await dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id, filters: filters}))
                } else {
                    await dispatch(FetchBoardTasks({boardId: selectedTaskInfo?.boardId, projectId: selectedProject.id})).unwrap()
                }

                dispatch(TaskActions.setSelectedTaskInfo(response))
            } catch (e) {
                console.error(e)
            }

            setPickedPriority(option);
            setFieldIsActive(false);
        }
    };

    return (
        <div
            className={classNames(cls.EditableTaskPriority, {}, [className])}
        >
            {!fieldIsActive ? (
                <div onClick={onFieldClickHandler}
                     className={classNames(cls.priorityDisplay,
                        {[cls.EditIsNotPossible]: !editIsPossible}, [])}
                >
                    {selectedTaskInfo ? pickedPriority?.data?.svg : <></>}
                    <span>{selectedTaskInfo ? pickedPriority?.label || 'Не выбрано' : <Skeleton height={35} width={120} border={6}/>}</span>
                </div>
            ) : (
                <ComboBox
                    withSvgComponent={true}
                    value={pickedPriority}
                    options={priorityOptions}
                    onSelectAction={onSelectPriorityHandler}
                />
            )}
        </div>
    );
};

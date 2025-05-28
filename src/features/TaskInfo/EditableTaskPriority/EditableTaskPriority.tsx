import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskPriority.module.scss';
import { useEffect, useState } from 'react';
import { ComboBox, ComboBoxOption } from '@/shared/ui/ComboBox/ComboBox';
import { useSelector } from 'react-redux';
import { priorityOptions } from '@/features/CreateNewTask/const/priorityConsts.tsx';
import {getSelectedTaskInfo, Priority, TaskActions, TaskI} from '@/entities/Task';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {ChangeTaskPriorityService} from "@/entities/Task/model/services/changeTaskPriorityService.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface EditableTaskPriorityProps {
    className?: string;
}

export const EditableTaskPriority = (props: EditableTaskPriorityProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const [fieldIsActive, setFieldIsActive] = useState(false);
    const [pickedPriority, setPickedPriority] = useState<ComboBoxOption | null>(null);

    useEffect(() => {
        if (selectedTaskInfo?.priority) {
            const current = priorityOptions.find(option => option.label === selectedTaskInfo.priority);
            if (current) {
                setPickedPriority(current);
            }

        }
    }, [selectedTaskInfo]);

    const onFieldClickHandler = () => {
        setFieldIsActive(true);
    };

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    const onSelectPriorityHandler = async (option: ComboBoxOption) => {
        if (selectedTaskInfo?.id) {
            if (option.value === pickedPriority?.value) {
                setFieldIsActive(false);
                return;
            }

            try {
                const response: TaskI = await dispatch(ChangeTaskPriorityService({
                    priority: option.value as keyof typeof Priority,
                    taskId: selectedTaskInfo.id,
                    projectId: selectedProject.id
                })).unwrap()
                await dispatch(FetchBoardTasks({boardId: selectedTaskInfo.boardId, projectId: selectedProject.id})).unwrap()
                dispatch(TaskActions.setSelectedTaskInfo(response))
            } catch (e) {
                console.error()
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
                <div onClick={onFieldClickHandler} className={cls.priorityDisplay}>
                    {pickedPriority?.data?.svg}
                    <span>{pickedPriority?.label || 'Не выбрано'}</span>
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

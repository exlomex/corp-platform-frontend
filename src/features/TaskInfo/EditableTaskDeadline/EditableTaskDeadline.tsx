import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskDeadline.module.scss';
import {Button} from "@/shared/ui/Button";
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import CloseIcon from "@/shared/assets/icons/smallCloseIcon.svg";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    ChangeTaskDeadlineInputData,
    ChangeTaskDeadlineService,
    ChangeTaskStoryPointsInputData,
    ChangeTaskStoryPointsService,
    getSelectedTaskInfo,
    TaskActions
} from "@/entities/Task";
import {CalendarPopover} from "@/features/TasksFilters/ui/CalendarPopover/CalendarPopover.tsx";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";

interface EditableTaskDeadlineProps {
    className?: string;
}

export const EditableTaskDeadline = (props: EditableTaskDeadlineProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const [fieldIsActive, setFieldIsActive] = useState(false);
    const [deadlineTo, setDeadlineTo] = useState<Date>(null)

    useEffect(() => {
        if (selectedTaskInfo?.deadline) {
            setDeadlineTo(new Date(selectedTaskInfo.deadline));
        }
    }, [selectedTaskInfo]);

    const onFieldClickHandler = () => {
        setFieldIsActive(true);
    };

    const dispatch = useAppDispatch();

    const onSubmitChangeDeadlineHandler = async () => {
        if (selectedTaskInfo?.id) {
            const updateBody: ChangeTaskDeadlineInputData = {
                deadline: deadlineTo ? dateConverter(deadlineTo) : null,
                taskId: selectedTaskInfo.id,
                projectId: selectedTaskInfo.projectId,
            }

            console.log(updateBody);

            try {
                const updateTaskInfo = await dispatch(ChangeTaskDeadlineService(updateBody)).unwrap()
                dispatch(TaskActions.setSelectedTaskInfo(updateTaskInfo))
                setFieldIsActive(false);

            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={classNames(cls.EditableTaskDeadline, {}, [className])}>
            {!fieldIsActive ? (
                <div onClick={onFieldClickHandler} className={cls.DeadlineDisplay}>
                    {selectedTaskInfo?.deadline ? `${selectedTaskInfo?.deadline}` : 'Не указано'}
                </div>
            ) : (
                <div className={cls.DeadlineEditArea}>
                    <CalendarPopover direction={'bottom start'} className={cls.DeadlineSelectedValue} disablePast fullWidth isDateResettable activeDate={deadlineTo} setActiveDate={setDeadlineTo}/>

                    <div className={cls.EditButtons}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitChangeDeadlineHandler}
                        >
                            <CorrectIcon/>
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={() => {
                                setFieldIsActive(false)
                                setDeadlineTo(new Date(selectedTaskInfo?.deadline));
                            }}
                            className={cls.CloseButton}
                        >
                            <CloseIcon/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};

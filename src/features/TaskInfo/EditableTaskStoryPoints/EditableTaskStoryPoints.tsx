import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskStoryPoints.module.scss';
import React, {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    ChangeTaskStoryPointsInputData,
    ChangeTaskStoryPointsService,
    getSelectedTaskInfo,
    TaskActions
} from "@/entities/Task";
import {Button} from "@/shared/ui/Button";
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import CloseIcon from "@/shared/assets/icons/smallCloseIcon.svg";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {Skeleton} from "@/shared/ui/Skeleton";

interface EditableTaskStoryPointsProps {
    className?: string;
    editIsPossible: boolean;
}

export const EditableTaskStoryPoints = (props: EditableTaskStoryPointsProps) => {
    const { className, editIsPossible} = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const [fieldIsActive, setFieldIsActive] = useState(false);
    const [storyPoints, setStoryPoints] = useState<string>('');

    useEffect(() => {
        if (selectedTaskInfo?.storyPoints) {
            setStoryPoints(String(selectedTaskInfo?.storyPoints));
        }
    }, [selectedTaskInfo]);

    const onFieldClickHandler = () => {
        if (editIsPossible) {
            setFieldIsActive(true);
        }
    };

    const dispatch = useAppDispatch();

    const onSubmitUpdateStoryPointsHandler = async () => {
        if (selectedTaskInfo?.id) {
            const updateBody: ChangeTaskStoryPointsInputData = {
                storyPoints: storyPoints ? +storyPoints : null,
                taskId: selectedTaskInfo.id,
                projectId: selectedTaskInfo.projectId,
            }

            try {
                const updateTaskInfo = await dispatch(ChangeTaskStoryPointsService(updateBody)).unwrap()
                dispatch(TaskActions.setSelectedTaskInfo(updateTaskInfo))
                setFieldIsActive(false);

            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={classNames(cls.EditableTaskStoryPoints, {}, [className])}>
            {!fieldIsActive ? (
                <div onClick={onFieldClickHandler}
                     className={classNames(cls.StoryPointsDisplay, {[cls.EditIsNotPossible]: !editIsPossible}, [])}>
                    {
                        selectedTaskInfo ? (
                            selectedTaskInfo.storyPoints != null
                                ? `${selectedTaskInfo.storyPoints} Story points`
                                : 'Не указано'
                        ) : (
                            <Skeleton height={35} width={120} border={6}/>
                        )
                    }
                </div>
            ) : (
                <div className={cls.StoryPointsEditArea}>
                    <input value={storyPoints} onChange={(e: ChangeEvent<HTMLInputElement>) => setStoryPoints(e.target.value)} className={cls.StoryPointsInput} type="number"/>

                    <div className={cls.EditButtons}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitUpdateStoryPointsHandler}
                        >
                            <CorrectIcon/>
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={() => {
                                setStoryPoints(String(selectedTaskInfo?.storyPoints));
                                setFieldIsActive(false)
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

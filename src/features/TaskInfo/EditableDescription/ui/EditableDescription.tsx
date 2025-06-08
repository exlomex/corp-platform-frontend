import { classNames } from '@/shared/lib/classNames';
import cls from './EditableDescription.module.scss';
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useState
} from "react";
import { Button } from "@/shared/ui/Button";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {
    ChangeTaskTitleService,
    ChangeTaskTitleServiceInputData
} from "@/entities/Task";
import {Typography} from "@/shared/ui/Typography";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface EditableDescriptionProps {
    className?: string;
    taskDescription: string | null;
    taskId: number;
    boardId: number;
    taskTitle: string;
    isEditDescriptionActive: boolean;
    setIsEditDescriptionActive: Dispatch<SetStateAction<boolean>>;
    uniqueTitle: string;
    editIsPossible: boolean;
}

export const EditableDescription = (props: EditableDescriptionProps) => {
    const {
        className,
        taskDescription,
        taskId,
        boardId,
        taskTitle,
        setIsEditDescriptionActive,
        isEditDescriptionActive,
        uniqueTitle,
        editIsPossible,
    } = props;

    const [descriptionState, setDescriptionState] = useState<string>(taskDescription || '');
    const [newDescriptionValue, setNewDescriptionValue] = useState<string>(taskDescription || '');

    const onCloseEditableAreaHandler = () => {
        setIsEditDescriptionActive(false);
    };

    const onTextAreaValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescriptionValue(e.target.value);
    };

    const dispatch = useAppDispatch();
    const selectedProject = useSelector(getProjectSelectedProject)

    const onSubmitEditHandler = async () => {
        if (newDescriptionValue.trim() !== (taskDescription || '')) {
            const editBody: ChangeTaskTitleServiceInputData = {
                changeData: {
                    id: taskId,
                    title: taskTitle,
                    description: newDescriptionValue
                },
                projectId: selectedProject.id
            };

            try {
                await dispatch(ChangeTaskTitleService(editBody)).unwrap();
                await dispatch(fetchTaskInfoService({uniqueTitle: uniqueTitle, projectId:selectedProject.id})).unwrap();

                onCloseEditableAreaHandler();
                setDescriptionState(newDescriptionValue);
            } catch (e) {
                console.error(e?.message || e);
            }
        }
    };

    return (
        <>
            <Typography className={cls.Title} size={'PARAGRAPH-18-REGULAR'}>Описание</Typography>

            <div
                className={classNames(cls.EditableDescription,
                    {
                        [cls.isActiveEditableArea]: isEditDescriptionActive,
                        [cls.EditIsNotPossible]: !editIsPossible
                    },
                    [className])}
            >
                {!isEditDescriptionActive && (
                    <div
                        className={classNames(cls.DescriptionWrapper, {[cls.EditIsNotPossible]: !editIsPossible}, [])}
                        onClick={() => {
                            if (editIsPossible) {
                                setIsEditDescriptionActive(true)
                            }
                        }}
                    >
                    <span className={cls.Description}>
                        {editIsPossible ? descriptionState || 'Добавить описание' : descriptionState || 'Нет описания'}
                    </span>
                    </div>
                )}

                {isEditDescriptionActive && (
                    <div
                        onPointerDown={(e) => {
                            e.stopPropagation();
                        }}
                        className={cls.EditableArea}
                    >
                    <textarea
                        className={classNames(cls.TextArea, {}, [])}
                        placeholder={'Введите описание'}
                        value={newDescriptionValue}
                        onChange={onTextAreaValueChange}
                    />
                        <div className={cls.EditableAreaBottomLine}>
                            <Button
                                buttonType={'SMART_TEXT_BTN_FILLED'}
                                className={cls.CorrectButton}
                                onClick={onSubmitEditHandler}
                            >
                                Сохранить
                            </Button>

                            <Button
                                buttonType={'SMART_TEXT_BTN_TRANSPARENT'}
                                onClick={onCloseEditableAreaHandler}
                                className={cls.CloseButton}
                            >
                                Отменить
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

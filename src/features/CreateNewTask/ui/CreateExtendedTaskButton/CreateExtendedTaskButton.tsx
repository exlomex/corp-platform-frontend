import { classNames } from '@/shared/lib/classNames';
import cls from './CreateExtendedTaskButton.module.scss';
import {Button} from "@/shared/ui/Button";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {TaskActions} from "@/entities/Task";

interface CreateExtendedTaskButtonProps {
    className?: string;
}

export const CreateExtendedTaskButton = (props: CreateExtendedTaskButtonProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const onModalButtonClickHandler = () => {
        dispatch(TaskActions.setIsOpenAddTaskModal(true))
    }

    return (
        <Button
            buttonType={'SMART_TEXT_BTN_FILLED'}
            className={classNames(cls.CreateExtendedTaskButton, {}, [className])}
            onClick={onModalButtonClickHandler}
        >
            Создать задачу
        </Button>
    )
};

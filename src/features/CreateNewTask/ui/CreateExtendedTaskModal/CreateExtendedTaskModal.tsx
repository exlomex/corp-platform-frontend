import { classNames } from '@/shared/lib/classNames';
import cls from './CreateExtendedTaskModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {getAddTaskModalIsOpen} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {TaskActions} from "@/entities/Task";
import {
    CreateExtendedTaskModalContent
} from "@/features/CreateNewTask/ui/CreateExtendedTaskModalContent/CreateExtendedTaskModalContent.tsx";

interface CreateExtendedTaskModalProps {
    className?: string;
}

export const CreateExtendedTaskModal = (props: CreateExtendedTaskModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const onCloseModalHandler = () => {
        dispatch(TaskActions.setIsOpenAddTaskModal(false))
    }

    const isModalOpen = useSelector(getAddTaskModalIsOpen)

    return (
        <Modal className={classNames(cls.Modal, {}, [className])} isOpen={isModalOpen} onClose={onCloseModalHandler}>
            <CreateExtendedTaskModalContent onCloseModalHandler={onCloseModalHandler}/>
        </Modal>
    )
};

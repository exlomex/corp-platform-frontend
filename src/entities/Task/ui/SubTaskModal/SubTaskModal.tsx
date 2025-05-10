import { classNames } from '@/shared/lib/classNames';
import cls from './SubTaskModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {getAddSubTaskModalIsOpen} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {TaskActions} from "@/entities/Task";
import {SubTaskModalContent} from "../SubTaskModalContent/SubTaskModalContent.tsx";

interface SubTaskModalProps {
    className?: string;
}

export const SubTaskModal = (props: SubTaskModalProps) => {
    const { className } = props;

    const isModalOpen = useSelector(getAddSubTaskModalIsOpen)
    const dispatch = useAppDispatch()

    const onModalClose = () => {
        dispatch(TaskActions.setIsOpenSubTaskModal(false))
        dispatch(TaskActions.setSubTaskError(undefined))
    }

    return (
        <Modal
            className={classNames(cls.SubTaskModal, {}, [className])}
            isOpen={isModalOpen}
            onClose={onModalClose}
        >
            <SubTaskModalContent onClose={onModalClose}/>
        </Modal>
    )
};

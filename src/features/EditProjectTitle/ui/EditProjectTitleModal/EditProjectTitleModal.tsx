import { classNames } from '@/shared/lib/classNames';
import cls from './EditProjectTitleModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {getEditProjectInitialData, getEditProjectTitleModalIsOpen, ProjectActions} from "@/entities/Project";
import {EditProjectTitleForm} from "../EditProjectTitleForm/EditProjectTitleForm.tsx";

interface EditProjectTitleModalProps {
    className?: string;
}

export const EditProjectTitleModal = (props: EditProjectTitleModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const isEditProjectTitleModalOpen = useSelector(getEditProjectTitleModalIsOpen)

    const onEditProjectTitleModalClose = () => {
        dispatch(ProjectActions.setEditProjectTitleModalIsOpen(false))
    }

    return (
        <Modal isOpen={isEditProjectTitleModalOpen} onClose={onEditProjectTitleModalClose} className={classNames(cls.EditProjectTitleModal, {}, [className])}>
            <EditProjectTitleForm onClose={onEditProjectTitleModalClose}/>
        </Modal>
    )
};

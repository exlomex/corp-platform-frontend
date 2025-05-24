import { classNames } from '@/shared/lib/classNames';
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {CreateNewBoardForm} from "@/features/CreateNewBoard/ui/CreateNewBoardForm/CreateNewBoardForm.tsx";
import {getAddUserToProjectModalIsOpen, ProjectActions} from "@/entities/Project";
import {AddUserToProjectForm} from "@/features/AddUserToProject/ui/AddUserToProjectForm/AddUserToProjectForm.tsx";

interface CreateNewProjectModalProps {
    className?: string;
}

export const AddUserToProjectModal = (props: CreateNewProjectModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const AddUserToProjectModalIsOpen = useSelector(getAddUserToProjectModalIsOpen)

    const onModalClose = () => {
        dispatch(ProjectActions.setAddUserToProjectModalIsOpen(false))
    }

    return (
        <Modal className={classNames('', {}, [className])} isOpen={AddUserToProjectModalIsOpen} onClose={onModalClose}>
            <AddUserToProjectForm onModalClose={onModalClose}/>
        </Modal>
    )
};

import { classNames } from '@/shared/lib/classNames';
import cls from './CreateNewProjectModal.module.scss'
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {newProjectSliceActions} from "../../model/slice/newProjectSlice.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {CreateNewProjectForm} from "../CreateNewProjectForm/CreateNewProjectForm.tsx";
import {getIsCreateNewProjectModalOpen} from "../../model/selectors/getNewProjectValues.ts";

interface CreateNewProjectModalProps {
    className?: string;
}

export const CreateNewProjectModal = (props: CreateNewProjectModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const isCreateNewProjectModalOpen = useSelector(getIsCreateNewProjectModalOpen)

    const onCreateNewProjectModalClose = () => {
        dispatch(newProjectSliceActions.setCreateProjectModalOpen(false))
    }

    return (
        <Modal className={classNames(cls.CreateNewProjectModal, {}, [className])} isOpen={isCreateNewProjectModalOpen} onClose={onCreateNewProjectModalClose}>
            <CreateNewProjectForm onModalClose={onCreateNewProjectModalClose}/>
        </Modal>
    )
};

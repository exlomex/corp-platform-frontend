import { classNames } from '@/shared/lib/classNames';
import cls from './TaskInfoModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {TaskInfoContent} from "../../TaskInfoContent/ui/TaskInfoContent.tsx";

interface TaskInfoModalProps {
    className?: string;
    isOpen: boolean,
    onClose: () => void
}

export const TaskInfoModal = (props: TaskInfoModalProps) => {
    const { className, isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={classNames(cls.TaskInfoModal, {}, [className])}>
            <TaskInfoContent/>
        </Modal>
    )
};

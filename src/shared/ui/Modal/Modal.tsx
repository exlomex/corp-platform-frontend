import { classNames } from '@/shared/lib/classNames';
import cls from './Modal.module.scss';
import {Dialog, DialogPanel} from "@headlessui/react";
import {ReactElement} from "react";

interface ModalProps {
    className?: string;
    children: ReactElement;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose } = props;

    return (
        <Dialog
            open={isOpen}
            as={'div'}
            transition
            onClose={onClose}
            className={classNames(cls.Modal, {}, [className])}
        >
            <DialogPanel
                className={cls.ModalWrapper}
                transition
            >
                {children}
            </DialogPanel>
        </Dialog>
    )
};
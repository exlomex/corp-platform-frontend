import { classNames } from '@/shared/lib/classNames';
import cls from './NewMessageModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {getNewMessageIsOpen} from "@/features/Message/model/selectors/getMessageValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {MessageActions} from "../../model/slice/messageSlice.ts";
import {NewMessageForm} from "../../ui/NewMessageForm/NewMessageForm.tsx";

interface NewMessageModalProps {
    className?: string;
}

export const NewMessageModal = (props: NewMessageModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const modalIsOpen = useSelector(getNewMessageIsOpen)

    const onModalClose = () => {
        dispatch(MessageActions.setNewMessageIsOpen(false))
    }

    return (
        <Modal isOpen={modalIsOpen} onClose={onModalClose} className={classNames(cls.NewMessageModal, {}, [className])}>
            <NewMessageForm onClose={onModalClose} />
        </Modal>
    )
};

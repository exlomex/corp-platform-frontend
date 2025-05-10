import { classNames } from '@/shared/lib/classNames';
import {Modal} from "@/shared/ui/Modal";
import {useSelector} from "react-redux";
import {newBoardSliceActions} from "../../model/slice/newBoardSlice.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {CreateNewBoardForm} from "@/features/CreateNewBoard/ui/CreateNewBoardForm/CreateNewBoardForm.tsx";
import {getIsCreateNewBoardModalOpen} from "../../model/selectors/getNewBoardValues.ts";

interface CreateNewProjectModalProps {
    className?: string;
}

export const CreateNewBoardModal = (props: CreateNewProjectModalProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const isCreateNewBoardModalOpen = useSelector(getIsCreateNewBoardModalOpen)

    const onCreateNewBoardModalClose = () => {
        dispatch(newBoardSliceActions.setCreateBoardModalOpen(false))
    }

    return (
        <Modal className={classNames('', {}, [className])} isOpen={isCreateNewBoardModalOpen} onClose={onCreateNewBoardModalClose}>
            <CreateNewBoardForm onModalClose={onCreateNewBoardModalClose}/>
        </Modal>
    )
};

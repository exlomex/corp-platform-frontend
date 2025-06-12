import { classNames } from '@/shared/lib/classNames';
import cls from './EditableBoardTitle.module.scss';
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Button } from '@/shared/ui/Button';
import CorrectIcon from '@/shared/assets/icons/smallCorrectIcon.svg';
import CloseIcon from '@/shared/assets/icons/smallCloseIcon.svg';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProjectSelectedProject } from '@/entities/Project/model/selectors/getProjectValues';
import {EditBoardTitle} from "@/entities/Board";

interface EditableBoardTitleProps {
    className?: string;
    boardTitle: string;
    boardId: number;
    isEditTitleActive: boolean;
    setIsEditTitleActive: Dispatch<SetStateAction<boolean>>;
    editIsPossible?: boolean;
}

export const EditableBoardTitle = (props: EditableBoardTitleProps) => {
    const {
        className,
        boardTitle,
        boardId,
        isEditTitleActive,
        setIsEditTitleActive,
        editIsPossible = true,
    } = props;

    const [boardTitleState, setBoardTitleState] = useState<string>(boardTitle);
    const [newBoardTitleValue, setNewBoardTitleValue] = useState<string>(boardTitle);

    useEffect(() => {
        setBoardTitleState(boardTitle);
        setNewBoardTitleValue(boardTitle);
    }, [boardTitle]);

    const onCloseEditableAreaHandler = () => {
        setIsEditTitleActive(false);
    };

    const editableAreaRef = useClickOutside<HTMLDivElement>(onCloseEditableAreaHandler);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBoardTitleValue(e.target.value);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditTitleActive) {
            const input = inputRef.current;
            input?.focus();
            const length = input?.value.length ?? 0;
            input?.setSelectionRange(length, length);
        }
    }, [isEditTitleActive]);

    const dispatch = useAppDispatch();
    const selectedProject = useSelector(getProjectSelectedProject);

    const onSubmitEditHandler = async () => {
        if (
            newBoardTitleValue.trim() !== boardTitle &&
            newBoardTitleValue.trim().length >= 1
        ) {
            try {
                await dispatch(
                    EditBoardTitle({
                        boardId: boardId,
                        newName: newBoardTitleValue,
                        projectId: selectedProject.id,
                    })
                ).unwrap();

                onCloseEditableAreaHandler();
                setBoardTitleState(newBoardTitleValue);
            } catch (e) {
                console.error(e?.message || e);
            }
        }
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={classNames(
                cls.EditableBoardTitle,
                {
                    [cls.isActiveEditableArea]: isEditTitleActive,
                    [cls.EditIsNotPossible]: !editIsPossible,
                },
                [className]
            )}
        >
            {!isEditTitleActive && (
                <div
                    className={cls.BoardTitleWrapper}
                    onClick={() => {
                        if (editIsPossible) {
                            setIsEditTitleActive(true);
                        }
                    }}
                >
                    <span className={cls.BoardTitle}>{boardTitleState}</span>
                </div>
            )}

            {isEditTitleActive && (
                <div
                    onPointerDown={(e) => e.stopPropagation()}
                    className={cls.EditableArea}
                    ref={editableAreaRef}
                >
                    <input
                        ref={inputRef}
                        className={cls.Input}
                        placeholder={'Название доски'}
                        value={newBoardTitleValue}
                        onChange={onInputChange}
                    />
                    <div className={cls.EditableAreaBottomLine}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitEditHandler}
                        >
                            <CorrectIcon />
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={onCloseEditableAreaHandler}
                            className={cls.CloseButton}
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

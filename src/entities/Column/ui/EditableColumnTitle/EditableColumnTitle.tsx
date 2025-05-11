import { classNames } from '@/shared/lib/classNames';
import cls from './EditableColumnTitle.module.scss';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/Button";
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import CloseIcon from "@/shared/assets/icons/smallCloseIcon.svg";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import { ChangeColumnTitleService } from "../../model/services/changeColumnTitleService.ts";
import type { ChangeColumnTitleInputData } from "../../model/services/changeColumnTitleService.ts";
import { FetchBoardStatuses } from "@/entities/Status/model/services/fetchBoardStatuses.ts";

interface EditableColumnTitleProps {
    className?: string;
    columnTitle: string;
    columnId: number;
    boardId: number;
    isEditDescriptionActive: boolean;
    setIsEditDescriptionActive: Dispatch<SetStateAction<boolean>>;
}

export const EditableColumnTitle = (props: EditableColumnTitleProps) => {
    const {
        className,
        columnTitle,
        columnId,
        boardId,
        isEditDescriptionActive,
        setIsEditDescriptionActive
    } = props;

    const [columnTitleState, setColumnTitleState] = useState<string>(columnTitle);
    const [newColumnTitleValue, setNewColumnTitleValue] = useState<string>(columnTitle);

    useEffect(() => {
        setColumnTitleState(columnTitle);
        setNewColumnTitleValue(columnTitle);
    }, [columnTitle]);

    const onCloseEditableAreaHandler = () => {
        setIsEditDescriptionActive(false);
    };

    const editableAreaRef = useClickOutside<HTMLDivElement>(onCloseEditableAreaHandler);

    const onTextAreaValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewColumnTitleValue(e?.target?.value);
    };

    const InputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditDescriptionActive) {
            const inputArea = InputRef?.current;
            inputArea?.focus();
            const length = inputArea?.value?.length;
            inputArea?.setSelectionRange(length, length);
        }
    }, [isEditDescriptionActive]);

    const dispatch = useAppDispatch();

    const onSubmitEditHandler = async () => {
        if (newColumnTitleValue.trim() !== columnTitle && newColumnTitleValue.trim().length >= 1) {
            const editBody: ChangeColumnTitleInputData = {
                statusId: columnId,
                title: newColumnTitleValue
            };

            try {
                await dispatch(ChangeColumnTitleService(editBody)).unwrap();
                await dispatch(FetchBoardStatuses({ boardId }));

                onCloseEditableAreaHandler();
                setColumnTitleState(newColumnTitleValue);
            } catch (e) {
                console.error(e?.message || e);
            }
        }
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={classNames(cls.EditableColumnTitle, { [cls.isActiveEditableArea]: isEditDescriptionActive }, [className])}
        >
            {!isEditDescriptionActive && (
                <div
                    className={cls.ColumnTitleWrapper}
                    onClick={() => setIsEditDescriptionActive(true)}
                >
                    <span className={cls.ColumnTitle}>{columnTitleState}</span>
                </div>
            )}

            {isEditDescriptionActive && (
                <div
                    onPointerDown={(e) => { e.stopPropagation(); }}
                    className={cls.EditableArea}
                    ref={editableAreaRef}
                >
                    <input
                        ref={InputRef}
                        className={cls.Input}
                        placeholder={'Название колонки'}
                        value={newColumnTitleValue}
                        onChange={onTextAreaValueChange}
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

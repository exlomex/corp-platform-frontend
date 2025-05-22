import { classNames } from '@/shared/lib/classNames';
import cls from './CreateNewColumn.module.scss';
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Button} from "@/shared/ui/Button";
import CreateIcon from '@/shared/assets/icons/addIcon.svg'
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import CloseIcon from "@/shared/assets/icons/smallCloseIcon.svg";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {
    createNewColumnService,
    createNewColumnServiceInputData
} from "@/features/CreateNewColumn/model/services/createNewColumnService.ts";
import {useClickOutside} from "@/shared/hooks/useClickOutside";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface CreateNewColumnProps {
    className?: string;
    boardId: number;
}

export const CreateNewColumn = (props: CreateNewColumnProps) => {
    const { className, boardId } = props;

    const [isActive, setIsActive] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const selectedProject = useSelector(getProjectSelectedProject)

    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e?.target?.value)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isActive) {
            const textArea = inputRef?.current
            textArea?.focus()
            const length = textArea?.value?.length;
            textArea.setSelectionRange(length, length)
        }
    }, [isActive]);

    const dispatch = useAppDispatch()

    const onSubmitCreateHandler = async () => {
        if (inputValue) {
            const createBody: createNewColumnServiceInputData = {
                createData: {
                    boardId: boardId,
                    title: inputValue
                },
                projectId: selectedProject.id
            }

            try {
                await dispatch(createNewColumnService(createBody)).unwrap()
                await dispatch(FetchBoardStatuses({boardId: boardId, projectId: selectedProject.id}))

                onCloseCreateColumnHandler()
                setInputValue('')
            } catch (e) {
                console.error(e?.message || e)
            }
        } else {
            onCloseCreateColumnHandler()
        }
    }

    const onCloseCreateColumnHandler = () => {
        setIsActive(false)
    }

    const createColumWrapperRef = useClickOutside<HTMLDivElement>(onCloseCreateColumnHandler)

    return (
        <div
            className={classNames(cls.CreateNewColumn, {}, [className])}
        >
            {!isActive && (
                <Button
                    className={cls.CreateButton} buttonType={'ICON_BTN_FILLED'}
                    onClick={() => setIsActive(true)}
                >
                    <CreateIcon/>
                </Button>
            )}

            {isActive && (
                <div
                    className={cls.CreateColumnArea}
                    ref={createColumWrapperRef}
                >
                    <input
                        ref={inputRef}
                        className={cls.Input} placeholder={'Название колонки'}
                        value={inputValue}
                        onChange={onInputValueChange}
                    />
                    <div className={cls.CreateColumnBottomLine}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitCreateHandler}
                        >
                            <CorrectIcon/>
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={onCloseCreateColumnHandler}
                            className={cls.CloseButton}
                        >
                            <CloseIcon/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};

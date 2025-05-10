import cls from './AdditionalTaskOptions.module.scss';
import {DropDown} from "@/shared/ui/popups";
import {Button} from "@/shared/ui/Button";
import {classNames} from "@/shared/lib/classNames";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import SmallDotsIcon from '@/shared/assets/icons/smallDots.svg'
import {useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {TaskActions} from "@/entities/Task";

interface AdditionalTaskOptionsProps {
    className?: string;
    isHover: boolean
    uniqueTaskTitle: string;
    taskId: number
}

const AdditionalButton = () => {
    return (
        <Button className={cls.AdditionalButton} buttonType={'SMALL_ICON_BTN_FILLED'}><SmallDotsIcon/></Button>
    )
}
export const AdditionalTaskOptions = (props: AdditionalTaskOptionsProps) => {
    const { className, isHover, uniqueTaskTitle, taskId } = props;

    const dispatch = useAppDispatch()

    const onAddNewSubtaskHandler = () => {
        dispatch(TaskActions.setIsOpenSubTaskModal(true))
        dispatch(TaskActions.setAddSubTaskSelectedTaskUniqueTitle({uniqueTitle: uniqueTaskTitle, id:taskId}))
    }

    const additionalOptionsItems: DropdownItem[] = [
        {
            content: 'Добавить дочернюю задачу',
            onClick: onAddNewSubtaskHandler
        },
    ]

    const [isDropDownActive, setIsDropDownActive] = useState<boolean>(false)

    if (isHover || isDropDownActive) {
        return (
            <DropDown
                fSize={14}
                className={classNames(cls.AdditionalColumnOptions, {}, [className])}
                items={additionalOptionsItems}
                trigger={<AdditionalButton/>}
                direction={'bottom end'}
                gap={6}
                onOpenChange={setIsDropDownActive}
            />
        )
    }

    return <></>
};

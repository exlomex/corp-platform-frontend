import cls from './AdditionalColumnOptions.module.scss';
import {DropDown} from "@/shared/ui/popups";
import {Button} from "@/shared/ui/Button";
import {classNames} from "@/shared/lib/classNames";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import SmallDotsIcon from '@/shared/assets/icons/smallDots.svg'
import {useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {
    deleteColumnService,
    deleteColumnServiceInputData
} from "../../model/services/deleteColumnService.ts";
import {FetchBoardStatuses} from "@/entities/Status/model/services/fetchBoardStatuses.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface AdditionalColumnOptionsProps {
    className?: string;
    isHover: boolean
    statusId: number
    boardId: number
}

const AdditionalButton = () => {
    return (
        <Button className={cls.AdditionalButton} buttonType={'SMALL_ICON_BTN_FILLED'}><SmallDotsIcon/></Button>
    )
}
export const AdditionalColumnOptions = (props: AdditionalColumnOptionsProps) => {
    const { className, isHover, statusId, boardId } = props;

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    const onDeleteColumnHandler = async () => {
        const deleteBody: deleteColumnServiceInputData = {
            statusId: statusId,
            projectId: selectedProject.id
        }

        try {
            await dispatch(deleteColumnService(deleteBody)).unwrap()
            await dispatch(FetchBoardStatuses({boardId: boardId, projectId: selectedProject.id})).unwrap()
        } catch (e) {
            console.error(e?.message || e)
        }
    }

    const additionalOptionsItems: DropdownItem[] = [
        {
            content: 'Удалить',
            onClick: onDeleteColumnHandler
        }
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

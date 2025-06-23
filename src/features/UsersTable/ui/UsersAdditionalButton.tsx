import {classNames} from '@/shared/lib/classNames';
import cls from './UsersAdditionalButton.module.scss';
import {DropDown} from "@/shared/ui/popups";
import DotsIcon from "@/shared/assets/icons/dots.svg";
import {Button} from "@/shared/ui/Button";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {Theme} from "@/shared/types/theme.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {DeleteUserProjectById} from "@/entities/Project/model/services/deleteUserProjectById.ts";
import {useSelector} from "react-redux";
import {getProjectIsDeleteProjectFetching} from "@/entities/Project";
import {DeleteUserService, FetchUsersByCompanyIdService, getUserCompanyId} from "@/entities/User";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";

interface UsersAdditionalButtonProps {
    className?: string;
    id: number
}

export const UsersAdditionalButton = (props: UsersAdditionalButtonProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch()

    const companyId = useSelector(getUserCompanyId)

    const onDeleteUserHandler = async () => {
        await dispatch(DeleteUserService({userId: id})).unwrap()
        await dispatch(FetchUsersByCompanyIdService({companyId: companyId}))
    }

    const userInfo = useSelector(getUserInfo)

    const AdditionalButtonItems: DropdownItem[] = [
        {
            content: 'Удалить',
            onClick: onDeleteUserHandler,
        },
    ]

    if (userInfo.id !== id) {
        return (
            <DropDown
                className={classNames(cls.ProjectsAdditionalButton, {}, [className])}
                items={AdditionalButtonItems}
                trigger={<Button buttonType={'SMART_ICON_BTN_FILLED'}><DotsIcon/></Button>}
                direction={'bottom end'}
                theme={Theme.LIGHT_THEME}
            />
        )
    }

    return <></>
};

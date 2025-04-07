import { classNames } from '@/shared/lib/classNames';
import cls from './ProfileTab.module.scss';
import {DropDown} from "@/shared/ui/popups";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {ProfileTabButton} from "../ProfileTabButton/ProfileTabButton.tsx";
import {useEffect} from "react";
import { useSelector} from "react-redux";
import {getUserCompanyId, getUserFirstName} from "@/entities/User/model/selectors/getUserValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchUserInfo, FetchUserInfoReturnedData} from "../../model/services/fetchUserInfo.ts";
import {UserSliceActions} from "@/entities/User";
import {useNavigate} from "react-router";
import {getRouteCompanyCreate, getRouteSettings} from "@/shared/const/router.ts";

interface ProfileTabProps {
    className?: string;
}

export const ProfileTab = (props: ProfileTabProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responce: FetchUserInfoReturnedData = await dispatch(fetchUserInfo()).unwrap()

                if (!responce.companyId) {
                    navigate(getRouteCompanyCreate())
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchUser()
    }, [dispatch]);

    const userFirstName = useSelector(getUserFirstName)

    const onLogoutClick = () => {
        dispatch(UserSliceActions.logout())
    }

    const profileTabItems: DropdownItem[] = [
        {
            content: 'Профиль',
        },
        {
            content: 'Компания',
            href: getRouteSettings('company')
        },
        {
            content: 'Настройки',
        },
        {
            content: 'Выйти',
            onClick: onLogoutClick
        },
    ]

    return (
        <DropDown
            direction={'right end'}
            className={classNames(cls.ProfileTab, {}, [])}
            items={profileTabItems}
            trigger={<ProfileTabButton userFirstName={userFirstName}/>}
        />
    )
};

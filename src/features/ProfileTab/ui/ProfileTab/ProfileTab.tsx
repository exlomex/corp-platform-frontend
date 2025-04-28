import {classNames} from '@/shared/lib/classNames';
import cls from './ProfileTab.module.scss';
import {DropDown} from "@/shared/ui/popups";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {ProfileTabButton} from "../ProfileTabButton/ProfileTabButton.tsx";
import {memo, useEffect, useRef} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {getUserFirstName, getUserIsUserFetched} from "@/entities/User/model/selectors/getUserValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchUserInfo, FetchUserInfoReturnedData} from "../../model/services/fetchUserInfo.ts";
import {UserSliceActions} from "@/entities/User";
import {useNavigate} from "react-router";
import {getRouteCompanyCreate, getRouteSettings} from "@/shared/const/router.ts";
import {Theme} from "@/shared/types/theme.ts";

interface ProfileTabProps {
    className?: string;
}

export const ProfileTab = memo((props: ProfileTabProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const fetchUserRef = useRef(() => {})

    const userFirstName = useSelector(getUserFirstName, shallowEqual)
    const userIsFetched = useSelector(getUserIsUserFetched)

    useEffect(() => {
        fetchUserRef.current = async () => {
            try {
                const responce: FetchUserInfoReturnedData = await dispatch(fetchUserInfo()).unwrap()

                if (!responce.companyId) {
                    navigate(getRouteCompanyCreate())
                }
            } catch (e) {
                console.error(e)
            }
        }

        if (!userIsFetched) {
            fetchUserRef.current()
        }
    }, [dispatch]);

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
            theme={Theme.DARK_THEME}
            className={classNames(cls.ProfileTab, {}, [])}
            items={profileTabItems}
            trigger={<ProfileTabButton userFirstName={userFirstName}/>}
        />
    )
});

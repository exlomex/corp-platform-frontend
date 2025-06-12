import {classNames} from '@/shared/lib/classNames';
import cls from './ProfileTab.module.scss';
import {DropDown} from "@/shared/ui/popups";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {ProfileTabButton} from "../ProfileTabButton/ProfileTabButton.tsx";
import {memo, useEffect, useRef} from "react";
import { useSelector} from "react-redux";
import {getUserInfo, getUserIsUserFetched} from "@/entities/User/model/selectors/getUserValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchUserInfo, FetchUserInfoReturnedData} from "../../model/services/fetchUserInfo.ts";
import {UserSliceActions} from "@/entities/User";
import {useNavigate} from "react-router";
import {getRouteCompanyCreate, getRouteSettings} from "@/shared/const/router.ts";
import {Theme} from "@/shared/types/theme.ts";
import {TaskActions} from "@/entities/Task";

interface ProfileTabProps {
    className?: string;
    isCollapsed?: boolean
    isMobile?: boolean
}

export const ProfileTab = memo((props: ProfileTabProps) => {
    const { className, isCollapsed = false, isMobile = false} = props;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const fetchUserRef = useRef(() => {})

    const userInfo = useSelector(getUserInfo)
    const userIsFetched = useSelector(getUserIsUserFetched)

    useEffect(() => {
        fetchUserRef.current = async () => {
            try {
                const response: FetchUserInfoReturnedData = await dispatch(fetchUserInfo()).unwrap()

                if (!response.companyId) {
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
        dispatch(UserSliceActions.resetUser())
        dispatch(TaskActions.resetTasks())
    }

    const profileTabItems: DropdownItem[] = [
        {
            content: 'Профиль',
            href: getRouteSettings('userSettings')
        },
        {
            content: 'Компания',
            href: getRouteSettings('company')
        },
        {
            content: 'Проекты',
            href: getRouteSettings('projects')
        },
        {
            content: 'Выйти',
            onClick: onLogoutClick
        },
    ]

    return (
        <DropDown
            gap={isMobile ? 6 : 20}
            fullWidth={isMobile ? true : null}
            direction={isMobile ? 'bottom' : 'right end'}
            theme={Theme.DARK_THEME}
            className={classNames(cls.ProfileTab, {}, [])}
            items={profileTabItems}
            trigger={<ProfileTabButton isCollapsed={isCollapsed} userFirstName={userInfo?.firstName} avatar={userInfo?.imageUrl}/>}
        />
    )
});

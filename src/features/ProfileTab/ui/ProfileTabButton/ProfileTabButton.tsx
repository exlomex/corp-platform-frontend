import { classNames } from '@/shared/lib/classNames';
import cls from './ProfileTabButton.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {memo} from "react";

interface ProfileTabButtonProps {
    className?: string;
    userFirstName?: string
    avatar?: string
    isCollapsed: boolean
}

export const ProfileTabButton = memo((props: ProfileTabButtonProps) => {
    const { className, userFirstName, avatar, isCollapsed } = props;

    return (
        <button className={classNames(cls.ProfileTabButton, {[cls.Collapsed]: isCollapsed}, [className])}>
            {!isCollapsed && (avatar ? <img src={avatar} className={cls.Avatar} alt="avatar"/> : <span className={cls.ProfileTabAvatar}></span>)}

            <Typography
                size={'PARAGRAPH-16-REGULAR'}
                className={classNames(cls.ProfileTabTest, {[cls.Collapsed]: isCollapsed}, [])}
            >
                {isCollapsed ? (userFirstName ? userFirstName.slice(0, 3) : '') : userFirstName ? userFirstName : ''}
            </Typography>
        </button>
    )
});

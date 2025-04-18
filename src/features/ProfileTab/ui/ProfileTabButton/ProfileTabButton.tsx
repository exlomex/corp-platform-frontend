import { classNames } from '@/shared/lib/classNames';
import cls from './ProfileTabButton.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {memo} from "react";

interface ProfileTabButtonProps {
    className?: string;
    userFirstName?: string
}

export const ProfileTabButton = memo((props: ProfileTabButtonProps) => {
    const { className, userFirstName } = props;

    return (
        <button className={classNames(cls.ProfileTabButton, {}, [className])}>
            <span className={cls.ProfileTabAvatar}></span>

            <Typography
                size={'PARAGRAPH-16-REGULAR'}
                className={cls.ProfileTabTest}
            >
                {userFirstName || ''}
            </Typography>
        </button>
    )
});

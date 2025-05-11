import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsProfileTab.module.scss';
import {ProfilePasswordForm, ProfilePersonalDataForm, ProfilePhotoForm} from "@/features/Profile";
import {Typography} from "@/shared/ui/Typography";
import {getUserImageError} from "@/entities/User";
import {useSelector} from "react-redux";

interface SettingsProfileTabProps {
    className?: string;
}

export const SettingsProfileTab = (props: SettingsProfileTabProps) => {
    const { className } = props;

    const userImageError = useSelector(getUserImageError)

    return (
        <div className={classNames(cls.SettingsProfileTab, {}, [className])}>
            <div className={cls.TabField}>
                <Typography size={'PARAGRAPH-18-REGULAR'}>Фото профиля</Typography>
                <ProfilePhotoForm/>
                <Typography size={'PARAGRAPH-16-REGULAR'} className={cls.Error}>{userImageError}</Typography>
            </div>

            <div className={cls.TabField}>
                <div className={cls.PersonalDataWrapper}>
                    <Typography size={'PARAGRAPH-18-REGULAR'}>Данные профиля</Typography>
                    <Typography size={'PARAGRAPH-14-REGULAR'}>Измените свои персональные данные</Typography>
                </div>
                <ProfilePersonalDataForm/>
            </div>

            <div className={cls.TabField}>
                <div className={cls.PersonalDataWrapper}>
                    <Typography size={'PARAGRAPH-18-REGULAR'}>Пароль</Typography>
                    <Typography size={'PARAGRAPH-14-REGULAR'}>Измените свой пароль</Typography>
                </div>
                <ProfilePasswordForm/>
            </div>
        </div>
    )
};

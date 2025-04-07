import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsPage.module.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AsideMenu} from "@/widgets/AsideMenu";
import {SettingsContent} from "../SettingsContent/SettingsContent.tsx";

interface SettingsPageProps {
    className?: string;
}

export function SettingsPage(props: SettingsPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.SettingsPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<SettingsContent/>}
            />
        </div>
    )
}

export default SettingsPage
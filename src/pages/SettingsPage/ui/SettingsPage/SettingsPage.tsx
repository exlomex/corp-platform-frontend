import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsPage.module.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AsideMenu} from "@/widgets/AsideMenu";
import {SettingsContent} from "../SettingsContent/SettingsContent.tsx";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";

interface SettingsPageProps {
    className?: string;
}

export function SettingsPage(props: SettingsPageProps) {
    const { className } = props;

    const {isMobile} = useIsMobile()

    if (isMobile) {
        return (
            <div className={classNames(cls.SettingsPage, {[cls.IsMobile]: isMobile}, [className])}>
                <MainLayout
                    mobileMenu={<MobileMenu/>}
                    content={<SettingsContent/>}
                />
            </div>
        )
    }

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
import { classNames } from '@/shared/lib/classNames';
import cls from './MessagesPage.module.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AsideMenu} from "@/widgets/AsideMenu";
import {MessagesPageContent} from "@/pages/MessagesPage/MessanesPageContent/MessagesPageContent.tsx";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";

interface MessangesPageProps {
    className?: string;
}

export function MessagesPage(props: MessangesPageProps) {
    const { className } = props;

    const {isMobile} = useIsMobile()

    if (isMobile) {
        return (
            <div className={classNames(cls.MessangesPage, {[cls.IsMobile]: isMobile}, [className])}>
                <MainLayout
                    mobileMenu={<MobileMenu/>}
                    content={<MessagesPageContent/>}
                />
            </div>
        )
    }

    return (
        <div className={classNames(cls.MessangesPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<MessagesPageContent/>}
            />
        </div>
    )
}

export default MessagesPage
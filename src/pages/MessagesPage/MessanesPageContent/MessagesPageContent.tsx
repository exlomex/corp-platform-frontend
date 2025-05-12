import { classNames } from '@/shared/lib/classNames';
import cls from './MessagesPageContent.module.scss';
import {MessageLeftSideMenu} from "@/features/Message/ui/MessageLeftSideMenu/MessageLeftSideMenu.tsx";

interface MessangesPageContentProps {
    className?: string;
}

export const MessagesPageContent = (props: MessangesPageContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.MessagesPageContent, {}, [className])}>
            <MessageLeftSideMenu/>
        </div>
    )
};

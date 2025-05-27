import { classNames } from '@/shared/lib/classNames';
import cls from './MessagesPageContent.module.scss';
import {MessageInfo, MessageLeftSideMenu, NewMessageModal} from "@/features/Message";

interface MessagesPageContentProps {
    className?: string;
}

export const MessagesPageContent = (props: MessagesPageContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.MessagesPageContent, {}, [className])}>
            <MessageLeftSideMenu/>
            <MessageInfo/>

            {/* New message */}
            <NewMessageModal/>
        </div>
    )
};

import { classNames } from '@/shared/lib/classNames';
import cls from './MessageCard.module.scss';
import {MessageI} from "@/features/Message/model/types/messageSliceSchema.ts";
import Avatar from '@/shared/assets/icons/messageAvatarIcon.svg'
import {useNavigate} from "react-router";

interface MessageCardProps {
    className?: string;
    message: MessageI
    messageType: 'received' | 'sent'
}


export const MessageCard = (props: MessageCardProps) => {
    const { className, message, messageType } = props;

    const navigate = useNavigate();

    const onMessageCardClickHandler = (messageId: number) =>() => {
        navigate({
            pathname: location.pathname,
            search: `?selectedMessage=${messageId}`,
        });
    }

    return (
        <div className={classNames(cls.MessageCard, {}, [className])} onClick={onMessageCardClickHandler(message.id)}>
            <div className={cls.LeftItem}>{messageType === 'sent' ? (
                message?.to?.imageUrl ? <div><img className={cls.Avatar} src={message?.to?.imageUrl} alt="avatar"/></div> : <span><Avatar/></span>
            ) : (
                message?.from?.imageUrl ? <div><img className={cls.Avatar} src={message?.from?.imageUrl} alt="avatar"/></div> : <span><Avatar/></span>
            )
            }</div>
            <div className={cls.RightItem}>
                <p className={cls.MessageName}>{messageType === 'sent'
                    ? (`${message?.to?.firstName} ${message?.to?.lastName}`)
                    : (`${message?.from?.firstName} ${message?.from?.lastName}`)
                }</p>

                <div className={cls.MessageTitleWrapper}>
                    <p className={cls.MessageTitle}>{message.title}</p>
                    {!message.isRead && <span className={cls.isRead}></span>}
                </div>

                <p className={cls.MessageText}>{message.text}</p>
            </div>
        </div>
    )
};

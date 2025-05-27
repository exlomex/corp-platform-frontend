import { classNames } from '@/shared/lib/classNames';
import cls from './MessageInfo.module.scss';
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchMessageInfoService} from "@/features/Message/model/services/fetchMessageInfoService.ts";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {getMessageInfo} from "../../model/selectors/getMessageValues.ts";
import AvatarIcon from '@/shared/assets/icons/mediumAvatarIcon.svg'
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";
import {MessageFileWrapper} from "@/features/File";

interface MessageInfoProps {
    className?: string;
}

export const MessageInfo = (props: MessageInfoProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParamsSelectedMessageId = queryParams.get('selectedMessage')

    useEffect(() => {
        if (searchParamsSelectedMessageId) {
            dispatch(FetchMessageInfoService({messageId: searchParamsSelectedMessageId}))
        }

    }, [dispatch, searchParamsSelectedMessageId]);

    const messageInfo = useSelector(getMessageInfo);

    if (!searchParamsSelectedMessageId || !messageInfo) {
        return (
            <div className={classNames(cls.MessageInfo, {}, [className])}>
                <div className={cls.WithoutMessage}>
                    Выберите сообщение
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(cls.MessageInfo, {}, [className])}>
            <div className={cls.ReceiverNameWrapper}>
                {
                    !messageInfo.to.imageUrl
                        ? <span className={cls.Avatar}><AvatarIcon/></span>
                        : <img className={cls.Avatar} src={messageInfo.from.imageUrl} alt={'avatar'}/>
                }

                <span className={cls.receiverName}>{`${messageInfo.from.firstName} ${messageInfo.from.lastName}`}</span>
            </div>

            <p className={cls.sentDate}>{dateConverter(new Date(messageInfo.sentAt))}</p>
            <p className={cls.MessageTitle}>{messageInfo.title}</p>
            <p className={cls.MessageText}>{messageInfo.text}</p>

            <div className={cls.MessageFiles}>
                {messageInfo?.files && messageInfo.files.map((messageFile, index) => (
                    <MessageFileWrapper key={index} file={messageFile} />
                ))}
            </div>
        </div>
    )
};

import { classNames } from '@/shared/lib/classNames';
import cls from './MessageLeftSideMenu.module.scss';
import {Select} from "@/shared/ui/Select";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useEffect, useState} from "react";
import {Typography} from "@/shared/ui/Typography";
import {Button} from "@/shared/ui/Button";
import AddIcon from '@/shared/assets/icons/addIcon.svg'
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchReceivedMessagesService} from "@/features/Message/model/services/fetchReceivedMessagesService.ts";
import {FetchSentMessagesService} from "@/features/Message/model/services/fetchSentMessagesService.ts";
import {MessageCard} from "@/features/Message/ui/MessageCard/MessageCard.tsx";
import {useSelector} from "react-redux";
import {
    getMessageIsFetching,
    getReceivedMessages,
    getSentMessages
} from "@/features/Message/model/selectors/getMessageValues.ts";
import {MessageActions} from "../../model/slice/messageSlice.ts";
import {Tooltip} from "@/shared/ui/Tooltip";
import {Skeleton} from "@/shared/ui/Skeleton";


interface MessageLeftSideMenuProps {
    className?: string;
}

export type messageTypes = 'received' | 'sent'
export const MessageLeftSideMenu = (props: MessageLeftSideMenuProps) => {
    const { className } = props;

    const messageType: ComboBoxOption[] = [
        {
            value: 'received',
            label: 'Полученные'
        },
        {
            value: 'send',
            label: 'Отправленные'
        }
    ]

    const [messagesType, setMessagesType] = useState<ComboBoxOption>(messageType[0])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(FetchReceivedMessagesService())
    }, [dispatch]);
    const onSelectNewMessageType = async (option: ComboBoxOption) => {
        if (option.value === 'received') {
            await dispatch(FetchReceivedMessagesService())
        }
        if (option.value === 'send') {
            await dispatch(FetchSentMessagesService())
        }
    }

    const receivedMessages = useSelector(getReceivedMessages)
    const sentMessages = useSelector(getSentMessages)

    const onNewMessageClickHandler = () => {
        dispatch(MessageActions.setNewMessageIsOpen(true))
    }

    const MessagesIsFetching = useSelector(getMessageIsFetching)

    return (
        <div className={classNames(cls.MessageLeftSideMenu, {}, [className])}>
            <div className={cls.MessagesTopLine}>
                <div className={cls.TopLineHeading}>
                    <div className={cls.HeadingWrapper}>
                        <Typography size={'TEXT-26-MEDIUM'}>Сообщения</Typography>
                        {
                            messagesType.value === 'received'
                                ? <span className={cls.CountOfMessages}>{receivedMessages?.length || 0}</span>
                                : <span className={cls.CountOfMessages}>{sentMessages?.length || 0}</span>
                        }
                    </div>

                    <Tooltip text={'Отправить новое сообщение'}>
                        <Button buttonType={'SMART_ICON_BTN_FILLED'} className={cls.MessageAddButton} onClick={onNewMessageClickHandler}><AddIcon/></Button>
                    </Tooltip>
                </div>

                <div>
                    <Select
                        widthType={'FULL_WIDTH'}
                        options={messageType}
                        value={messagesType}
                        onSelectFunc={setMessagesType}
                        onSelectAction={onSelectNewMessageType}
                    >
                    </Select>
                </div>
            </div>


            <div className={cls.MessageCardsWrapper}>
                {MessagesIsFetching
                    ? <div className={cls.MessageCardSkeletonWrapper}>
                        <Skeleton height={40} width={40} border={30}/>

                        <div className={cls.MessageCardSkeletonBottomLine}>
                            <Skeleton height={20} width={100} border={6} marginBottom={10} flexShrink/>
                            <Skeleton height={20} width={'100%'} border={6} marginBottom={10} flexShrink/>
                            <Skeleton height={20} width={'70%'} border={6} flexShrink/>
                        </div>
                    </div>
                    : messagesType.value === 'received'
                    ? (
                        receivedMessages?.length ?
                            (receivedMessages ?? []).map(receivedMessage => (
                                <MessageCard key={receivedMessage.id} message={receivedMessage} messageType="received"/>
                            ))
                            : <p className={cls.MessagesNotFound}>Не найдено</p>
                    ) : (
                        sentMessages?.length ?
                            (sentMessages ?? []).map(sentMessages => (
                                <MessageCard key={sentMessages.id} message={sentMessages} messageType="sent"/>
                            ))
                            : <p className={cls.MessagesNotFound}>Не найдено</p>
                    )}
            </div>
        </div>
    )
};

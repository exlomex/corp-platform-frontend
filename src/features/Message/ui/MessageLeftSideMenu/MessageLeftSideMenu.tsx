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
import {MessageI} from "@/features/Message/model/types/messageSliceSchema.ts";
import {MessageCard} from "@/features/Message/ui/MessageCard/MessageCard.tsx";
import {useSelector} from "react-redux";
import {getReceivedMessages, getSentMessages} from "@/features/Message/model/selectors/getMessageValues.ts";

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
        console.log(option);
        if (option.value === 'received') {
            await dispatch(FetchReceivedMessagesService())
        }
        if (option.value === 'send') {
            await dispatch(FetchSentMessagesService())
        }
    }

    const receivedMessages = useSelector(getReceivedMessages)
    const sentMessages = useSelector(getSentMessages)

    return (
        <div className={classNames(cls.MessageLeftSideMenu, {}, [className])}>
            <div className={cls.MessagesTopLine}>
                <div className={cls.TopLineHeading}>
                    <Typography size={'TEXT-26-MEDIUM'}>Сообщения</Typography>

                    <Button buttonType={'SMART_ICON_BTN_FILLED'} className={cls.MessageAddButton}><AddIcon/></Button>
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
                {messagesType.value === 'received'
                    ? (
                        (receivedMessages ?? []).map(sentMessages => (
                            <MessageCard key={sentMessages.id} message={sentMessages} messageType="received"/>
                        ))
                    ) : (
                        (sentMessages ?? []).map(sentMessages => (
                            <MessageCard key={sentMessages.id} message={sentMessages} messageType="received"/>
                        ))
                    )}
            </div>
        </div>
    )
};

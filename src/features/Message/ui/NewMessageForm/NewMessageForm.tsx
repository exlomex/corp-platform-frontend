import { classNames } from '@/shared/lib/classNames';
import cls from './NewMessageForm.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUsersByCompanyIdService, getUserCompanyId} from "@/entities/User";
import {useSelector} from "react-redux";
import {getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {Select} from "@/shared/ui/Select";
import {Button} from "@/shared/ui/Button";
import PaperClipIcon from '@/shared/assets/icons/Paperclip.svg'
import {UploadFileInputData, UploadFileService} from "@/features/Message/model/services/uploadFileService.ts";
import {File as FileI, SendMessageFileWrapper} from "@/features/File";
import {SendMessageService, SendMessageServiceInputData} from "../../model/services/sendMessageService.ts";
import {jwtDecode} from "jwt-decode";
import {LOCAL_STORAGE_USER_TOKEN} from "@/shared/const/localstorage.ts";
import {tokenInfoTypes} from "@/entities/User/model/types/userSliceSchema.ts";
import {FetchSentMessagesService} from "../../model/services/fetchSentMessagesService.ts";
import {MessageActions} from "@/features/Message/model/slice/messageSlice.ts";

interface NewMessageFormProps {
    className?: string;
}

export const NewMessageForm = (props: NewMessageFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const [normalizedUsers, setNormalizedUsers] = useState<ComboBoxOption[]>(null)
    const [pickedUser, setPickedUser] = useState<ComboBoxOption>(null)

    const selectedCompanyId = useSelector(getUserCompanyId)

    useEffect(() => {
        if (selectedCompanyId) dispatch(FetchUsersByCompanyIdService({companyId: +selectedCompanyId}))
    }, [dispatch, selectedCompanyId]);

    const companyUsers = useSelector(getUserCompanyUsers)

    useEffect(() => {
        if (companyUsers?.length) {
            setNormalizedUsers(
                [{ label: 'Не выбрано', value: '' },
                    ...companyUsers.map(user => {
                        return {
                            id: user.id,
                            label: `${user.firstName} ${user.lastName}`,
                            value: user.firstName,
                            data: {
                                image: user.imageUrl
                            }
                        }})
                ]
            )
        }
    }, [companyUsers]);

    const inputRef = useRef<HTMLInputElement>(null);

    const [messageFiles, setMessageFiles] = useState<FileI[]>([]);

    const onSubmitHandler= async (file: File) => {
        const uploadBody: UploadFileInputData = {
            file: file
        }

        try {
            await dispatch(UploadFileService(uploadBody)).unwrap()
                .then(resFile => setMessageFiles([...messageFiles, resFile]));
        } catch (e) {
            console.error(e)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // && file.size <= 3.5 * 1024 * 1024
        if (file) {
            onSubmitHandler(file);
        } else {
            console.log('Ошибка добавление файла');
        }
    };

    const onDeleteFileHandler = (fileId: number) => () => {
        setMessageFiles(messageFiles.filter((file) => fileId !== file.id));
    }

    const [topicValue, setTopicValue] = useState<string>('');
    const [textValue, setTextValue] = useState<string>('');

    const onSubmitSendMessageHandler = async () => {
        if (!pickedUser || !pickedUser.id || !topicValue || !textValue) return;
        console.log('here');
        const tokenInfo: tokenInfoTypes = jwtDecode(localStorage.getItem(LOCAL_STORAGE_USER_TOKEN));
        const senderId = tokenInfo.id;

        const filesArray = messageFiles.map(file => file.url)

        const messageBody: SendMessageServiceInputData = {
            fromId: senderId,
            toId: pickedUser.id || 0,
            text: textValue,
            title: topicValue,
            files: filesArray
        }

        await dispatch(SendMessageService(messageBody)).unwrap();
        await dispatch(FetchSentMessagesService()).unwrap();
        dispatch(MessageActions.setNewMessageIsOpen(false));
    }

    return (
        <form className={classNames(cls.NewMessageForm, {}, [className])}>
            <Typography className={cls.FormHeading} size={'TEXT-26-MEDIUM'}>Написать сообщение</Typography>

            <div className={cls.ReceiverWrapper}>
                <p className={cls.ReceiverTitle}>Кому</p>
                <Select widthType={'CUSTOM'} className={cls.ReceiverSelect} withImage options={normalizedUsers} value={pickedUser} onSelectFunc={setPickedUser}/>
            </div>

            <div className={cls.TopicWrapper}>
                <p className={cls.TopicTitle}>Тема</p>
                <input value={topicValue} onChange={(event: ChangeEvent<HTMLInputElement>) => setTopicValue(event.target.value)} className={cls.TopicInput} placeholder={'Тема сообщения'}/>
            </div>

            <div className={cls.MessageWrapper}>
                <p className={cls.MessageText}>Сообщение</p>
                <textarea value={textValue} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextValue( event.target.value)} className={cls.MessageTextArea} placeholder={'Сообщение'}/>
            </div>

            {messageFiles && <div className={cls.MessageFilesWrapper}>
                {messageFiles.map((file) => (
                    <SendMessageFileWrapper key={file.id} file={file} onFileDelete={onDeleteFileHandler(file.id)}/>
                ))}
            </div>}

            <div className={cls.FormBottomLine}>
                <input
                    type="file"
                    accept="image/*"
                    className={cls.HiddenInput}
                    ref={inputRef}
                    onChange={handleFileChange}
                />
                <Button onClick={() => inputRef.current?.click()} buttonType={'SMART_ICON_BTN_TRANSPARENT'}><PaperClipIcon/> Добавить файл</Button>
                <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitSendMessageHandler}>Отправить</Button>
            </div>
        </form>
    )
};

import { classNames } from '@/shared/lib/classNames';
import cls from './CommentsForm.module.scss';
import {useSelector} from "react-redux";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import MediumAvatarIcon from '@/shared/assets/icons/mediumAvatarIcon.svg'
import {Button} from "@/shared/ui/Button";
import React, {ChangeEvent, useRef, useState} from "react";
import {TaskI} from "@/entities/Task";
import {addCommentInputData, addCommentService} from "../../../Comments/model/services/addCommentService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";
import PaperClipIcon from '@/shared/assets/icons/smallPaperClipIcon.svg'
import {AddCommentFileWrapper, File as FileI} from "@/features/File";
import {
    UploadCommentFileInputData,
    UploadCommentFileService
} from "../../model/services/uploadCommentFileService.ts";

interface CommentsFormProps {
    className?: string;
    selectedTask: TaskI
}

export const CommentsForm = (props: CommentsFormProps) => {
    const { className, selectedTask } = props;

    const userInfo = useSelector(getUserInfo)

    const [commendValue, setCommentValue] = useState<string>('')

    const onCommentValueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentValue(e?.target?.value)
    }

    const dispatch = useAppDispatch()
    const onSubmitHandler = async () => {
        if (commendValue && selectedTask) {
            const filesArray = commentFiles.map(file => file.url)

            const body: addCommentInputData = {
                taskId: selectedTask.id,
                text: commendValue,
                files: filesArray
            }

            try {
                await dispatch(addCommentService(body)).unwrap()
                await dispatch(FetchCommentsService({taskId: selectedTask.id}))
                setIsActive(false)
                setCommentValue('')
            } catch (e) {
                console.error(e?.message || e)
            }
        }

    }

    const onCancelHandler = () => {
        setIsActive(false)
        setCommentValue('')
        setCommentFiles([])
    }

    const [isActive, setIsActive] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const [commentFiles, setCommentFiles] = useState<FileI[]>([]);

    const onUploadFileHandler= async (file: File) => {
        const uploadBody: UploadCommentFileInputData = {
            file: file
        }

        try {
            await dispatch(UploadCommentFileService(uploadBody)).unwrap()
                .then(resFile => setCommentFiles([...commentFiles, resFile]));
        } catch (e) {
            console.error(e)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUploadFileHandler(file);
        } else {
            console.error('Ошибка добавление файла');
        }
    };

    const onDeleteFileHandler = (fileId: number) => () => {
        setCommentFiles(commentFiles.filter((file) => fileId !== file.id));
    }

    return (
        <form className={classNames(cls.CommentsForm, {}, [className])}>
            <div>
                {userInfo?.imageUrl
                    ? <img className={cls.Avatar} src={userInfo?.imageUrl} alt="avatar"/>
                    : <span className={cls.Avatar}><MediumAvatarIcon/></span>}
            </div>

            <div className={cls.FormContent}>
                <div className={cls.FormWrapper}>
                    <textarea
                        onClick={() => setIsActive(true)}
                        className={cls.TextArea} value={commendValue}
                        placeholder={'Добавить комментарий'}
                        onChange={onCommentValueChangeHandler}>
                    </textarea>

                    {isActive && <div className={cls.FormFiles}>
                        <input
                            type="file"
                            className={cls.HiddenInput}
                            ref={inputRef}
                            onChange={handleFileChange}
                        />

                        <span className={cls.addFileWrapper}>
                            <span className={cls.attachFileWrapper} onClick={() => inputRef.current?.click()}>
                                <span className={cls.PaperClipIcon}><PaperClipIcon/></span>
                                Прикрепить файл
                            </span>

                            {commentFiles && commentFiles.map(file => (
                                <AddCommentFileWrapper key={file.id} file={file} onFileDelete={onDeleteFileHandler(file.id)}/>
                            ))}
                        </span>
                    </div>}
                </div>


                {isActive && <div className={cls.FormBottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitHandler}>Сохранить</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onCancelHandler}>Отменить</Button>
                </div>}
            </div>
        </form>
    )
};

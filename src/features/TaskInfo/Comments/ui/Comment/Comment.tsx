import { classNames } from '@/shared/lib/classNames';
import cls from './Comment.module.scss';
import MediumAvatarIcon from "@/shared/assets/icons/mediumAvatarIcon.svg";
import React, {ChangeEvent, useRef, useState} from "react";
import EditIcon from '@/shared/assets/icons/editIcon.svg'
import {Button} from "@/shared/ui/Button";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {UpdateCommentByIdInputData, UpdateCommentByIdService} from "../../model/services/updateCommentByIdService.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import PaperClipIcon from "@/shared/assets/icons/smallPaperClipIcon.svg";
import {AddCommentFileWrapper, File as FileI} from "@/features/File";
import {
    UploadCommentFileInputData,
    UploadCommentFileService
} from "@/features/TaskInfo/Comments/model/services/uploadCommentFileService.ts";
import {
    AddFileToCommentInputData,
    AddFileToCommentService
} from "@/features/TaskInfo/Comments/model/services/addFileToCommentService.ts";
import {DeleteFileFromComment} from "@/features/TaskInfo/Comments/model/services/deleteFileFromComment.ts";

interface CommentProps {
    className?: string;
    avatar?: string
    fullName: string
    commentText: string
    taskId: number
    commentId: number
    commentFiles: FileI[]
    editIsPossible: boolean;
}

export const Comment = (props: CommentProps) => {
    const { className, fullName, commentText, avatar, taskId, commentId, commentFiles: commentFileProps, editIsPossible } = props;

    const [isHover, setIsHover] = useState<boolean>(false)
    const [isEdited, setIsEdited] = useState<boolean>(false)

    const onCancelHandler = () => {
        setIsEdited(false)
    }

    const [newDescriptionValue, setNewDescriptionValue] = useState<string>(commentText)

    const onNewDescriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescriptionValue(e?.target?.value)
    }

    const dispatch = useAppDispatch()

    const onSubmitHandler = async () => {
        if (newDescriptionValue.trim().length >= 1) {
            if (newDescriptionValue === commentText) {
                setIsEdited(false)
                return
            }

            const updateBody: UpdateCommentByIdInputData = {
                id: commentId,
                text: newDescriptionValue
            }

            try {
                await dispatch(UpdateCommentByIdService(updateBody)).unwrap()
                await dispatch(FetchCommentsService({taskId: taskId}))
                setIsEdited(false)
            } catch (e) {
                console.error(e?.message || e)
            }
        }

    }

    const inputRef = useRef<HTMLInputElement>(null);

    const selectedProject = useSelector(getProjectSelectedProject)
    const userInfo = useSelector(getUserInfo)

    const onDeleteFileHandler = (fileId: number) => async () => {
        try {
            await dispatch(DeleteFileFromComment({fileId: fileId, commentId: commentId}))
            await dispatch(FetchCommentsService({taskId: taskId})).unwrap()
        } catch (e) {
            console.error(e?.message || e)
        }
    }

    const onAddFileHandler= async (file: File) => {
        const uploadBody: UploadCommentFileInputData = {
            file: file
        }

        try {
            const file =  await dispatch(UploadCommentFileService(uploadBody)).unwrap()
            await dispatch(AddFileToCommentService({
                url: file.url,
                commentId: commentId,
            })).unwrap()
            await dispatch(FetchCommentsService({taskId: taskId}))
        } catch (e) {
            console.error(e)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onAddFileHandler(file);
        } else {
            console.error('Ошибка добавление файла');
        }
    };

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={classNames(cls.Comment, {}, [className])}
        >
            <div>
                {avatar?.length
                    ? <img className={cls.Avatar} src={avatar} alt="avatar"/>
                    : <span className={cls.Avatar}><MediumAvatarIcon/></span>}
            </div>

            <div className={cls.CommentContent}>
                <div className={cls.CommentNameWrapper}>
                    <span className={cls.CommentUserName}>{fullName}</span>
                    {(isHover || isEdited) && editIsPossible && <span onClick={() => setIsEdited(true)} className={cls.EditIcon}><EditIcon/></span>}
                </div>

                {
                    !isEdited
                        ? <div>
                            <span className={cls.CommentText}>{commentText}</span>
                            {commentFileProps && <div>
                                {commentFileProps.map(commentFile => (
                                    <AddCommentFileWrapper type={'Comment'} file={commentFile} key={commentFile.id}></AddCommentFileWrapper>
                                ))}
                            </div>}
                        </div>
                        : (
                            <form>
                                <div className={cls.EditCommentWrapper}>
                                    <textarea
                                        value={newDescriptionValue}
                                        onChange={onNewDescriptionChangeHandler}
                                        className={cls.TextArea}
                                    />

                                    <div className={cls.FormFiles}>
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

                                            {commentFileProps && commentFileProps.map(file => (
                                                <AddCommentFileWrapper key={file.id} file={file} onFileDelete={onDeleteFileHandler(file.id)}/>
                                            ))}
                                        </span>
                                    </div>
                                </div>

                                <div className={cls.FormBottomLine}>
                                    <Button buttonType={'SMART_TEXT_BTN_FILLED'}
                                            onClick={onSubmitHandler}>Сохранить</Button>
                                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'}
                                            onClick={onCancelHandler}>Отменить</Button>
                                </div>
                            </form>
                        )
                }
            </div>
        </div>
    )
};

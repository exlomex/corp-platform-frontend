import { classNames } from '@/shared/lib/classNames';
import cls from './Comment.module.scss';
import MediumAvatarIcon from "@/shared/assets/icons/mediumAvatarIcon.svg";
import {ChangeEvent, useState} from "react";
import EditIcon from '@/shared/assets/icons/editIcon.svg'
import {Button} from "@/shared/ui/Button";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {UpdateCommentByIdInputData, UpdateCommentByIdService} from "../../model/services/updateCommentByIdService.ts";

interface CommentProps {
    className?: string;
    avatar?: string
    fullName: string
    commentText: string
    taskId: number
    commentId: number
}

export const Comment = (props: CommentProps) => {
    const { className, fullName, commentText, avatar, taskId, commentId } = props;

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
        if (newDescriptionValue !== commentText && newDescriptionValue.trim().length >= 1) {
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
                    {(isHover || isEdited) && <span onClick={() => setIsEdited(true)} className={cls.EditIcon}><EditIcon/></span>}
                </div>

                {
                    !isEdited
                        ? <span className={cls.CommentText}>{commentText}</span>
                        : (
                            <form>
                                <textarea
                                    value={newDescriptionValue}
                                    onChange={onNewDescriptionChangeHandler}
                                    className={cls.TextArea}
                                />
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

import { classNames } from '@/shared/lib/classNames';
import cls from './CommentsContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {CommentsForm} from "../CommentsForm/CommentsForm.tsx";
import {useSelector} from "react-redux";
import {getTaskComments} from "../../model/selectors/getCommentValues.ts";
import {Comment} from "../Comment/Comment.tsx";
import {useEffect, useRef, useState} from "react";
import {getSelectedTaskInfo} from "@/entities/Task";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";

interface CommentsContentProps {
    className?: string;
}

export const CommentsContent = (props: CommentsContentProps) => {
    const { className } = props;

    const selectedTask = useSelector(getSelectedTaskInfo)

    const taskComments = useSelector(getTaskComments)

    return (
        <div className={classNames(cls.CommentsContent, {}, [className])}>
            <Typography className={cls.CommentsTitle} size={'PARAGRAPH-18-REGULAR'}>Комментарии</Typography>

            <CommentsForm selectedTask={selectedTask}/>

            <div className={cls.CommentContainer}>
                {taskComments && taskComments.map(comment => (
                    <Comment commentId={comment.id} taskId={selectedTask?.id} key={comment.id} fullName={`${comment.author.firstName} ${comment.author.lastName}`} commentText={comment.text}/>
                ))}
            </div>
        </div>
    )
};

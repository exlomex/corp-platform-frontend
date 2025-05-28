 import { classNames } from '@/shared/lib/classNames';
import cls from './CommentsContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {CommentsForm} from "../CommentsForm/CommentsForm.tsx";
import {useSelector} from "react-redux";
import {getTaskComments} from "../../model/selectors/getCommentValues.ts";
import {Comment} from "../Comment/Comment.tsx";
import {getSelectedTaskInfo} from "@/entities/Task";
 import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
 import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";

interface CommentsContentProps {
    className?: string;
}

export const CommentsContent = (props: CommentsContentProps) => {
    const { className } = props;

    const selectedTask = useSelector(getSelectedTaskInfo)
    const selectedProject = useSelector(getProjectSelectedProject)
    const userInfo = useSelector(getUserInfo)

    const taskComments = useSelector(getTaskComments)

    return (
        <div className={classNames(cls.CommentsContent, {}, [className])}>
            <Typography className={cls.CommentsTitle} size={'PARAGRAPH-18-REGULAR'}>Комментарии</Typography>

            {userInfo?.allowedProjects.includes(selectedProject?.id) && <CommentsForm selectedTask={selectedTask}/>}

            <div className={cls.CommentContainer}>
                {taskComments && taskComments.map(comment => (
                    <Comment commentFiles={comment.files} avatar={comment.author?.imageUrl} commentId={comment.id} taskId={selectedTask?.id} key={comment.id} fullName={`${comment.author.firstName} ${comment.author.lastName}`} commentText={comment.text}/>
                ))}
            </div>
        </div>
    )
};

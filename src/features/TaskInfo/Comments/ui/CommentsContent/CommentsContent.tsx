 import { classNames } from '@/shared/lib/classNames';
import cls from './CommentsContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {CommentsForm} from "../CommentsForm/CommentsForm.tsx";
import {useSelector} from "react-redux";
import {
    getTaskComments,
    getTaskCommentsIsFetching,
    getTaskCommentsIsFirstLoading
} from "../../model/selectors/getCommentValues.ts";
import {Comment} from "../Comment/Comment.tsx";
import {getSelectedTaskInfo} from "@/entities/Task";

interface CommentsContentProps {
    className?: string;
    editIsPossible: boolean;
}

export const CommentsContent = (props: CommentsContentProps) => {
    const { className, editIsPossible } = props;

    const selectedTask = useSelector(getSelectedTaskInfo)

    const taskComments = useSelector(getTaskComments)

    const taskCommentsIsFetching = useSelector(getTaskCommentsIsFetching)
    const taskCommentsIsFirstLoading = useSelector(getTaskCommentsIsFirstLoading)

    return (
        <div className={classNames(cls.CommentsContent, {}, [className])}>
            <Typography className={cls.CommentsTitle} size={'PARAGRAPH-18-REGULAR'}>Комментарии</Typography>

            {editIsPossible && <CommentsForm selectedTask={selectedTask}/>}

            <div
                className={classNames(
                    cls.CommentContainer,
                    { [cls.EmptyCommentsContainer]: taskComments?.length === 0 },
                    []
                )}
            >
                {taskCommentsIsFetching ? (
                    // <div className={cls.SkeletonWrapper}>
                    //     <Skeleton height={30} width={30} border={6} />
                    //
                    //     <div className={cls.SkeletonWrapperBottomLine}>
                    //         <Skeleton height={22} width={200} border={6} />
                    //         <Skeleton height={22} width={30} border={6} />
                    //     </div>
                    // </div>
                    <></>
                ) : taskComments?.length > 0 ? (
                    taskComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            editIsPossible={editIsPossible}
                            commentFiles={comment.files}
                            avatar={comment.author?.imageUrl}
                            commentId={comment.id}
                            taskId={selectedTask?.id}
                            fullName={`${comment.author.firstName} ${comment.author.lastName}`}
                            commentText={comment.text}
                        />
                    ))
                ) : (
                    !taskCommentsIsFirstLoading &&
                    !editIsPossible && (
                        <div className={cls.EmptyComments}>Комментарии не найдены</div>
                    )
                )}
            </div>
        </div>
    )
};

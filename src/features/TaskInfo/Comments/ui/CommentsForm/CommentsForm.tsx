import { classNames } from '@/shared/lib/classNames';
import cls from './CommentsForm.module.scss';
import {useSelector} from "react-redux";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import MediumAvatarIcon from '@/shared/assets/icons/mediumAvatarIcon.svg'
import {Button} from "@/shared/ui/Button";
import {ChangeEvent, useState} from "react";
import {TaskI} from "@/entities/Task";
import {addCommentInputData, addCommentService} from "../../../Comments/model/services/addCommentService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";

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
            const body: addCommentInputData = {
                taskId: selectedTask.id,
                text: commendValue
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
    }

    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <form className={classNames(cls.CommentsForm, {}, [className])}>
            <div>
                {userInfo?.imageUrl
                    ? <img className={cls.Avatar} src={userInfo?.imageUrl} alt="avatar"/>
                    : <span className={cls.Avatar}><MediumAvatarIcon/></span>}
            </div>

            <div className={cls.FormContent}>
                <textarea onClick={() => setIsActive(true)} className={cls.TextArea} value={commendValue} placeholder={'Добавить комментарий'} onChange={onCommentValueChangeHandler}></textarea>

                {isActive && <div className={cls.FormBottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitHandler}>Сохранить</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onCancelHandler}>Отменить</Button>
                </div>}
            </div>
        </form>
    )
};

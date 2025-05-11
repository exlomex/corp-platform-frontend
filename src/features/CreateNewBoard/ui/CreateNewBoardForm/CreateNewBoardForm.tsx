import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useCallback} from "react";
import {
    createNewBoardService,
    createNewBoardServiceInputData
} from "../../model/services/createNewBoardService.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {classNames} from "@/shared/lib/classNames";
import {Typography} from "@/shared/ui/Typography";
import cls from './CreateNewBoardForm.module.scss'
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {useNavigate} from "react-router";
import {getRouteProjectBoard} from "@/shared/const/router.ts";
import {BoardInterface} from "@/entities/Board";


interface CreateNewBoardFormProps {
    className?: string;
    onModalClose: () => void
}

interface CreateNewBoardFormDataInputs {
    boardTitle: string;
}

export const CreateNewBoardForm = (props: CreateNewBoardFormProps) => {
    const { className, onModalClose} = props;

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<CreateNewBoardFormDataInputs>()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const selectedProject = useSelector(getProjectSelectedProject)

    const onSubmit: SubmitHandler<CreateNewBoardFormDataInputs> = useCallback(async (data) => {
        const createData: createNewBoardServiceInputData = {
            title: data.boardTitle,
            projectId: selectedProject.id || -1
        }

        try {
            const response: BoardInterface = await dispatch(createNewBoardService(createData)).unwrap()
            await dispatch(FetchUserBoardsByProjectId({projectId: selectedProject.id || -1})).unwrap()
            await navigate(getRouteProjectBoard(String(response.projectId), String(response.id)))
            onModalClose()
        } catch (e) {
            throw new Error(e.message || e)
        }

    }, [dispatch, onModalClose, selectedProject])

    const boardTitleReg = register<'boardTitle'>('boardTitle', { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('boardTitle')});

    return (
        <div className={classNames(cls.CreateNewBoard, {}, [className])}>
            <Typography className={cls.NewBoardHeading} size={'PARAGRAPH-18-REGULAR'}>Новая доска</Typography>
            <p className={cls.NewBoardSubtitle}>Обязательные поля отмечены звездочкой <span>*</span></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper<CreateNewBoardFormDataInputs>
                    required
                    message={errors.boardTitle}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Название доски'}
                    labelSize={'S_SIZE'}
                    labelFor={'boardTitle'}
                    input={
                        <Input<CreateNewBoardFormDataInputs>
                            register={boardTitleReg}
                            id={'boardTitle'}
                            placeholder={'Название доски'}
                            variant={'SMART_INPUT'}
                            maxLength={70}
                        />
                    }
                />

                <div className={cls.NewBoardBottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} regularType={'submit'}>Создать доску</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onModalClose}>Отмена</Button>
                </div>
            </form>
        </div>
    )
};

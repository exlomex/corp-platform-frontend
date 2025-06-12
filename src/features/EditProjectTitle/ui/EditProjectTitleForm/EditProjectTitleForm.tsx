import { classNames } from '@/shared/lib/classNames';
import cls from './EditProjectTitleForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {Typography} from "@/shared/ui/Typography";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {useCallback, useEffect} from "react";
import {
    createNewProjectService,
    createNewProjectServiceInputData
} from "@/features/CreateNewProject/model/services/createNewProjectService.ts";
import {
    EditProjectTitle,
    EditProjectTitleInputData,
    getEditProjectInitialData, ProjectActions,
    ProjectDataInterface,
    selectNewProject
} from "@/entities/Project";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {fetchUserInfo} from "@/features/ProfileTab/model/services/fetchUserInfo.ts";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";

interface EditProjectTitleFormProps {
    className?: string;
    onClose?: () => void;
}

interface EditCompanyTitleFormDataInputs {
    companyTitle: string;
}

export const EditProjectTitleForm = (props: EditProjectTitleFormProps) => {
    const { className, onClose } = props;

    const { register, handleSubmit, trigger, formState: { errors }, reset } = useForm<EditCompanyTitleFormDataInputs>()

    const dispatch = useAppDispatch();

    const companyTitleReg = register<'companyTitle'>('companyTitle', { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('companyTitle')});

    const editProjectTitleInitialData = useSelector(getEditProjectInitialData)

    const onSubmit: SubmitHandler<EditCompanyTitleFormDataInputs> = useCallback(async (data) => {
        const newData: EditProjectTitleInputData = {
            newName: data.companyTitle,
            projectId: editProjectTitleInitialData?.projectId
        }

        try {
            await dispatch(EditProjectTitle(newData)).unwrap()
            await dispatch(FetchUserProjects()).unwrap()
            onClose()
        } catch (e) {
            throw new Error(e.message || e)
        }

    }, [dispatch, editProjectTitleInitialData, onClose])

    useEffect(() => {
        if (editProjectTitleInitialData?.projectTitle) {
            reset({companyTitle: editProjectTitleInitialData.projectTitle});
        }
    }, [editProjectTitleInitialData, reset])

    return (
        <div className={classNames(cls.EditProjectTitleForm, {}, [className])}>
            <Typography className={cls.EditProjectHeading} size={'PARAGRAPH-18-REGULAR'}>Редактирование названия проекта</Typography>
            <p className={cls.EditProjectSubtitle}>Обязательные поля отмечены звездочкой <span>*</span></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper<EditCompanyTitleFormDataInputs>
                    required
                    message={errors.companyTitle}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Название проекта'}
                    labelSize={'S_SIZE'}
                    labelFor={'companyTitle'}
                    input={
                        <Input<EditCompanyTitleFormDataInputs>
                            register={companyTitleReg}
                            id={'companyTitle'}
                            placeholder={'Название проекта'}
                            variant={'SMART_INPUT'}
                            className={cls.FormInput}
                        />
                    }
                />

                <div className={cls.EditProjectTitleBottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} regularType={'submit'}>Изменить название</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onClose}>Отмена</Button>
                </div>
            </form>
        </div>
    )
};

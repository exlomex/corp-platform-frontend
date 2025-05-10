import { classNames } from '@/shared/lib/classNames';
import cls from './CreateNewProjectForm.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useCallback} from "react";
import {createNewProjectService, createNewProjectServiceInputData} from "../../model/services/createNewProjectService.ts";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";

interface CreateNewProjectFormProps {
    className?: string;
    onModalClose: () => void
}

interface CreateNewProjectFormDataInputs {
    companyTitle: string;
    companyShortTitle: string;
}

export const CreateNewProjectForm = (props: CreateNewProjectFormProps) => {
    const { className, onModalClose} = props;

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<CreateNewProjectFormDataInputs>()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<CreateNewProjectFormDataInputs> = useCallback(async (data) => {
        const inviteData: createNewProjectServiceInputData = {
            title: data.companyTitle,
            shortName: data.companyShortTitle,
        }

        try {
            await dispatch(createNewProjectService(inviteData)).unwrap()
            await dispatch(FetchUserProjects()).unwrap()
            onModalClose()
        } catch (e) {
            throw new Error(e.message || e)
        }

    }, [dispatch, onModalClose])

    const companyTitleReg = register<'companyTitle'>('companyTitle', { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('companyTitle')});
    const companyShortTitleReg = register<'companyShortTitle'>('companyShortTitle', { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('companyShortTitle')});

    return (
        <div className={classNames(cls.CreateNewProject, {}, [className])}>
            <Typography className={cls.NewProjectHeading} size={'PARAGRAPH-18-REGULAR'}>Новый проект</Typography>
            <p className={cls.NewProjectSubtitle}>Обязательные поля отмечены звездочкой <span>*</span></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper<CreateNewProjectFormDataInputs>
                    required
                    message={errors.companyTitle}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Название проекта'}
                    labelSize={'S_SIZE'}
                    labelFor={'companyTitle'}
                    input={
                        <Input<CreateNewProjectFormDataInputs>
                            register={companyTitleReg}
                            id={'companyTitle'}
                            placeholder={'Название проекта'}
                            variant={'SMART_INPUT'}
                            className={cls.FormInput}
                        />
                    }
                />

                <InputWrapper<CreateNewProjectFormDataInputs>
                    required
                    message={errors.companyShortTitle}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Ключ проекта'}
                    labelSize={'S_SIZE'}
                    labelFor={'companyShortTitle'}
                    input={
                        <Input<CreateNewProjectFormDataInputs>
                            register={companyShortTitleReg}
                            id={'companyShortTitle'}
                            placeholder={'Ключ'}
                            variant={'SMART_INPUT'}
                            className={cls.FormInput}
                        />
                    }
                />

                <div className={cls.NewProjectBottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} regularType={'submit'}>Создать проект</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onModalClose}>Отмена</Button>
                </div>
            </form>
        </div>
    )
};

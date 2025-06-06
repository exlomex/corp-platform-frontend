import { classNames } from '@/shared/lib/classNames';
import cls from './CreateNewCompanyForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";
import {Input} from "@/shared/ui/Input";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Button} from "@/shared/ui/Button";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getNewCompanyIsFetching} from "../model/selectors/getNewCompanyValues.ts";
import {createNewCompanyService, createNewCompanyServiceInputData} from "../model/services/createNewCompanyService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useNavigate} from "react-router";
import {getRouteMain, getRouteProjects} from "@/shared/const/router.ts";
import {UserSliceActions} from "@/entities/User";
import {BoardActions} from "@/entities/Board";
import {ProjectActions} from "@/entities/Project";

interface CreateNewCompanyFormProps {
    className?: string;
}

interface CreateCompanyDataInputs {
    createCompanyName: string
}

export const CreateNewCompanyForm = (props: CreateNewCompanyFormProps) => {
    const { className } = props;

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<CreateCompanyDataInputs>()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const newCompanyIsFetching = useSelector(getNewCompanyIsFetching)

    useEffect(() => {
        dispatch(UserSliceActions.setCompanyId(undefined))
        dispatch(BoardActions.resetBoards())
        dispatch(ProjectActions.resetProjects())
    }, [dispatch]);

    const onSubmit: SubmitHandler<CreateCompanyDataInputs> = useCallback(async (data) => {
        const companyData: createNewCompanyServiceInputData = {
            title: data.createCompanyName
        }

        try {
            await dispatch(createNewCompanyService(companyData)).unwrap()
            navigate(getRouteProjects())

        } catch (e) {
            console.error(e)
        }
    }, [dispatch, navigate])

    const createCompanyNameReg = register<'createCompanyName'>("createCompanyName", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('createCompanyName')})

    return (
        <div className={classNames(cls.CreateNewCompanyForm, {}, [className])}>
            <Typography align={'CENTER'} className={cls.FormHeading} size={"HEADING-H4"}>Создание компании</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper
                    labelString={'Название компании'}
                    required
                    labelFor={"createCompanyName"}
                    message={errors.createCompanyName}
                    input={
                        <Input<CreateCompanyDataInputs>
                            register={createCompanyNameReg}
                            placeholder={'Введите название компании'}
                            id={'createCompanyName'}
                        />
                    }
                />

                <Button regularType={'submit'} className={cls.SubmitButton} fullWidth isLoading={newCompanyIsFetching}>Создать</Button>
            </form>
        </div>
    )
};

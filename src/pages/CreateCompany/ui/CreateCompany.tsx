import { classNames } from '@/shared/lib/classNames';
import cls from './CreateCompany.module.scss';
import {CreateNewCompanyForm} from "@/features/CreateNewCompany/ui/CreateNewCompanyForm.tsx";
import {Theme} from "@/shared/types/theme.ts";
import {Helmet} from "react-helmet";

interface CreateCompanyProps {
    className?: string;
}

export function CreateCompany(props: CreateCompanyProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.CreateCompany, {}, [className, Theme.LIGHT_THEME])}>
            <Helmet>
                <title>{`Создание компании`}</title>
            </Helmet>

            <CreateNewCompanyForm/>
        </div>
    )
}

export default CreateCompany
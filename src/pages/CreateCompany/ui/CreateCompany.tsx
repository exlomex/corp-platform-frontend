import { classNames } from '@/shared/lib/classNames';
import cls from './CreateCompany.module.scss';
import {CreateNewCompanyForm} from "@/features/CreateNewCompany/ui/CreateNewCompanyForm.tsx";
import {Theme} from "@/shared/types/theme.ts";

interface CreateCompanyProps {
    className?: string;
}

export function CreateCompany(props: CreateCompanyProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.CreateCompany, {}, [className, Theme.LIGHT_THEME])}>
            <CreateNewCompanyForm/>
        </div>
    )
}

export default CreateCompany
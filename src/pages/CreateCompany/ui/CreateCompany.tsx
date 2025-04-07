import { classNames } from '@/shared/lib/classNames';
import cls from './CreateCompany.module.scss';
import {CreateNewCompanyForm} from "@/features/CreateNewCompany/ui/CreateNewCompanyForm.tsx";

interface CreateCompanyProps {
    className?: string;
}

export function CreateCompany(props: CreateCompanyProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.CreateCompany, {}, [className])}>
            <CreateNewCompanyForm/>
        </div>
    )
}

export default CreateCompany
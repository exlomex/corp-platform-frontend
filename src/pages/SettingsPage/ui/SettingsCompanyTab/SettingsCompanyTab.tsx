import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsCompanyTab.module.scss';
import {InviteToCompanyForm} from "@/features/InviteToCompany";
import {Table} from "@/shared/ui/Table";
import {UsersTable} from "@/features/UsersTable";

interface SettingsCompanyTabProps {
    className?: string;
}

export const SettingsCompanyTab = (props: SettingsCompanyTabProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.SettingsCompanyTab, {}, [className])}>
            <InviteToCompanyForm/>
            <UsersTable/>
        </div>
    )
};

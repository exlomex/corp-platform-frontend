import {classNames} from '@/shared/lib/classNames';
import cls from './SettingsCompanyTab.module.scss';
import {InviteToCompanyForm} from "@/features/InviteToCompany";
import {UsersTable} from "@/features/UsersTable";
import {useSelector} from "react-redux";
import {getUserRole, UserRoles} from "@/entities/User";

interface SettingsCompanyTabProps {
    className?: string;
}

export const SettingsCompanyTab = (props: SettingsCompanyTabProps) => {
    const { className } = props;

    const userRole = useSelector(getUserRole)

    return (
        <div className={classNames(cls.SettingsCompanyTab, {}, [className])}>
            {userRole === UserRoles.COMPANY_OWNER ? (
                <>
                    <InviteToCompanyForm/>
                    <UsersTable/>
                </>
            )
                : <p>У вас нет доступа к этой странице</p>
            }


        </div>
    )
};

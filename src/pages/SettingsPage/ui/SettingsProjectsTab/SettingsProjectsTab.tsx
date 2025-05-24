import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsProjectsTab.module.scss';
import {useSelector} from "react-redux";
import {getUserRole, UserRoles} from "@/entities/User";
import {InviteToCompanyForm} from "@/features/InviteToCompany";
import {UsersTable} from "@/features/UsersTable";
import {ProjectUsersTable} from "@/features/ProjectUsersTable";
import {AddUserToProjectModal} from "@/features/AddUserToProject";

interface SettingsProjectsTabProps {
    className?: string;
}

export const SettingsProjectsTab = (props: SettingsProjectsTabProps) => {
    const { className } = props;

    const userRole = useSelector(getUserRole)

    return (
        <div className={classNames(cls.SettingsProjectsTab, {}, [className])}>
            {userRole === UserRoles.COMPANY_OWNER ? (
                    <>
                        <ProjectUsersTable/>
                    </>
                )
                : <p>У вас нет доступа к этой странице</p>
            }

            <AddUserToProjectModal />
        </div>
    )
};

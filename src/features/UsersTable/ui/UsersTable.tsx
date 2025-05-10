import { classNames } from '@/shared/lib/classNames';
import cls from './UsersTable.module.scss';
import {Typography} from "@/shared/ui/Typography";

interface UsersTableProps {
    className?: string;
}

export const UsersTable = (props: UsersTableProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.UsersTable, {}, [className])}>
            <Typography size={'PARAGRAPH-16-REGULAR'}>Все пользователи компании</Typography>
        </div>
    )
};

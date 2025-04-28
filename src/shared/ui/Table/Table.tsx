import { classNames } from '@/shared/lib/classNames';
import cls from './Table.module.scss';
import {ReactElement} from "react";

export type alignVariants = 'left' | 'right' | 'center'
export interface DefaultColumn<T> {
    key: keyof T;
    title: string;
    width?: string;
    alignColumn?: alignVariants;
    alignTableData?: alignVariants
}

export interface ActionColumn<T> {
    key: 'action';
    title: string;
    element: (row: T) => ReactElement;
    width?: string;
    alignColumn?: alignVariants;
    alignTableData?: alignVariants
}

export type Column<T> = DefaultColumn<T> | ActionColumn<T>

export interface TableProps<T> {
    className?: string;
    columns: Column<T> [];
    data?: T[];
}

const ColumnTableDataAlignClasses: Record<alignVariants, string> = {
    'center': cls.AlignDataCenter,
    'left': cls.AlignDataLeft,
    'right': cls.AlignDataRight,
}

export const Table = <T extends object>(props: TableProps<T>) => {
    const {columns, data } = props;

    return (
        <table className={classNames(cls.Table, {}, [])}>
            <thead className={cls.TableHead}>
                <tr>
                    {columns.map(column => (
                        <th className={cls.TableHeader} key={String(column.key)} style={{width: column?.width, textAlign: column?.alignColumn}}>
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>

            {data && (
                <tbody>
                {data.map((row, index) => (
                    <tr key={'id' in row ? String(row.id) : index}>
                        {columns.map(column => (
                            <td
                                className={classNames(cls.TableData, {}, [ColumnTableDataAlignClasses[column?.alignTableData]])}
                                key={String(column.key)}
                                style={{width: column.alignColumn ? '100%' : column?.width}}
                            >
                                {"element" in column ? column.element(row) : String(row[column.key])}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            )}
        </table>
    )
};

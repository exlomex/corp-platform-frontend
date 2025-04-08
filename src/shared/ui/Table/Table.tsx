import { classNames } from '@/shared/lib/classNames';
import cls from './Table.module.scss';

export interface Column<T> {
    key: keyof T;
    title: string;
    width: string
}

export interface TableProps<T> {
    className?: string;
    columns: Column<T>[];
    data?: T[];
}

export const Table = <T,>(props: TableProps<T>) => {
    const {columns, data } = props;

    return (
        <table className={classNames(cls.Table, {}, [])}>
            <thead className={cls.TableHead}>
                <tr>
                    {columns.map(column => (
                        <th className={cls.TableHeader} key={column.key} style={{width: column.width}}>
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>

            {data && (
                <tbody>
                {data.map((row, index) => (
                    <tr key={row.id || index}>
                        {columns.map(column => (
                            <td className={cls.TableData} key={column.key} style={{width: column.width}}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            )}
        </table>
    )
};

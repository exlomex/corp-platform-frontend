import { classNames } from '@/shared/lib/classNames';
import cls from './Table.module.scss';
import {ReactElement, ReactNode, useState} from "react";
import RightArrowIcon from '@/shared/assets/icons/extraSmallRightArrowIcon.svg'

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
    element?: (row: T) => ReactElement;
    width?: string;
    alignColumn?: alignVariants;
    alignTableData?: alignVariants
}

export type Column<T> = DefaultColumn<T> | ActionColumn<T>

export type TableRow<T> = T & {
    id: number;
    children?: TableRow<T>[] | ReactNode;
};

export interface TableProps<T extends object> {
    className?: string;
    columns: Column<T> [];
    data?: TableRow<T>[];
}

const ColumnTableDataAlignClasses: Record<alignVariants, string> = {
    'center': cls.AlignDataCenter,
    'left': cls.AlignDataLeft,
    'right': cls.AlignDataRight,
}

export const Table = <T extends object>(props: TableProps<T>) => {
    const {columns, data, className } = props;

    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

    const toggleRowExpand = (id: number) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderRows = (rows: TableRow<T>[], level: number = 0): ReactElement[] => {
        return rows.flatMap((row, index) => {
            const hasChildren = !!row.children;
            const isExpanded = expandedRows[row.id];

            const baseRow = (
                <tr className={cls.TableRow} key={'id' in row ? String(row.id) : index}>
                    {columns.map(column => {
                        const content: ReactNode =
                            'element' in column
                                ? column.element(row)
                                : row[column.key as keyof T] as ReactNode;

                        return (
                            <td
                                className={classNames(cls.TableData, {}, [ColumnTableDataAlignClasses[column?.alignTableData]])}
                                key={String(column.key)}
                                style={{width: column.alignColumn ? '100%' : column?.width}}
                            >
                            {
                                column.key === 'title'
                                    ? (hasChildren ? (
                                        <div className={cls.TreeTitle} style={{paddingLeft: `${level * 20}px`}}>
                                            {column.key === 'title' && hasChildren && (
                                                <button
                                                    className={classNames(cls.ExpandButton, {[cls.isExpanded]: isExpanded}, [])}
                                                    onClick={() => toggleRowExpand(row.id)}
                                                >
                                                    <RightArrowIcon/>
                                                </button>
                                            )}
                                            {'element' in column
                                                ? column.element(row)
                                                : row[column.key as keyof T] as ReactNode
                                            }
                                        </div>
                                    ) : (
                                            <div style={{paddingLeft: `${level * 20}px`}}>
                                                {content}
                                            </div>
                                        )
                                    )
                                    : (content)
                            }
                        </td>)
                    })}
                </tr>
            );

            const childrenRows = hasChildren && isExpanded && Array.isArray(row.children)
                ? renderRows(row.children, level + 1)
                : [];

            return [baseRow, ...childrenRows];
        });
    };

    return (
        <div className={classNames(cls.TableWrapper, {}, [className])}>
            <table className={classNames(cls.Table, {}, [])}>
                <thead className={cls.TableHead}>
                <tr>
                    {columns.map(column => (
                        <th className={cls.TableHeader} key={String(column.key)}
                            style={{width: column?.width, textAlign: column?.alignColumn}}>
                            {column.title}
                        </th>
                    ))}
                </tr>
                </thead>

                {data && (
                    <tbody>
                    {renderRows(data)}
                    </tbody>
                )}
            </table>
        </div>
    )
};

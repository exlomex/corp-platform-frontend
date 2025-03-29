import { classNames } from '@/shared/lib/classNames';
import cls from './Typography.module.scss';

export const TypographyTypes = {
    'HEADING-H1': cls['font-heading-h1'],
    'HEADING-H2': cls['font-heading-h2'],
    'HEADING-H3': cls['font-heading-h3'],
    'HEADING-H4': cls['font-heading-h4'],
    'TEXT-26-MEDIUM': cls['font-text-26-Medium'],
    'TEXT-26-SEMIBOLD': cls['font-text-26-SemiBold'],
    'TEXT-20-MEDIUM': cls['font-text-20-Medium'],
    'TEXT-20-SEMIBOLD': cls['font-text-20-SemiBold'],
    'PARAGRAPH-18-REGULAR': cls['font-paragraph-18-Regular'],
    'PARAGRAPH-18-MEDIUM': cls['font-paragraph-18-Medium'],
    'PARAGRAPH-16-REGULAR': cls['font-paragraph-16-Regular'],
    'PARAGRAPH-14-REGULAR': cls['font-paragraph-14-Regular'],
    'PARAGRAPH-12-REGULAR': cls['font-paragraph-12-Regular'],
} as const;

export const TypographyAlign = {
    'CENTER': cls['AlignCenter'],
    'LEFT': cls['AlignLeft'],
} as const

interface TypographyProps {
    className?: string;
    children: string;
    size: keyof typeof TypographyTypes;
    align?: keyof typeof TypographyAlign;
}

export const Typography = (props: TypographyProps) => {
    const { className, children, size, align = 'LEFT' } = props;

    const sizeClass = TypographyTypes[size]

    return (
        <div
            className={classNames(cls.Typography, {}, [className, sizeClass, TypographyAlign[align]])}
        >
            {children}
        </div>
    )
};

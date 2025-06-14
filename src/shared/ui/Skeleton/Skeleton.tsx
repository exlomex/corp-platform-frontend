import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string | number;
    marginBottom?: string | number;
    marginTop?: string | number;
    flexShrink?: boolean;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height = 20, width, border, marginBottom, marginTop, flexShrink = false } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
        marginBottom,
        marginTop,
        flexShrink: flexShrink ? 1 : 0
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
            data-testid={'skeleton'}
        />
    );
});

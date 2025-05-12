import { classNames } from '@/shared/lib/classNames';
import cls from './Tooltip.module.scss';
import {ReactElement, useRef, useState} from "react";

interface TooltipProps {
    className?: string;
    text: string;
    children: ReactElement
}

export const Tooltip = (props: TooltipProps) => {
    const { className, children, text } = props;

    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, 50);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setVisible(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classNames(cls.Tooltip, {}, [className])}
        >
            {children}
            {visible && <div className={cls.TooltipText}>{text}</div>}
        </div>
    )
};



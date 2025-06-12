import {classNames} from '@/shared/lib/classNames';
import cls from '../styles/Popups.module.scss';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import React, {memo, MouseEvent, ReactElement, ReactNode, useRef} from "react";
import {Link} from "react-router";
import {Theme} from "@/shared/types/theme.ts";
import {Spinner} from "@/shared/ui/Spinner";
import {AnchorProps} from "@/shared/types/popups.ts";

export interface DropdownItem {
    // disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
    isLoading?: boolean
}

export const GapClasses = {
    20: cls['gap-20'],
    10: cls['gap-10'],
    6: cls['gap-6'],
} as const;

export const FontSizeClasses = {
    16: cls['fSize-16'],
    14: cls['fSize-14'],
    12: cls['fSize-12'],
} as const;

interface DropDownProps {
    className?: string;
    items: DropdownItem[];
    direction?: AnchorProps;
    trigger: ReactElement;
    theme?: Theme;
    gap?: keyof typeof GapClasses;
    fSize?: keyof typeof FontSizeClasses;
    onOpenChange?: (open: boolean) => void
    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void,
    menuItemsClassName?: string
    fullWidth?: boolean
}

export const DropDown = memo((props: DropDownProps) => {
    const { className, trigger,menuItemsClassName, direction = "right", items, theme = Theme.LIGHT_THEME, fullWidth = false, gap = 20, onOpenChange, fSize = 16, onClick} = props;

    const prevOpenRef = useRef<boolean | null>(null);

    return (
            <Menu
                as='div'
                className={classNames(cls.DropDown, {}, [className])}
                onClick={(e) => e.stopPropagation()}

            >
                {({open}) => {
                    if (onOpenChange && prevOpenRef.current !== open) {
                        prevOpenRef.current = open;
                        setTimeout(() => onOpenChange(open), 0);
                    }

                    return (
                        <>
                            <MenuButton onClick={(e) => e.stopPropagation()} as='div'>{trigger}</MenuButton>

                            <MenuItems
                                onClick={(e) => e.stopPropagation()}
                                modal={false}
                                as={'div'}
                                anchor={direction as AnchorProps}
                                transition
                                className={classNames(cls.MenuItems, {[cls.fullWidth]: fullWidth}, [theme === 'light_theme' ? 'light_theme' : 'dark_theme', GapClasses[gap], menuItemsClassName])}
                            >
                                {items.map((value, index) => {
                                    if (value.href) return (
                                        <MenuItem
                                            key={index}
                                            as={Link}
                                            to={value.href}
                                            onClick={(e) => e.stopPropagation()}
                                            className={classNames(cls.MenuItem, {[cls.fullWidth]: fullWidth}, [FontSizeClasses[fSize]])}
                                        >
                                            {value.content}
                                        </MenuItem>
                                    )
                                    return <MenuItem key={index}>
                                        {({ close }) => (
                                            <div
                                                className={classNames(cls.MenuItem, {[cls['ItemLoading']]: value.isLoading}, [FontSizeClasses[fSize]])}
                                                onClick={async (event: MouseEvent<HTMLDivElement>) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                    await value.onClick?.();
                                                    close()
                                                }}
                                            >
                                                {value.isLoading && <span className={cls.Spinner}><Spinner size={'S_SIZE'}/></span>}
                                                {value.content}
                                            </div>
                                        )
                                        }
                                    </MenuItem>
                                })}
                            </MenuItems>
                        </>
                    )
                }}
            </Menu>
    )
});

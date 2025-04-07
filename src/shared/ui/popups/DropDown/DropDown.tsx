import { classNames } from '@/shared/lib/classNames';
import cls from '../styles/Popups.module.scss';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ReactElement, ReactNode, useEffect} from "react";
import {AnchorProps} from "@headlessui/react/dist/internal/floating";
import {Link} from "react-router";

export interface DropdownItem {
    // disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropDownProps {
    className?: string;
    items: DropdownItem[];
    direction?: AnchorProps;
    trigger: ReactElement;
}

export const DropDown = (props: DropDownProps) => {
    const { className, trigger, direction = "right", items } = props;
    return (
            <Menu
                as='div'
                className={classNames(cls.DropDown, {}, [className])}

            >
                <MenuButton as='div'>{trigger}</MenuButton>

                <MenuItems
                    modal={false}
                    as={'div'}
                    anchor={direction as AnchorProps}
                    transition
                    className={cls.MenuItems}
                >
                    {items.map((value, index) => {
                        if (value.href) return (
                            <MenuItem
                                key={index}
                                as={Link}
                                to={value.href}
                                className={cls.MenuItem}
                            >
                                {value.content}
                            </MenuItem>
                        )
                        return (
                            <MenuItem
                                as='div'
                                key={index}
                                className={cls.MenuItem}
                                onClick={value.onClick}
                            >
                                {value.content}
                            </MenuItem>
                        )
                    })}
                </MenuItems>
            </Menu>
    )
};

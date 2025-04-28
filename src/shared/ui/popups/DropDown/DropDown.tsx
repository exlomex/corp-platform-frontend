import { classNames } from '@/shared/lib/classNames';
import cls from '../styles/Popups.module.scss';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {memo, MouseEvent, ReactElement, ReactNode} from "react";
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


interface DropDownProps {
    className?: string;
    items: DropdownItem[];
    direction?: AnchorProps;
    trigger: ReactElement;
    theme?: Theme;
}

export const DropDown = memo((props: DropDownProps) => {
    const { className, trigger, direction = "right", items, theme = Theme.LIGHT_THEME} = props;

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
                    className={classNames(cls.MenuItems, {}, [theme === 'light_theme' ? 'light_theme' : 'dark_theme'])}
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
                        return <MenuItem key={index}>
                            {({ close }) => (
                                <div
                                    className={classNames(cls.MenuItem, {[cls['ItemLoading']]: value.isLoading}, [])}
                                    onClick={async (event: MouseEvent<HTMLDivElement>) => {
                                        event.preventDefault()

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
            </Menu>
    )
});

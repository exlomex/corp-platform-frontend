import { classNames } from '@/shared/lib/classNames';
import cls from '../styles/Popups.module.scss';
import {Popover as HPopover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {AnchorProps} from "@/shared/types/popups.ts";
import {cloneElement, ReactElement} from "react";
import {Theme} from "@/shared/types/theme.ts";
import {GapClasses} from "@/shared/ui/popups/DropDown/DropDown.tsx";

interface PopoverProps {
    className?: string;
    direction?: AnchorProps;
    trigger: ReactElement<{isOpen: boolean}>;
    theme?: Theme;
    children: (args: { open: boolean; close: () => void }) => ReactElement;
    popoverPanelClassName?: string
    gap?: keyof typeof GapClasses;
}

export const Popover = (props: PopoverProps) => {
    const { className, trigger, direction = 'right', theme, children, popoverPanelClassName, gap = 20} = props;
    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, theme, GapClasses[gap]])}
        >
            {({open, close}) => {
                return (
                    <>
                        <PopoverButton as='div'>
                            {cloneElement(trigger, { isOpen: open } as Partial<typeof trigger.props>)}
                        </PopoverButton>

                        <PopoverPanel
                            className={classNames(cls.PopoverContent, {}, [popoverPanelClassName, GapClasses[gap]])}
                            anchor={direction as AnchorProps}
                            transition
                            modal={false}
                        >
                            {children({ open, close })}
                        </PopoverPanel>

                    </>
                )
            }}
        </HPopover>
    )
};

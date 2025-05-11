import { classNames } from '@/shared/lib/classNames';
import cls from '../styles/Popups.module.scss';
import {Popover as HPopover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {AnchorProps} from "@/shared/types/popups.ts";
import {cloneElement, ReactElement} from "react";
import {Theme} from "@/shared/types/theme.ts";

interface PopoverProps {
    className?: string;
    direction?: AnchorProps;
    trigger: ReactElement<{isOpen: boolean}>;
    theme?: Theme;
    children: (args: { open: boolean; close: () => void }) => ReactElement;
    popoverPanelClassName?: string
}

export const Popover = (props: PopoverProps) => {
    const { className, trigger, direction = 'right', theme, children, popoverPanelClassName} = props;
    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, theme])}
        >
            {({open, close}) => {
                return (
                    <>
                        <PopoverButton as='div'>
                            {cloneElement(trigger, { isOpen: open } as Partial<typeof trigger.props>)}
                        </PopoverButton>

                        <PopoverPanel
                            className={classNames(cls.PopoverContent, {}, [popoverPanelClassName])}
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

import ExtraHighPriorityIcon from "@/shared/assets/icons/priority/extraHighPriority.svg";
import HighPriorityIcon from "@/shared/assets/icons/priority/highPriority.svg";
import MediumPriorityIcon from "@/shared/assets/icons/priority/mediumPriority.svg";
import LowPriorityIcon from "@/shared/assets/icons/priority/lowPriority.svg";
import {ReactNode} from "react";
import {Resolution} from "@/entities/Task/const/Resolution.tsx";


export enum Priority {
    HIGHEST = 'Очень cерьезный',
    HIGH = 'Серьезный',
    MEDIUM = 'Средний',
    LOW = 'Низкий',
}

export type PriorityKeys = keyof typeof Priority;

export const priorityIconMap: Record<Priority, ReactNode> = {
    [Priority.HIGHEST]: <ExtraHighPriorityIcon />,
    [Priority.HIGH]: <HighPriorityIcon />,
    [Priority.MEDIUM]: <MediumPriorityIcon />,
    [Priority.LOW]: <LowPriorityIcon />,
};

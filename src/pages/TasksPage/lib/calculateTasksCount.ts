import {TreeTask} from "@/entities/Task/model/types/taskSliceSchema.ts";

export const calculateTasksCount = (filteredTasks: TreeTask[]): number => {
    let tasksCount = 0;
    filteredTasks.forEach(task => {
        tasksCount += 1;

        if (task.children.length >= 1) {
            tasksCount += calculateTasksCount(task.children);
        }
    })

    return tasksCount;
}
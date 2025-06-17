import {TaskFiltersSliceSchema} from "../model/types/taskFiltersSliceSchema.ts";
import {TasksTreeFilters} from "@/entities/Task/model/services/fetchProjectTreeTasksService.ts";
import {PriorityKeys, ResolutionKeys} from "@/entities/Task";
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";

export const prepareFiltersFromState = (filters: TaskFiltersSliceSchema): TasksTreeFilters => {
    return {
        boardIds: filters.selectedBoardsIds,
        authorIds: filters.selectedAuthorIds,
        assigneeIds: filters.selectedAssigneeIds,
        priorities: filters.selectedPriority as PriorityKeys[],
        text: filters.searchQuery,
        resolutions: filters.selectedResolution as ResolutionKeys[],
        deadlineStart: filters.deadlineFrom ? dateConverter(filters.deadlineFrom) : null,
        deadlineEnd: filters.deadlineTo ? dateConverter(filters.deadlineTo) : null,
        storyPointsFrom: filters.storyPointsFrom ? +filters.storyPointsFrom : null,
        storyPointsTo: filters.storyPointsTo ? +filters.storyPointsTo : null,
    };
};
export interface TaskFiltersSliceSchema {
    selectedBoardsIds: (string | number)[];
    selectedResolution: (string | number)[];
    selectedAuthorIds: (string | number)[];
    selectedAssigneeIds: (string | number)[];
    searchQuery: string;
    selectedPriority: (string | number)[];
    deadlineFrom: Date | null;
    deadlineTo: Date | null;
    storyPointsFrom: string;
    storyPointsTo: string;
}
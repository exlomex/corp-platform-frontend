
export interface ProjectDataInterface {
    id: number,
    shortName: string,
    title: string,
    companyId: number,
    ownerId: number,
}

export interface SelectedProjectInterface {
    id: number;
    title: string;
    projectKey: string
}
export interface ProjectSliceSchema {
    userProjects?: ProjectDataInterface[]
    selectedProject?: SelectedProjectInterface

    isFirstFetchUserProject: boolean;
    fetchUserProjectIsLoading: boolean;

    isDeleteProjectFetching: boolean;
}
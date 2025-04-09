
export interface ProjectDataInterface {
    id: number,
    shortName: string,
    title: string,
    companyId: number,
    ownerId: number,
}
export interface ProjectSliceSchema {
    userProjects?: ProjectDataInterface[]
    selectedProject?: number

    isFirstFetchUserProject: boolean;
    fetchUserProjectIsLoading: boolean;

    isDeleteProjectFetching: boolean
}
import {SelectedProjectInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {AppDispatch} from "@/app/providers/Store";
import {NavigateFunction, useParams} from "react-router";
import {ProjectActions} from "@/entities/Project";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {getRouteBoards, getRouteProjectBoard} from "@/shared/const/router.ts";
import {BoardActions} from "@/entities/Board";

interface Params {
    project?: string;
    board?: string;
}

export const selectNewProject = async (
    project: SelectedProjectInterface,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    params: Params,
    close?: () => void
) => {
    dispatch(ProjectActions.setSelectedProject(project));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify(project));
    dispatch(BoardActions.setIsUserBoardsFirstLoading(true))
    if (params.project !== project.title && params.board) {
        try {
            const response = await dispatch(FetchUserBoardsByProjectId({ projectId: project.id })).unwrap();
            if (response.length >= 1) {
                await navigate(getRouteProjectBoard(project.title, String(response[0].id)));
            } else {
                await navigate(getRouteBoards(String(project.id)));
            }
        } catch (e) {
            throw new Error(e.message || e);
        }
    } else {
        navigate(getRouteBoards(String(project.id)))
    }

    if (close) {
        close();
    }
};

// dispatch(BoardActions.setIsUserBoardsFirstLoading(false))
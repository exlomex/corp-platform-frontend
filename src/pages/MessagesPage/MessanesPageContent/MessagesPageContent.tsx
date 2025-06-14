import { classNames } from '@/shared/lib/classNames';
import cls from './MessagesPageContent.module.scss';
import {MessageInfo, MessageLeftSideMenu, NewMessageModal} from "@/features/Message";
import {useLocation, useSearchParams} from "react-router";
import {useEffect, useMemo, useState} from "react";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {Helmet} from "react-helmet";

interface MessagesPageContentProps {
    className?: string;
}

export const MessagesPageContent = (props: MessagesPageContentProps) => {
    const { className } = props;

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search)
    const selectedMessage = queryParams.get("selectedMessage");

    const {isMobile} = useIsMobile();

    if (isMobile) {
        return (
            <div className={classNames(cls.MessagesPageContent, {}, [className])}>
                <Helmet>
                    <title>{`Сообщения`}</title>
                </Helmet>
            {
                selectedMessage ? (
                    <MessageInfo/>
                ) : (
                    <MessageLeftSideMenu/>
                )
            }

            {/* New message */}
            <NewMessageModal/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.MessagesPageContent, {}, [className])}>
            <Helmet>
                <title>{`Сообщения`}</title>
            </Helmet>

            <MessageLeftSideMenu/>
            <MessageInfo/>

            {/* New message */}
            <NewMessageModal/>
        </div>
    )
};

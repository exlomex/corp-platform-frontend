import { createRoot } from 'react-dom/client'
import { App } from '@/app/App.tsx'
import '@/app/styles/index.scss'
import {ThemeProvider} from "@/app/providers/ThemeProvider";
import {BrowserRouter} from "react-router";
import {StoreProvider} from "@/app/providers/Store";
import {LoadingBarContainer} from "react-top-loading-bar";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <LoadingBarContainer>
                    <App />
                </LoadingBarContainer>
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>
)

import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";

function MainLayout(props) {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <ProSidebarProvider>
                    <CssBaseline />
                    <div className="app">
                        <Sidebar isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            {props.children ? props.children : <Outlet />}
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default MainLayout;

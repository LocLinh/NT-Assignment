import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import AddProductForm from "./scenes/forms/addProduct";

function App() {
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
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/manage-products"
                                    element={<Products />}
                                />
                                <Route
                                    path="/manage-products/add"
                                    element={<AddProductForm />}
                                />
                            </Routes>
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;

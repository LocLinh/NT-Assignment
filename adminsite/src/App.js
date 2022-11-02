import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Topbar from "./scene/global/Topbar";
import Dashboard from "./scene/dashboard";
import Sidebar from "./scene/global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
    const [products, setProducts] = useState([]);
    const [theme, colorMode] = useMode();

    useEffect(() => {
        axios
            .get("https://localhost:7151/api/Products")
            .then((res) => setProducts(res.data));
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <ProSidebarProvider>
                        <div className="App">
                            <Sidebar />
                            <main className="content">
                                <Topbar />
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                </Routes>
                                <ul>
                                    {products.map((product, index) => (
                                        <li key={index}>
                                            <h5>{product.name}</h5>
                                        </li>
                                    ))}
                                </ul>
                            </main>
                        </div>
                    </ProSidebarProvider>
                </CssBaseline>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;

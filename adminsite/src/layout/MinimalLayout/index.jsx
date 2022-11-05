import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "../../scenes/login/Login";

function MinimalLayout(props) {
    return (
        <>
            <CssBaseline />
            <div className="app">
                <main className="content">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default MinimalLayout;

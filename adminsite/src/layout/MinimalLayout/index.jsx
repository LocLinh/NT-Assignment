import { Outlet } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

function MinimalLayout(props) {
    return (
        <Box>
            <CssBaseline />
            <div className="app">
                <main className="content">
                    {props.children ? props.children : <Outlet />}
                </main>
            </div>
        </Box>
    );
}

export default MinimalLayout;

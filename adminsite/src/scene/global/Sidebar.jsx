import { useState, useEffect } from "react";
import {
    Sidebar as ProSidebar,
    Menu,
    MenuItem,
    useProSidebar,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { collapsed } = useProSidebar();

    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [selected, setSelected] = useState("Dashboard");

    useEffect(() => {
        setIsCollapsed(!collapsed);
    }, [collapsed]);

    return (
        <Box>
            <ProSidebar style={{ margin: "60px 0 50px 0", border: "none" }}>
                <Menu
                    style={{
                        background: `${colors.grey[800]}`,
                        paddingTop: "20px",
                    }}
                >
                    <MenuItem>
                        {isCollapsed && (
                            <Box>
                                <Typography
                                    variant="h2"
                                    style={{ padding: "40px 0 40px 0" }}
                                >
                                    Admin
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>

                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;

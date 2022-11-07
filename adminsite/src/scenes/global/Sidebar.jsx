import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Cookies from "universal-cookie";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Link
            to={to}
            style={{ textDecoration: "none", color: "gray" }}
            sx={[
                {
                    "&:hover": {
                        background: "#000",
                    },
                },
            ]}
        >
            <MenuItem
                active={selected === title}
                style={{
                    color: colors.grey[300],
                }}
                onClick={() => setSelected(title)}
                icon={icon}
                sx={[
                    {
                        "&:hover": {
                            background: "#000",
                        },
                    },
                ]}
            >
                <Typography>{title}</Typography>
                {/* <Link to={to} /> */}
            </MenuItem>
        </Link>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const cookies = new Cookies();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.grey[600]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                ".cxRqFw:hover, .lkTtqM:hover": {
                    backgroundColor: `${colors.grey[600]}`,
                },
                ".cxRqFw, .lkTtqM.ative": {
                    backgroundColor: `${colors.grey[600]}`,
                },
            }}
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{ border: "none", height: "100vh" }}
            >
                <Menu
                    style={{
                        background: `${colors.grey[800]}`,
                        border: "none",
                        height: "100%",
                    }}
                >
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant="h3"
                                    color={colors.grey[100]}
                                >
                                    ADMIN
                                </Typography>
                                <IconButton
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "0"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage Customers"
                            to="/Users"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage products"
                            to="/manage-products"
                            icon={<ShoppingCartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Manage categories"
                            to="/manage-categories"
                            icon={<CategoryOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Login"
                            to="/login"
                            icon={<LoginIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <MenuItem
                            icon={<PowerSettingsNewOutlinedIcon />}
                            onClick={() => {
                                cookies.remove("Token");
                                navigate("/login");
                            }}
                            style={{ color: colors.grey[300] }}
                        >
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;

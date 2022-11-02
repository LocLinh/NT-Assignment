import React from "react";
import {
    IconButton,
    useTheme,
    Box,
    Toolbar,
    AppBar,
    Typography,
    Badge,
    MenuItem,
    Menu,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../styles/TopbarStyles";
import { useProSidebar } from "react-pro-sidebar";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { collapseSidebar } = useProSidebar();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => collapseSidebar()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        ADMIN SITE
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchOutlinedIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            aria-label="theme"
                            color="inherit"
                            onClick={colorMode.toggleColorMode}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlined />
                            ) : (
                                <LightModeOutlined />
                            )}
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="setting for the whole app"
                            color="inherit"
                        >
                            <SettingsOutlinedIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default Topbar;

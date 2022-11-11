import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Cookies from "universal-cookie";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSise] = useState(10);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("Token");

        axios
            .get("https://localhost:7151/account/Users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => setUsers(res.data));
    }, []);

    function GetFullName(params) {
        return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
    }

    const columns = [
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
        {
            field: "fullname",
            headerName: "Full name",
            valueGetter: GetFullName,
            flex: 1,
        },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "phoneNumber", headerName: "Phone number", flex: 1 },
    ];

    return (
        <Box
            height="80vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScoller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
            }}
        >
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.username}
                rowsPerPageOptions={[10, 15, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSise(newPageSize)}
                getRowHeight={() => "auto"}
                getRowSpacing={() => ({
                    top: 5,
                    bottom: 5,
                })}
            ></DataGrid>
        </Box>
    );
};

export default Users;

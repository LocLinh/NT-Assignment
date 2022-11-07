import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

const Categories = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSise] = useState(10);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("https://localhost:7151/api/ProductCategoriesModels")
            .then((res) => setCategories(res.data));
    }, []);
    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Category name", flex: 1 },
        { field: "desc", headerName: "Description", flex: 1 },
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
                rows={categories}
                columns={columns}
                getRowId={(row) => row.id}
                rowsPerPageOptions={[10, 15, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSise(newPageSize)}
                // getRowHeight={() => "auto"}
            ></DataGrid>
        </Box>
    );
};

export default Categories;

import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const handleDeleteProduct = (id) => {
    console.log(id);
};

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get("https://localhost:7151/api/Products")
            .then((res) => setProducts(res.data));
    }, []);
    const columns = [
        { field: "id", headerName: "Id" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "categoryName", headerName: "Category", flex: 1 },
        { field: "price", headerName: "Price", flex: 1, type: "number" },
        { field: "discountPercent", headerName: "Discount", type: "number" },
        { field: "imagePath", headerName: "Image", flex: 1 },
        {
            field: "Access",
            headerName: "Access",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box>
                        <BorderColorIcon />
                        <DeleteIcon onClick={handleDeleteProduct} />
                    </Box>
                );
            },
        },
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
            <DataGrid rows={products} columns={columns}></DataGrid>
            <Link to="/manage-products/add" style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="success"
                >
                    Thêm sản phẩm
                </Button>
            </Link>
        </Box>
    );
};

export default Products;

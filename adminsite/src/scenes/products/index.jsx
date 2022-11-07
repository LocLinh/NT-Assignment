import { Box, useTheme, Button, Fab, Modal } from "@mui/material";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const handleDeleteProduct = (id) => {
    axios
        .delete(`https://localhost:7151/api/Products/${id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const handlePutProduct = (id, product) => {
    axios
        .put(`https://localhost:7151/api/Products/${id}`, product, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageSize, setPageSise] = useState(10);
    const [rowModesModel, setRowModesModel] = useState({});
    const [open, setOpen] = useState(0);
    const handleOpen = (id) => {
        setOpen(id);
    };
    const handleClose = () => {
        setOpen(0);
    };
    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: "view" },
        });
        console.log(rowModesModel);
    };

    const handleDeleteClick = (id) => () => {
        handleDeleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        handleClose();
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = products.find((row) => row.id === id);
        if (editedRow.isNew) {
            setProducts(products.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow, oldRow) => {
        const updatedRow = { ...newRow, isNew: false };
        if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
            setProducts(
                products.map((row) => (row.id === newRow.id ? updatedRow : row))
            );
            var newCategory = categories.filter(
                (o) => o.name === newRow.categoryName
            );
            newRow.categoryId = newCategory[0].id;
            handlePutProduct(newRow.id, JSON.stringify(newRow));
        }
        return updatedRow;
    };

    useEffect(() => {
        axios
            .get("https://localhost:7151/api/Products")
            .then((res) => setProducts(res.data));
        axios
            .get("https://localhost:7151/api/ProductCategoriesModels")
            .then((res) => setCategories(res.data));
    }, []);

    const columns = [
        { field: "id", headerName: "Id", width: 50 },
        {
            field: "name",
            headerName: "Name",
            width: 150,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            editable: true,
        },
        {
            field: "categoryName",
            headerName: "Category",
            width: 100,
            editable: true,
            type: "singleSelect",
            valueOptions: categories.map((o) => o.name),
        },
        {
            field: "price",
            headerName: "Price",
            width: 120,
            type: "number",
            editable: true,
        },
        {
            field: "discountPercent",
            headerName: "Discount",
            type: "number",
            editable: true,
        },
        { field: "imagePath", headerName: "Image", width: 150, editable: true },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            cellClassName: "actions",
            flex: 0.5,
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <Fab
                            onClick={handleSaveClick(id)}
                            color="success"
                            size="small"
                        >
                            <SaveIcon />
                        </Fab>,
                        <Fab
                            onClick={handleCancelClick(id)}
                            color="secondary"
                            size="small"
                        >
                            <CancelIcon />
                        </Fab>,
                    ];
                }
                return [
                    <Fab
                        onClick={handleEditClick(id)}
                        color="info"
                        size="small"
                    >
                        <BorderColorIcon />
                    </Fab>,
                    <Fab
                        onClick={() => handleOpen(id)}
                        color="error"
                        size="small"
                    >
                        <DeleteIcon />
                    </Fab>,
                ];
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
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row.id}
                editMode="row"
                rowsPerPageOptions={[10, 15, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSise(newPageSize)}
                getRowHeight={() => "auto"}
                getRowSpacing={() => ({
                    top: 5,
                    bottom: 5,
                })}
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
            ></DataGrid>
            <Modal
                open={open !== 0}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "400px",
                        backgroundColor: colors.redAccent["400"],
                        padding: "10px 20px",
                        border: "2px solid black",
                        boxShadow: "20px",
                        textAlign: "center",
                        fontSize: "bold",
                    }}
                >
                    <h2 id="parent-modal-title">Delete this product</h2>
                    <p id="parent-modal-description">
                        This product will be removed forever.
                    </p>
                    <Button onClick={handleDeleteClick(open)}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </Box>
            </Modal>
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

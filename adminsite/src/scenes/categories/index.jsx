import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Fab, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const handleDeleteCategory = (id) => {
    axios
        .delete(`https://localhost:7151/api/ProductCategoriesModels/${id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const handleUpdateCategory = (id, category) => {
    axios
        .put(
            `https://localhost:7151/api/ProductCategoriesModels/${id}`,
            category,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const Categories = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSise] = useState(10);
    const [categories, setCategories] = useState([]);
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

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: "view" },
        });
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: "edit" },
        });
    };

    const handleDeleteClick = (id) => () => {
        handleDeleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
        handleClose();
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: "view", ignoreModifications: true },
        });

        const editedRow = categories.find((row) => row.id === id);
        if (editedRow.isNew) {
            setCategories(categories.filter((category) => category.id !== id));
        }
    };

    const processRowUpdate = (newRow, oldRow) => {
        const updatedRow = { ...newRow, isNew: false };
        if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
            setCategories(
                categories.map((row) =>
                    row.id === newRow.id ? updatedRow : row
                )
            );
            handleUpdateCategory(newRow.id, newRow);
        }
        return updatedRow;
    };

    useEffect(() => {
        axios
            .get("https://localhost:7151/api/ProductCategoriesModels")
            .then((res) => setCategories(res.data));
    }, []);

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Category name", flex: 1, editable: true },
        { field: "desc", headerName: "Description", flex: 1, editable: true },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            cellClassName: "actions",
            flex: 0.5,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === "edit";
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
                rows={categories}
                columns={columns}
                getRowId={(row) => row.id}
                editMode="row"
                rowsPerPageOptions={[10, 15, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSise(newPageSize)}
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
                    <h2 id="parent-modal-title">Delete this category</h2>
                    <p id="parent-modal-description">
                        This category will be removed forever.
                    </p>
                    <Button onClick={handleDeleteClick(open)}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </Box>
            </Modal>
            <Link
                to="/manage-categories/add"
                style={{ textDecoration: "none" }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="success"
                >
                    Thêm loại mặt hàng
                </Button>
            </Link>
        </Box>
    );
};

export default Categories;

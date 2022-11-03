import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

const AddProductForm = () => {
    const [categories, setCategories] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        axios
            .get("https://localhost:7151/api/ProductCategoriesModels")
            .then((res) => setCategories(res.data));
    }, []);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
        axios
            .post("https://localhost:7151/api/Products", values, {
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

    return (
        <Box m="20px">
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile
                                        ? undefined
                                        : "span 4",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <Select
                                fullWidth
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.categoryId}
                                name="categoryId"
                                error={
                                    !!touched.categoryId && !!errors.categoryId
                                }
                                sx={{
                                    gridColumn: "span 2",
                                    background:
                                        theme.palette.mode === "dark"
                                            ? "#293040"
                                            : "#ededed",
                                }}
                            >
                                {categories.map((cate) => (
                                    <MenuItem value={cate.id} key={cate.id}>
                                        {cate.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={
                                    !!touched.description &&
                                    !!errors.description
                                }
                                helperText={
                                    touched.description && errors.description
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Discount Percent"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.discountPercent}
                                name="discountPercent"
                                error={
                                    !!touched.discountPercent &&
                                    !!errors.discountPercent
                                }
                                helperText={
                                    touched.discountPercent &&
                                    errors.discountPercent
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Image Link"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.imagePath}
                                name="imagePath"
                                error={
                                    !!touched.imagePath && !!errors.imagePath
                                }
                                helperText={
                                    touched.imagePath && errors.imagePath
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            >
                                Create New Product
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    discountPercent: yup
        .number()
        .moreThan(-0.1, "Bigger than 0")
        .required("required"),
    price: yup
        .number()
        .moreThan(-0.1, "Money bigger than 0")
        .required("required"),
    categoryId: yup.string().required("required"),
    imagePath: yup.string().nullable(),
});
const initialValues = {
    name: "",
    description: "",
    discountPercent: 0,
    price: 0,
    categoryId: "",
    imagePath: "",
};

export default AddProductForm;

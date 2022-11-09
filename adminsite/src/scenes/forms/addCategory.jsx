import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const handleFormSubmit = (values) => {
    axios
        .post("https://localhost:7151/api/ProductCategoriesModels", values, {
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

const AddCategoryForm = () => {
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
                                    gridColumn: "span 4",
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
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.desc}
                                name="desc"
                                error={!!touched.desc && !!errors.desc}
                                helperText={touched.desc && errors.desc}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            >
                                Create New Category
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    desc: yup.string().required("required"),
});

const initialValues = {
    name: "",
    desc: "",
};

export default AddCategoryForm;

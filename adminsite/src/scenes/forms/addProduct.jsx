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
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebaseConfig";
import FileInput from "../../components/imageInput";
import ImageCropper from "../../utils/imageCropper";
import { dataURLtoFile } from "../../utils/cropImage";

const AddProductForm = () => {
    const [categories, setCategories] = useState([]);
    const theme = useTheme();
    const [imageUpload, setImageUpload] = useState(null);
    const [imgAfterCrop, setImgAfterCrop] = useState(null);
    const [currentPage, setCurrentPage] = useState("choose-img");
    const [imageUrl, setImageUrl] = useState("");

    // get category data for input
    useEffect(() => {
        axios
            .get("https://localhost:7151/api/ProductCategoriesModels")
            .then((res) => setCategories(res.data));
    }, []);

    const handleFormSubmit = (values) => {
        values.imagePath = imageUrl;
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

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const onImageSelected = (selectedImg) => {
        setImageUpload(selectedImg);
        setCurrentPage("crop-img");
    };

    const onCropDone = (imgCroppedArea) => {
        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = imageUpload;
        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataURL = canvasEle.toDataURL("image/jpeg");
            const croppedFile = dataURLtoFile(dataURL, "newfile");
            setImgAfterCrop(dataURL);
            setImageUpload(croppedFile);
            setCurrentPage("img-cropped");
        };
    };

    const onCropCancel = () => {
        setCurrentPage("choose-img");
        setImageUpload(null);
    };

    const handleUploadImage = () => {
        if (imageUpload == null) {
            alert("Please upload an image first!");
            return;
        }

        console.log("uploading");
        const imageName = uuidv4();
        const imageRef = ref(storage, `productImages/${imageName}`);
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImageUrl(downloadURL);
                });
            }
        );
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
                    setFieldValue,
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
                                disabled={true}
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Image Link"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={imageUrl}
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
            <Box>
                {currentPage === "choose-img" ? (
                    <FileInput
                        setImage={setImageUpload}
                        onImageSelected={onImageSelected}
                    />
                ) : currentPage === "crop-img" ? (
                    <ImageCropper
                        image={imageUpload}
                        onCropDone={onCropDone}
                        onCropCancel={onCropCancel}
                    />
                ) : (
                    <div>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "top",
                            }}
                        >
                            <Button
                                onClick={handleUploadImage}
                                className="btn"
                                color="success"
                                variant="contained"
                            >
                                Confirm
                            </Button>

                            <Button
                                onClick={() => {
                                    setCurrentPage("choose-img");
                                    setImageUpload(null);
                                }}
                                className="btn"
                                color="success"
                                variant="contained"
                            >
                                New image
                            </Button>
                        </div>
                        <div
                            style={{
                                width: "240px",
                                height: "300px",
                                padding: "10px",
                                display: "inline-block",
                                transform: "translate(50%, -15%)",
                            }}
                        >
                            <img
                                src={imgAfterCrop}
                                className="cropped-img"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                )}
            </Box>
        </Box>
    );
};

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

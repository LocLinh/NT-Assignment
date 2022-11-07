import axios from "axios";
import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebaseConfig";
import FileInput from "../../components/imageInput";
import ImageCropper from "../../utils/imageCropper";
import { dataURLtoFile } from "../../utils/cropImage";

const Dashboard = () => {
    const inputRef = useRef();
    const [imageUpload, setImageUpload] = useState(null);
    const [imgAfterCrop, setImgAfterCrop] = useState(null);
    const [currentPage, setCurrentPage] = useState("choose-img");
    const [imageUrl, setImageUrl] = useState("");

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
        <Box>
            <Box>huhu</Box>
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
                            width: "240px",
                            height: "300px",
                            padding: "10px",
                        }}
                    >
                        <img src={imgAfterCrop} className="cropped-img" />
                    </div>

                    <Button
                        onClick={handleUploadImage}
                        color="success"
                        variant="contained"
                    >
                        uploadImage
                    </Button>

                    <Button
                        onClick={() => {
                            setCurrentPage("choose-img");
                            setImageUpload(null);
                        }}
                        color="success"
                        variant="contained"
                    >
                        New image
                    </Button>
                </div>
            )}
        </Box>
    );
};

export default Dashboard;

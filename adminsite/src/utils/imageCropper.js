import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@mui/material";

function ImageCropper({ image, onCropDone, onCropCancel }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 5);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    return (
        <div
            className="cropper"
            sx={{
                ".reactEasyCrop_Container": {
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "0",
                },
            }}
        >
            <div>
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: {
                            width: "240px",
                            height: "300px",
                            bottom: "0",
                            top: "470px",
                            left: "45%",
                            backgroundColor: "#eeeee4",
                        },
                    }}
                />
            </div>

            <div className="action-btns">
                <Button
                    className="btn btn-outline"
                    onClick={onCropCancel}
                    color="error"
                    variant="contained"
                >
                    Cancel
                </Button>

                <Button
                    className="btn"
                    onClick={() => {
                        onCropDone(croppedArea);
                    }}
                    color="success"
                    variant="contained"
                >
                    Done
                </Button>
            </div>
        </div>
    );
}

export default ImageCropper;

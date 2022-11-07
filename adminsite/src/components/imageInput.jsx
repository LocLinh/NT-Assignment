import React, { useRef } from "react";
import { Button } from "@mui/material";

function FileInput({ onImageSelected }) {
    const inputRef = useRef();

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result);
            };
        }
    };

    const onChooseImg = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleOnChange}
                style={{ display: "none" }}
            />

            <Button
                className="btn"
                onClick={onChooseImg}
                color="secondary"
                variant="contained"
            >
                Choose Image
            </Button>
        </div>
    );
}

export default FileInput;

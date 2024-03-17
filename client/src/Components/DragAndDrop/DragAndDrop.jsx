import { useEffect, useState } from "react";
import { useRef } from "react";
import "./DragAndDrop.css";
import PropTypes from 'prop-types';

const DragAndDrop = ({ onChange }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const inputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [preview, setPreview] = useState("");

    const allowedFormats = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/avif"
    ];

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const tempFile = e.dataTransfer.files[0];

        if (tempFile) {
            if (allowedFormats.includes(tempFile.type)) {
                setUploadedFile(e.dataTransfer.files[0]);
                setUploadedFileName(e.dataTransfer.files[0].name);
            } else {
                alert("Please select a valid image file (SVG, PNG, JPG, AVIF).");
            }
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        const tempFile = e.target.files[0];
        if (tempFile) {
            if (allowedFormats.includes(tempFile.type)) {
                setUploadedFile(e.target.files[0]);
                setUploadedFileName(e.target.files[0].name);
            } else {
                alert("Please select a valid image file (SVG, PNG, JPG, AVIF).");
            }
        }
    };

    const removeImage = () => {
        setUploadedFile(null);
        setUploadedFileName("");
    }

    useEffect(() => {
        if (!uploadedFile) {
            return;
        }

        const file = new FileReader;
        file.onload = function () {
            setPreview(file.result)
        }
        file.readAsDataURL(uploadedFile)
        onChange(uploadedFile);
    }, [uploadedFile, preview]);

    // console.log(preview)

    return (
        <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={e => e.preventDefault()}
        >
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={false}
                onChange={handleChange}
            />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={dragActive ? "drag-active" : ""}
            >
                <div>
                    {uploadedFileName ? (
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <img src={preview} alt="uploaded Image" width={250} height={250} className="object-cover rounded-lg" />
                            <p className="text-primary-pink/60 flex flex-col items-center gap-4">
                                📁 Uploaded File: {uploadedFileName}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 items-center">
                            <p>Drag and drop your file here ✨</p>
                            <p className="text-gray-400">OR</p>
                            <span className="upload-button">
                                Upload a file 👈
                            </span>
                            <p className="text-gray-400/80 py-2">Supported formats: SVG, PNG, JPG, JPEG & AVIF</p>
                        </div>
                    )}
                </div>
            </label>
            {dragActive && (
                <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></div>
            )}
            {uploadedFile ? <button onClick={removeImage} className="mt-3 text-base text-red-500 hover:text-red-500/60">Remove</button> : null}
        </form>
    );
};

DragAndDrop.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default DragAndDrop;

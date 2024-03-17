/* eslint-disable react/prop-types */
import { useState } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

const NewPostModal = ({ onSubmit, onClose }) => {
    const [newPost, setNewPost] = useState({
        name: "",
        img: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(newPost);
        onSubmit(newPost);
    };

    return (
        <div className="inset-0 fixed flex justify-center items-center bg-black/60 h-screen w-full flex-col">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-2xl shadow-blue-500/40 p-4 flex justify-center items-center flex-col w-1/2 gap-5"
            >
                <div className="text-4xl font-medium">Save an Image</div>
                <input
                    type="text"
                    required
                    className="px-4 py-3 bg-gray-300/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    onChange={(e) => setNewPost((newPost) => ({
                        ...newPost,
                        name: e.target.value
                    }))}
                    placeholder="Name"
                />
                <DragAndDrop onChange={(result) => setNewPost({ ...newPost, img: result })} />
                <div className="p-2 flex flex-row justify-between w-1/3">
                    <button
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 bg-blue-500 text-white"
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 border-2 border-blue-500 text-blue-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPostModal;

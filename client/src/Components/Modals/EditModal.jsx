/* eslint-disable react/prop-types */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Loader from "../Loader/Loader";

const EditModal = ({ blogId, onSubmit, onClose }) => {
    const [updatedBlogDetails, setUpdatedBlogDetails] = useState({
        name: '',
        img: ''
    });

    const [file, setFile] = useState(null)

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}posts/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUpdatedBlogDetails({
                name: res.data.name,
                img: res.data.img,
            });
        } catch (error) {
            setMessage('Error in fetching the Blog, try again later')
        } finally {
            setLoading(false)
        }
    }, [blogId, token])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBody = {
            name: updatedBlogDetails.name,
            img: file
        }
        onSubmit(updatedBody);
    };

    return (
        <div className="fixed bg-black/40 inset-0 flex items-center justify-center flex-col">
            {
                loading ? (
                    <div>
                        <Loader />
                    </div >
                ) : (
                    <div
                        className="flex flex-col items-center gap-5 rounded-2xl px-4 py-8 bg-white w-1/2 h-max w-max shadow-2xl shadow-blue-500/50"
                    >
                        <div className="text-4xl font-medium">Update your Image here</div>
                        <div className="flex flex-col items-center w-full gap-5">
                            <input
                                type="text"
                                required
                                onChange={(e) =>
                                    setUpdatedBlogDetails((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                value={updatedBlogDetails.name}
                                className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                            />
                            <div className="flex flex-row w-max h-max justify-center gap-5 px-4 overflow-hidden">
                                <img src={updatedBlogDetails.img} alt="Image" width={250} height={250} className="object-cover rounded-lg overflow-hidden" />
                                <DragAndDrop onChange={(result) => setFile(result)} />
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-end gap-5">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 bg-blue-500 text-white"
                            >
                                Update
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-1 rounded-full text-lg hover:shadow-lg hover:shadow-blue-500/40 border-2 border-blue-500 text-blue-500"
                            >
                                Cancel
                            </button>
                        </div>
                        {message !== "" && <div className="p-2 text-blue-500">{message}</div>}
                    </div >
                )
            }
        </div >
    );
};

export default EditModal;

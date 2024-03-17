import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../../Components/Modals/DeleteModal";
import EditModal from "../../Components/Modals/EditModal";
import NewPostModal from "../../Components/Modals/NewPostModal";
import Loader from "../../Components/Loader/Loader";

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [blogs, setBlogs] = useState([]);

    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newPostModal, setNewPostModal] = useState(false);

    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [message, setMessage] = useState({
        message: "",
        status: true,
    });

    const token = useSelector((state) => state.user.token);

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const params = searchText ? { name: searchText } : {};
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}posts/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params
            });
            setBlogs(res.data);
            // console.log(res)
            setMessage({
                message: "All the saved images are here",
                status: true,
            });
        } catch (error) {
            setMessage({
                message: "Unable to fetch the data, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
        }
    }, [token, searchText]);

    useEffect(() => {
        fetchData();
    }, [fetchData, searchText]);

    const submitSearch = () => {
        setSearchText(search);
    }

    const clearSearch = () => {
        setSearchText('');
    }


    const handleEdit = (blogId) => {
        setEditId(blogId);
        setEditModal(true);
    };

    const handleUpdate = async (blog) => {
        // console.log(blog)
        const formData = new FormData();
        formData.append("name", blog.name);
        formData.append("img", blog.img);
        setLoading(true)
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}posts/update/${editId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage({
                message: "Blog updated!",
                status: true,
            });
            fetchData();
        } catch (error) {
            console.log(error)
            setMessage({
                message: "Unable to edit, try again later",
                status: true,
            });
        } finally {
            setEditModal(false);
            setLoading(false)
        }
    };

    const handleConfirmation = (delId) => {
        setDeleteId(delId);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}posts/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage({
                message: "Post deleted!",
                status: true,
            });
            fetchData();
        } catch (error) {
            setMessage({
                message: "Unable to delete the post, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
            setDeleteModal(false);
        }
    };

    const handleCreateNewPost = async (newPost) => {
        // console.log(newPost)
        const formData = new FormData();
        formData.append("username", user.email);
        formData.append("img", newPost.img);
        formData.append("name", newPost.name);
        setLoading(true)
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}posts/add/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage({
                message: "New post created!",
                status: true,
            });
            fetchData();
        } catch (error) {
            console.log(error)
            setMessage({
                message: "Unable to add new post, try again later",
                status: true,
            });
        } finally {
            setLoading(false)
            setNewPostModal(false);
        }
    };

    return (
        <div>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <Loader />
                    </div>
                )
                    : (
                        <div className="p-4 flex flex-row gap-10 w-full justify-between">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-5 p-4 rounded-xl bg-white h-max shadow-xl shadow-blue-500/40 w-[25rem]">
                                    <div className="text-2xl font-medium">Your Profile</div>
                                    <div className="flex flex-row gap-5 items-center">
                                        <div className="h-20 w-20 overflow-hidden rounded-full">
                                            <img
                                                src={"/avatar.jpg"}
                                                alt="Avatar"
                                                className="object-cover h-full w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-xl">{user.name} (<span className="text-blue-500">{blogs.filter((blog) => blog.username === user.email).length}</span>)</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-row justify-between">
                                        Total number of Images{" "}
                                        <span className="text-blue-500">{blogs.length}</span>
                                    </div>
                                </div >
                                <div className="flex px-4 w-max rounded-full shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 cursor-pointer">
                                    <div
                                        className="flex flex-row gap-5 items-center "
                                        onClick={() => setNewPostModal(true)}
                                    >
                                        <div className="text-xl font-medium">Save new Image</div>
                                        <div className="p-2 rounded-full text-lg">✒️</div>
                                    </div>
                                </div>
                                <div className="flex flex-col px-4 gap-2 justify-center items-center w-max rounded-xl py-2 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 cursor-pointer">
                                    <div className="flex flex-row gap-5 items-center ">
                                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Type here to search..." className="w-full px-2 py-1 rounded-full focus-within:outline-none text-lg" />
                                        <div className="p-2 rounded-full text-lg">🔍</div>
                                    </div>
                                    <div className="text-base font-medium px-2 text-gray-300">Eg: Robot, Rose</div>
                                    <div className="w-full flex flex-row justify-center gap-5">
                                        <button className="px-2 py-0.5 rounded-full border-2 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 border-blue-500" onClick={submitSearch}>Search</button>
                                        <button className="px-2 py-0.5 rounded-full border-2 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 border-red-500" onClick={clearSearch}>Clear</button>
                                    </div>
                                </div>
                                {
                                    message.status && (
                                        <div className="text-lg font-medium text-blue-500 px-4">
                                            {message.message}
                                        </div>
                                    )
                                }
                            </div >
                            <div className="flex-1 flex gap-10 items-center justify-center flex-wrap">
                                {blogs.length > 0 ? (
                                    blogs.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex flex-col flex-wrap gap-5 justify-center items-center rounded-xl shadow-xl shadow-blue-500/40 p-2"
                                        >
                                            <div className="h-[10rem] w-[15rem] rounded-xl shadow-2xl shadow-primary-blue/30 overflow-hidden">
                                                <img
                                                    src={item.img}
                                                    alt="Img"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-center gap-5 my-2">
                                                <div className="text-xl flex flex-col items-center capitalize font-medium text-blue-500">
                                                    {item.name}
                                                    <span className="text-base text-primary-green lowercase">{item.username}</span>
                                                </div>
                                                {
                                                    item.username === user.email && (
                                                        <div className="flex flex-row w-full justify-end gap-5 text-sm">
                                                            <button
                                                                className="px-4 py-1 rounded-full border-2 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 border-blue-500"
                                                                onClick={() => handleEdit(item._id)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="px-4 py-1 rounded-full border-2 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 border-red-500"
                                                                onClick={() => handleConfirmation(item._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-blue-500 font-medium text-4xl flex h-screen justify-center items-center">
                                        No results for that search... ✒️
                                    </div>
                                )}
                                {newPostModal && (
                                    <NewPostModal
                                        onSubmit={handleCreateNewPost}
                                        onClose={() => setNewPostModal(false)}
                                    />
                                )}
                                {editModal && (
                                    <EditModal
                                        blogId={editId}
                                        onSubmit={handleUpdate}
                                        onClose={() => setEditModal(false)}
                                    />
                                )}
                                {deleteModal && (
                                    <DeleteModal
                                        onSubmit={handleDelete}
                                        onClose={() => setDeleteModal(false)}
                                    />
                                )}
                            </div>
                        </div >
                    )
            }
        </div >
    );
};

export default Dashboard;
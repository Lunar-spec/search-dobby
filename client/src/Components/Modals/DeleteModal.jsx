/* eslint-disable react/prop-types */
const DeleteModal = ({ onSubmit, onClose }) => {
    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <div className="fixed bg-black/40 inset-0 flex items-center justify-center flex-col">
            <div className="bg-white p-4 rounded-lg w-1/2 shadow-2xl shadow-blue-500/20">
                <div className="text-xl font-medium">
                    Are you sure you want to delete this blog?
                </div>
                <div className="flex flex-row justify-end gap-5">
                    <button onClick={handleSubmit} className="px-4 py-1 rounded-full transition-all duration-300 bg-red-500 hover:shadow-lg hover:shadow-red-500/40 text-white text-lg">Confirm Delete</button>
                    <button onClick={onClose} className="px-4 py-1 rounded-full transition-all duration-300 border-2 hover:shadow-lg hover:shadow-blue-500/40 border-blue-500 text-blue-500 text-lg">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

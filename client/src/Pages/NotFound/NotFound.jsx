import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-9xl font-bold text-blue-500">
                404
            </div>
            <div className="p-4 text-3xl">
                The page you are looking for doesn&apos;t exist
            </div>
            <div className="flex flex-row gap-5 text-2xl">
                Go to -
                <Link to={'/'} className="hover:underline">
                    Dashboard
                </Link>
            </div>
        </div>
    )
}

export default NotFound
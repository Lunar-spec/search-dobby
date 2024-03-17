import mongoose from "mongoose";

const connectDb = (url) => {
    mongoose.connect(url)
        .then(() => console.log('⚡Bolt touched the server⚡'))
        .catch((error) => console.log(error))
}

export default connectDb;
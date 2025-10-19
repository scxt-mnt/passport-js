import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
        }
    }
);


const user = mongoose.model("users", userSchema);

export default user;
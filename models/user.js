import mongoose from "mongoose";

const userSchema = mongoose.schema(
    {
        name:{
            Type: String,
            requred: true
        },
        age: {
            Type: Number,
            requred: true
        }
    }
);


const user = mongoose.model("users", userSchema);

export default user;
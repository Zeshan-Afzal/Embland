import mongoose from "mongoose";
const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connect;

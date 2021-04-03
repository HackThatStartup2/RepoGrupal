import mongoose, { ConnectionOptions } from "mongoose";

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(process.env.DB_URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection stablished");
});

connection.on("error", err => {
    console.log(err);
    process.exit(0);
});
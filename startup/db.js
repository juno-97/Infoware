const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("DISCONNECTED from mongoose ");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

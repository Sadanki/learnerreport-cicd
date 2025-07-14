const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config({ path: "config.env" }); // ✅ Load env vars early

const connect = require("./database/mongoDb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes");
const careerServiceRoutes = require("./routes/careerService.routes");
const facultyRoute = require("./routes/facultyRoute");
const questionUploadRoute = require("./routes/questionUpload.routes");
const batchRegisterRoute = require("./routes/batchRegister.route");
const getBatchRoute = require("./routes/common.route");
const attendanceRoute = require("./routes/attendance.routes");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/careerService", careerServiceRoutes);
app.use("/faculty", facultyRoute);
app.use("/", getBatchRoute);
app.use("/", questionUploadRoute);
app.use("/batch", batchRegisterRoute);
app.use("/attendance", attendanceRoute);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running. Hello from server!");
});

// Connect to MongoDB and start server
connect().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
});

import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

//ES modules setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//homepage
app.get("/", (req, res) => {
  res.send("Welcome to Student Information Server");
});

//about
app.get("/about", (req, res) => {
  res.send(`
    Name: Arya Chavan <br>
    Roll No: 10709 <br>
    Course: Computer Engineering
  `);
});

//contact
app.get("/contact", (req, res) => {
  res.send("Email: ryachavan@gmail.com");
});

//register
app.post("/register", (req, res) => {
  res.status(201).send("Student Registered Successfully");
});

//update
app.put("/update", (req, res) => {
  res.status(200).send("Student Information Updated");
});

//form submission
let studentData = {};
app.post("/submit", (req, res) => {
    studentData = req.body;
    res.render("profile", {
      name: studentData.studentName,
      branch: studentData.branch,
      year: studentData.year
    });
  });

  //profile
  app.get("/profile", (req, res) => {
    res.render("profile", {
      name: studentData.studentName,
      branch: studentData.branch,
      year: studentData.year
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
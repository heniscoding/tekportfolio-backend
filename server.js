const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const Project = require('./models/Project'); // Import the Project model

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);

// Seed data function
const seedData = async () => {
  const demoProjects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with React and Tailwind.",
      techStack: ["React", "Tailwind", "Node.js"],
      link: "https://github.com/portfolio-website",
      image: "https://via.placeholder.com/300",
    },
    // Add 5 more demo projects here
    {
      title: "E-Commerce App",
      description: "An e-commerce platform with user authentication.",
      techStack: ["React", "Express", "MongoDB"],
      link: "https://github.com/ecommerce-app",
      image: "https://via.placeholder.com/300",
    },
  ];

  try {
    await Project.deleteMany(); // Clear the database
    await Project.insertMany(demoProjects);
    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

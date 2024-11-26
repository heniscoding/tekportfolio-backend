const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const Project = require("./models/Project"); // Import the Project model

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/projects", projectRoutes);

// Seed data function
const seedData = async () => {
  const demoProjects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with React and Tailwind.",
      techStack: ["React", "Tailwind", "Node.js"],
      link: "https://github.com/portfolio-website",
      image: "https://via.placeholder.com/300?text=Portfolio+Website",
    },
    {
      title: "E-Commerce App",
      description: "An e-commerce platform with user authentication.",
      techStack: ["React", "Express", "MongoDB"],
      link: "https://github.com/ecommerce-app",
      image: "https://via.placeholder.com/300?text=E-Commerce+App",
    },
    {
      title: "Blog Platform",
      description: "A blog platform with markdown support.",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      link: "https://github.com/blog-platform",
      image: "https://via.placeholder.com/300?text=Blog+Platform",
    },
    {
      title: "Task Management Tool",
      description: "A task management tool with drag-and-drop functionality.",
      techStack: ["React", "Redux", "Firebase"],
      link: "https://github.com/task-manager",
      image: "https://via.placeholder.com/300?text=Task+Manager",
    },
    {
      title: "Weather Dashboard",
      description: "A weather dashboard using OpenWeather API.",
      techStack: ["React", "API Integration", "CSS"],
      link: "https://github.com/weather-dashboard",
      image: "https://via.placeholder.com/300?text=Weather+Dashboard",
    },
    {
      title: "Chat Application",
      description: "A real-time chat application using Socket.io.",
      techStack: ["Node.js", "Express", "Socket.io"],
      link: "https://github.com/chat-application",
      image: "https://via.placeholder.com/300?text=Chat+Application",
    },
  ];

  try {
    await Project.deleteMany(); // Clear the database
    await Project.insertMany(demoProjects); // Seed with new projects
    console.log("Database seeded with demo projects!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

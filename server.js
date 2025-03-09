const express = require("express");
const path = require("path");
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
app.use(express.static(path.join(__dirname, "public")));

// Seed data function
const seedData = async () => {
  const demoProjects = [
    {
      title: "Community Events Platform",
      description:
        "Working as a freelance consultant to deliver a bespoke Software Engineering product for internal development, as part of the Launchpad project.",
      techStack: ["React", "Tailwind", "Node.js"],
      link: "https://community-events.henryalderslade.com/",
      image: "/images/projects/communityevents.jpg",
    },
    {
      title: "Chora Coaching Platform",
      description:
        "A freelance project for a group of coaches, built on the WordPress platform",
      techStack: ["WordPress"],
      link: "https://choracoaching.com/",
      image: "/images/projects/choracoaching.jpg",
    },
    {
      title: "Deal Chasers - A community driven deals app",
      description:
        "Deal chasers is community-powered deals, discounts and offers app that runs on both Android and iOS. ",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      link: "https://northcoders.com/project-phase/deal-chasers",
      image: "/images/projects/codecrafters.jpg",
    },
    {
      title: "Northcoders News Front End: A Social News Platform",
      description:
        "Northcoders News is a dynamic web application built with React, serving as a platform for news aggregation, content rating, and discussion.",
      techStack: ["React", "Redux", "Firebase"],
      link: "https://fe-nc-news.henryalderslade.com/",
      image: "/images/projects/ncnewsfront.jpg",
    },
    {
      title: "Northcoders News Back End: A Social News Platform",
      description:
        "built an API for the purpose of accessing application data programmatically.",
      techStack: ["React", "API Integration", "CSS"],
      link: "https://be-nc-news.henryalderslade.com/api/articles",
      image: "/images/projects/ncnewsback.jpg",
    },
    {
      title: "Monica Hanaway WordPress Build and hosting",
      description:
        "Redesigned, built and hosted Monica's existing WordPress website as part of a freelance project",
      techStack: ["WordPress"],
      link: "https://monicahanaway.com/",
      image: "/images/projects/monicahanaway.jpg",
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

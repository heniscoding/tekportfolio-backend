const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Base URL for images
const BASE_IMAGE_URL = 'https://tekportfolio-backend.onrender.com';

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();

    // Safely convert each project and prepend full image URL
    const fullUrlProjects = projects.map((project) => {
      const projectObj = project.toObject();
      if (projectObj.image && projectObj.image.startsWith('/')) {
        projectObj.image = `${BASE_IMAGE_URL}${projectObj.image}`;
      }
      return projectObj;
    });

    res.json(fullUrlProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

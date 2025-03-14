const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();

    // Prepend the base URL to the image paths
    projects.forEach((project) => {
      project.image = `${req.protocol}://${req.get('host')}${project.image}`;
    });

    res.json(projects);
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

const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Base URL for images
const BASE_IMAGE_URL = 'https://tekportfolio-backend.onrender.com';

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();

    const fullUrlProjects = projects.map((project) => {
      const p = project.toObject();
      if (p.image && p.image.startsWith('/')) {
        p.image = `${BASE_IMAGE_URL}${p.image}`;
      }
      return p;
    });

    res.json(fullUrlProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NEW: GET a single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      // No project found → return a 404
      return res.status(404).json({ message: 'Project not found' });
    }

    const p = project.toObject();
    if (p.image && p.image.startsWith('/')) {
      p.image = `${BASE_IMAGE_URL}${p.image}`;
    }

    res.json(p);
  } catch (err) {
    // If there's a server error, send a 500
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

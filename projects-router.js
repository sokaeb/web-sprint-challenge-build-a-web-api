const express = require('express');
const Projects = require('./data/helpers/projectModel');
const router = express.Router();

// endpoints for /projects
router.get('/', (req, res) => {
    Projects.get()
    .then(projs => {
        if(projs){
            res.status(200).json({ 
                data: projs 
            });
        }else {
            res.status(404).json({
                message: "Projects not found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error retrieving the projects."
        });
    });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project){
            res.status(200).json({ 
                data: project 
            });
        } else {
            res.status(404).json({
                message: "Project with that ID does not exist."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error retrieving project."
        });
    });
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(proj => {
        if(proj.name && proj.description){
            res.status(201).json({
                data: proj
            })
        }else {
            res.status(400).json({
                errorMessage: "Please provide project name and description."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error posting project."
        });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
    .then(proj => {
        if(proj){
            res.status(200).json({
                data: proj
            })
        } else{
            res.status(404).json({
                message: "A project with that ID could not be found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error updating the project."
        });
    });
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: "The project has been removed."
            })
        }else {
            res.status(404).json({
                message: "A project with that ID cannot be found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error removing the project."
        });
    });
});

module.exports = router;
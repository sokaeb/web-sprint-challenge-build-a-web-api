const express = require('express');
const Actions = require('./data/helpers/actionModel');
const router = express.Router();

// endpoints for /actions

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        if(actions) {
            res.status(200).json({
                data: actions
            });
        } else {
            res.status(404).json({
                message: "Actions not found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error retrieving the actions."
        });
    });
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if(action){
            res.status(200).json({
                data: action
            });
        } else {
            res.status(404).json({
                message: "Action with that ID does not exist."
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error retrieving the action."
        });
    });
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        if(action){
            res.status(200).json({
                data: action
            })
        } else {
            res.status(400).json({
                errorMessage: "Please provide action description and notes."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error posting action."
        });
    });
});

router.put('/:id', (req, res) => {
    const updates = req.body;
    Actions.update(req.params.id, updates)
    .then(act => {
        if(act){
            res.status(200).json({
                data: act
            })
        } else {
            res.status(404).json({
                message: "An action with that ID could not be found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error updating the action."
        });
    });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: "The action has been removed."
            })
        } else {
            res. status.apply(404).json({
                message: "An action with that ID cannot be found."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Error removing the action."
        });
    });
});

module.exports = router;
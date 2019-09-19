const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// grabs info for the NPI form that is being edited
router.get('/current', (req,res)=>{
    const idToGet = req.query.id;
    const sqlText = `SELECT * FROM npi WHERE id=$1;`;
    pool.query(sqlText, [idToGet])
        .then(response => {
            res.send(response.rows[0])
        })
        .catch(error => {
            console.log('error getting current npi', error);
            res.sendStatus(500);
        })
})

// upon initial creation of an NPI form, post the form to the database to get a unique ID number
router.post('/create', (req, res) => {
    const userId = req.user.id
    if (req.body.type === 'npi') {
        const sqlText = `INSERT INTO npi(creator_id, contact_id, type)
                            VALUES($1, $2, $3)
                            RETURNING id;`;
        pool.query(sqlText, [userId, userId, 'NPI'])
            .then(response => {
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error creating new npi', error);
                res.sendStatus(500);
            })
    }
})

// Route to update the NPI document from the NPI form when "submit" is clicked
router.put('/edit', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE npi SET type=$1, date=$2, audience=$3, description=$4, notes=$5, product=$6, status='PENDING' WHERE id=$7;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.description, objectToEdit.notes, objectToEdit.product, objectToEdit.number ]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing npi', error);
            res.sendStatus(500);
        })
})

// Route to update the NPI document from the NPI form when "save" is clicked
router.put('/save', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE npi SET type=$1, date=$2, audience=$3, description=$4, notes=$5, product=$6 WHERE id=$7;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.description, objectToEdit.notes, objectToEdit.product, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing npi', error);
            res.sendStatus(500);
        })
})

module.exports = router;
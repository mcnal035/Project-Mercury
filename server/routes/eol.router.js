const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// grabs info for the EOL form that is being edited
router.get('/current', (req, res) => {
    const idToGet = req.query.id;
    const sqlText = `SELECT * FROM eol WHERE id=$1;`;
    pool.query(sqlText, [idToGet])
        .then(response => {
            console.log(response.rows[0])
            res.send(response.rows[0])
        })
        .catch(error => {
            console.log('error getting current eol', error);
            res.sendStatus(500);
        })
})

// upon initial creation of an EOL form, post the form to the database to get a unique ID number
router.post('/create', (req, res) => {
    console.log(req.body.type);
    const userId = req.user.id
    if (req.body.type === 'eol') {
        const sqlText = `INSERT INTO eol(creator_id, contact_id, type)
                            VALUES($1, $2, $3)
                            RETURNING id;`;
        pool.query(sqlText, [userId, userId, 'EOL'])
            .then(response => {
                console.log(response.rows);
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error creating new eol', error);
                res.sendStatus(500);
            })
    }
})

// Route to update the EoL document from the EoL form when "submit" is clicked
router.put('/edit', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE eol SET type=$1, date=$2, audience=$3, change_description=$4, notes=$5, last_time_buy=$6, last_time_ship=$7, product=$8, status='PENDING' WHERE id=$9;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.change_description, objectToEdit.notes, objectToEdit.buyDate, objectToEdit.shipDate, objectToEdit.product, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing eol', error);
            res.sendStatus(500);
        })
})

// Route to update the EoL document from the EoL form when "save" is clicked.
router.put('/save', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE eol SET type=$1, date=$2, audience=$3, change_description=$4, notes=$5, last_time_buy=$6, last_time_ship=$7, product=$8  WHERE id=$9;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.change_description, objectToEdit.notes, objectToEdit.buyDate, objectToEdit.shipDate, objectToEdit.product, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing eol', error);
            res.sendStatus(500);
        })
})

module.exports = router;
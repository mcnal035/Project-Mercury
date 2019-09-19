const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// route used to get parts that are assigned to the PCN, EOL, or NPI form that is currently being edited.
router.get('/current', rejectUnauthenticated, (req, res) => {
    const idToGet = req.query.id;
    if(req.query.type === 'pcn'){
        const sqlText = `SELECT pcn_part.id, part.name, part.number, part.description FROM part
                            JOIN pcn_part ON part.id = pcn_part.part_id
                            WHERE pcn_part.pcn_id=$1;`;
        const values = [idToGet];
        pool.query(sqlText, values)
            .then(response => {
                res.send(response.rows);
            })
            .catch(error => {
                res.sendStatus(500);
            })
    } else if (req.query.type === 'eol'){
        const sqlText = `SELECT eol_part.id, part.name, part.number, part.description, part2.name as replacement_name, part2.number as replacement_number, part2.description as replacement_description from eol_part
	                        LEFT JOIN part ON eol_part.part_id = part.id
                            LEFT JOIN part as part2 ON eol_part.replacement_id = part2.id
                            WHERE eol_part.eol_id=$1
                            ORDER BY eol_part.id;`;
        const values = [idToGet];
        pool.query(sqlText, values)
            .then(response => {
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error getting current eol parts', error);
                res.sendStatus(500);
            })
    } else if (req.query.type === 'npi'){
        const sqlText = `SELECT npi_part.id, part.name, part.number, part.description FROM part
                            JOIN npi_part ON part.id = npi_part.part_id
                            WHERE npi_part.npi_id=$1;`;
        const values = [idToGet];
        pool.query(sqlText, values)
            .then(response => {
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error getting current eol parts', error);
                res.sendStatus(500);
            })
    }
});

// Route to search all parts in the DB, used in the add parts field on the PCN, EOL, and NPI forms.
router.get('/search', rejectUnauthenticated, (req, res) => {
    const search = `%${req.query.search}%`;
    const sqlText = `SELECT * FROM part WHERE number LIKE $1;`;
    pool.query(sqlText, [search])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error searching parts', error);
            res.sendStatus(500);
        })
})

// Route to create a new part when posting a part in the PCN, EOL, or NPI creation form
router.post('/create', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO part(name, number, description)
                        VALUES($1, $2, $3)
                        RETURNING id;`;
    const values = [req.body.name, req.body.number, req.body.description];
    pool.query(sqlText, values)
        .then(response => {
            if(req.body.type === 'pcn'){
            const partId = response.rows[0].id;
            const pcnNumber = req.body.pcnNumber;
            pool.query(`INSERT INTO pcn_part(pcn_id, part_id)
                            VALUES($1, $2);`, [pcnNumber, partId])
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error inserting into pcn_part', error);
                })
            } else if(req.body.type === 'eol'){
                const partId = response.rows[0].id;
                const eolNumber = req.body.eolNumber;
                pool.query(`INSERT INTO eol_part(eol_id, part_id)
                            VALUES($1, $2);`, [eolNumber, partId])
                    .then(response => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        console.log('error inserting into pcn_part', error);
                    })
            } else if(req.body.type === 'npi'){
                const partId = response.rows[0].id;
                const npiNumber = req.body.npiNumber;
                pool.query(`INSERT INTO npi_part(npi_id, part_id)
                            VALUES($1, $2);`, [npiNumber, partId])
                    .then(response => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        console.log('error inserting into npi_pcn_part', error);
                    })
            }
        })
        .catch(error => {
            console.log('error inserting into parts', error);
            res.sendStatus(500);
        })
});

// Route to post a part to the PCN, EoL, or NPI form that is being edited.
router.post('/add', rejectUnauthenticated, (req, res) => {
    if(req.body.type === 'pcn'){
        const partToAdd = req.body;
        const sqlText = `INSERT INTO pcn_part(pcn_id, part_id)
                            VALUES($1, $2);`;
        const values = [partToAdd.id, partToAdd.partId];
        pool.query(sqlText, values)
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error adding part', error);
                res.sendStatus(500);
            })
    } else if(req.body.type === 'eol'){
        const partToAdd = req.body;
        const sqlText = `INSERT INTO eol_part(eol_id, part_id)
                            VALUES($1, $2);`;
        const values = [partToAdd.id, partToAdd.partId];
        pool.query(sqlText, values)
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error adding part', error);
                res.sendStatus(500);
            })
    } else if(req.body.type === 'npi'){
        const partToAdd = req.body;
        const sqlText = `INSERT INTO npi_part(npi_id, part_id)
                            VALUES($1, $2);`;
        const values = [partToAdd.id, partToAdd.partId];
        pool.query(sqlText, values)
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error adding part', error);
                res.sendStatus(500);
            })
    }
})

// Route to remove a part from the PCN, EOL, or NPI form that is being edited.
router.delete('/pcn_part', rejectUnauthenticated, (req, res) => {
    if(req.query.type === 'pcn'){
        const sqlText = `DELETE FROM pcn_part WHERE id=$1;`;
        pool.query(sqlText, [req.query.id])
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error deleting pcn_part', error);
                res.sendStatus(500);
            })
    } else if(req.query.type === 'eol'){
        const sqlText = `DELETE FROM eol_part WHERE id=$1;`;
        pool.query(sqlText, [req.query.id])
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error deleting eol_part', error);
                res.sendStatus(500);
            })
    } else if(req.query.type === 'npi'){
        const sqlText = `DELETE FROM npi_part WHERE id=$1;`;
        pool.query(sqlText, [req.query.id])
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error deleting npi_part', error);
                res.sendStatus(500);
            })
    }
})

// Route to add a replacement part to a listed part in the EoL form.
router.put('/replacement', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE eol_part SET replacement_id=$1 WHERE id=$2;`;
    const values = [req.body.replacement_id, req.body.part_number];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error adding replacement part', error);
        })
})

module.exports = router;
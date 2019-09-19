const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectUnauthenticatedAdmin } = require('../modules/authentication-middleware');


// expecting in req.query: PCN type, PCN id, PCN status, PCN date, and PCN description
// this route will grab the info associated with the pcn ID sent
router.get('/', (req, res) => {
    const queryText = `(SELECT pcn."type" as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description
            FROM pcn
            WHERE pcn.status = 'PUBLISHED')
            UNION
            (SELECT eol."type" as "type", eol.id as id, 
            eol.status as status, eol.date as date, eol.change_description as description
            FROM eol
            WHERE eol.status = 'PUBLISHED')
            UNION
            (SELECT npi."type" as "type", npi.id as id, 
            npi.status as status, npi.date as date, npi.description as description
            FROM npi
            WHERE npi.status = 'PUBLISHED')
            ORDER BY id ASC LIMIT 50;`
    pool.query(queryText)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((error) => {
            console.log(`error in get route for main search window${error}`)
            res.sendStatus(500);
        })
});

// search route for main search page. Will return all published forms.
router.get(`/search`, (req, res) => {
    value = req.query.search.toUpperCase();
    sqlValues = [`%${value}%`]
    const queryText = `(SELECT pcn."type" as "type", pcn.id as id, 
            pcn.status as status, pcn.date as date, pcn.change_description as description
            FROM pcn
            WHERE "id" LIKE $1 AND pcn.status = 'PUBLISHED')
            UNION
            (SELECT eol."type" as "type", eol.id as id, 
            eol.status as status, eol.date as date, eol.change_description as description
            FROM eol
            WHERE "id" LIKE $1 AND eol.status = 'PUBLISHED')
            UNION
            (SELECT npi."type" as "type", npi.id as id, 
            npi.status as status, npi.date as date, npi.description as description
            FROM npi
            WHERE "id" LIKE $1 AND npi.status = 'PUBLISHED')
            UNION
            (select pcn.type as "type", pcn.id as id, pcn.status as status, pcn.date as date, pcn.change_description as description from part 
            join pcn_part on part.id = pcn_part.part_id
            join pcn on pcn_part.pcn_id = pcn.id
            where number like $1 AND pcn.status = 'PUBLISHED')
            UNION
            (select eol.type as "type", eol.id as id, eol.status as status, eol.date as date, eol.change_description as description from part 
            join eol_part on part.id = eol_part.part_id
            join eol on eol_part.eol_id = eol.id
            where number like $1 AND eol.status = 'PUBLISHED')
            UNION
            (select npi.type as "type", npi.id as id, npi.status as status, npi.date as date, npi.description as description from part 
            join npi_part on part.id = npi_part.part_id
            join npi on npi_part.npi_id = npi.id
            where number like $1 AND npi.status = 'PUBLISHED')
            ORDER BY id ASC LIMIT 30;`;
    pool.query(queryText, sqlValues)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((error) => {
            console.log(`error in get route for main search window ${error}`)
            res.sendStatus(500);
        })
});

// Route to return the PCNs created by the logged in user, type can be specified and sent to filter results.
router.get('/getdashboard', rejectUnauthenticated, (req, res) => {
    if (req.query.status != '') {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as "date"
                            FROM pcn
                            WHERE creator_id = $1 AND status = $2)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as "date"
                            FROM eol
                            WHERE creator_id = $1 AND status = $2)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as "date"
                            FROM npi
                            WHERE creator_id = $1 AND status = $2)
                            ORDER BY id;`
        const sqlValues = [req.query.id, req.query.status]
        pool.query(sqlText, sqlValues)
            .then(response => {
                console.log(response.rows);
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get dashboard error', error);
                res.sendStatus(500)
            })
    }
    else {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as "date"
                            FROM pcn
                            WHERE creator_id = $1)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as "date"
                            FROM eol
                            WHERE creator_id = $1)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as "date"
                            FROM npi
                            WHERE creator_id = $1)
                            ORDER BY id;`
        const sqlValues = [req.query.id]
        pool.query(sqlText, sqlValues)
            .then(response => {
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get dashboard error', error);
                res.sendStatus(500)
            })
    }
});

// Route to return the PCNs created by all users. Admin Dashboard View.
router.get('/getadmindashboard', rejectUnauthenticated, (req, res) => {
    if (req.query.status != '') {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as "date"
                            FROM pcn
                            WHERE status = $1)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as "date"
                            FROM eol
                            WHERE status = $1)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as "date"
                            FROM npi
                            WHERE status = $1)
                            ORDER BY id;`
        pool.query(sqlText, [req.query.status])
            .then(response => {
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get admin dashboard error', error);
                res.sendStatus(500)
            })
    }
    else {
        const sqlText = `(SELECT pcn."type" as "type", pcn.id as id,
                            pcn.status as status, pcn.date as "date"
                            FROM pcn)
                            union
                            (SELECT eol."type" as "type", eol.id as id, 
                            eol.status as status, eol.date as "date"
                            FROM eol)
                            union
                            (SELECT npi."type" as "type", npi.id as id, 
                            npi.status as status, npi.date as "date"
                            FROM npi)
                            ORDER BY id;`
        pool.query(sqlText)
            .then(response => {
                console.log(response.rows);
                res.send(response.rows)
            })
            .catch(error => {
                console.log('get admin dashboard error', error);
                res.sendStatus(500)
            })
    }
});

// expecting in req.query: PCN id
// this route will return the info associated with the pcn ID sent
router.get('/current', (req, res) => {
    const idToGet = req.query.id;
    const sqlText = `SELECT * FROM pcn WHERE id=$1;`;
    pool.query(sqlText, [idToGet])
        .then(response => {
            res.send(response.rows[0])
        })
        .catch(error => {
            console.log('error getting current pcn', error);
            res.sendStatus(500);
        })
})

// expecting in req.query: PCN type and PCN id
// this route will return the PCN info associated with the pcn ID sent
router.get('/info', (req, res) => {
    console.log('getting specific pcn info, req.query is:', req.query)
    if (req.query.type === 'PCN') {
        let sqlText = 'select * from pcn where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving pcn info', error);
                res.sendStatus(500)
            })
    }
    else if (req.query.type === 'EOL') {
        let sqlText = 'select * from eol where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving eol info', error);
                res.sendStatus(500)
            })
    }
    else if (req.query.type === 'NPI') {
        let sqlText = 'select * from npi where id = $1';
        pool.query(sqlText, [req.query.id])
            .then((response) => {
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('error retrieving npi info', error);
                res.sendStatus(500)
            })
    }
    else {
        sendStatus(500);
    }
});

// expecting in req.query: PCN type and PCN id
// this route will return the parts associated with the pcn ID sent
router.get('/pcnparts', (req, res) => {  
    if( req.query.type === 'PCN' ){
        let sqlText = 'select name, number, description from part join pcn_part on part.id = pcn_part.part_id where pcn_part.pcn_id = $1;';
            pool.query(sqlText, [req.query.id])
                .then((response) => {
                    res.send(response.rows)
                })
                .catch((error) => {
                    console.log('error retrieving pcn parts', error);
                    res.sendStatus(500)
                })
        }
    else if( req.query.type === 'EOL' ){
        let sqlText = 'select part.id, part.name, part.number, part.description, replacement_id, part2.number as replacement_number from eol_part left join part on part.id = eol_part.part_id left join part as part2 on part2.id = eol_part.replacement_id where eol_part.eol_id = $1;';
            pool.query(sqlText, [req.query.id])
                .then((response) => {
                    res.send(response.rows)
                })
                .catch((error) => {
                    console.log('error retrieving eol parts', error);
                    res.sendStatus(500)
                })
        }
    else if( req.query.type === 'NPI' ){
        let sqlText = 'select name, number, description from part join npi_part on part.id = npi_part.part_id where npi_part.npi_id = $1;';
            pool.query(sqlText, [req.query.id])
                .then((response) => {
                    res.send(response.rows)
                })
                .catch((error) => {
                    console.log('error retrieving npi parts', error);
                    res.sendStatus(500)
                })
        }
    else{
        res.sendStatus(500);
    }
});

// expecting in req.query: User ID
// this route will return all notifications from EOLs, NPIs, and PCNs
router.get('/messages', (req, res) => {
    const sqlText = `(select eol_review_log.eol_id as id, eol_review_log.message_time, eol_review_log.notification_message, eol_review_log.status from eol_review_log join eol on eol.id = eol_review_log.eol_id where creator_id = $1)
                        union
                        (select npi_review_log.npi_id as id, npi_review_log.message_time, npi_review_log.notification_message, npi_review_log.status from npi_review_log join npi on npi.id = npi_review_log.npi_id where creator_id = $1)
                        union
                        (select pcn_review_log.pcn_id as id, pcn_review_log.message_time, pcn_review_log.notification_message, pcn_review_log.status from pcn_review_log join pcn on pcn.id = pcn_review_log.pcn_id where creator_id = $1)
                        order by message_time DESC;`;
    pool.query(sqlText, [req.query.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('error retrieving messages', error);
            res.sendStatus(500);
        })
})

// expecting in req.query: User ID
// this route will return notifications from EOLs, NPIs, and PCNs that have been denied, and not yet re-submitted.
router.get('/unreadmessages', (req, res) => {
    const sqlText = `(select eol.id as id, eol.message_time, eol.notification_message, eol.status from eol where creator_id = $1 and message_read = 0 and status = 'DENIED')
                        union
                        (select npi.id as id, npi.message_time, npi.notification_message, npi.status from npi where creator_id = $1 and message_read = 0 and status = 'DENIED')
                        union
                        (select pcn.id as id, pcn.message_time, pcn.notification_message, pcn.status from pcn where creator_id = $1 and message_read = 0 and status = 'DENIED')
                        order by message_time DESC;`;
    pool.query(sqlText, [req.query.id])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('error retrieving unread messages', error);
            res.sendStatus(500);
        })
})

//POST Routes

// This route will create the PCN form in the database, generating a unique ID and assigning the creator_ID
router.post('/create', (req, res) => {
    console.log(req.body.type);
    const userId = req.user.id
    if (req.body.type === 'pcn') {
        const sqlText = `INSERT INTO pcn(creator_id, contact_id, type)
                            VALUES($1, $2, $3)
                            RETURNING id;`;
        pool.query(sqlText, [userId, userId, 'PCN'])
            .then(response => {
                res.send(response.rows);
            })
            .catch(error => {
                console.log('error creating new pcn');
                res.sendStatus(500);
            })
    }
})

// PUT Routes

// Route will update the PCN form that is currently being modified when it is submitted
router.put('/edit', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE pcn SET type=$1, date=$2, audience=$3, change_description=$4, notes=$5, product=$6, status='PENDING' WHERE id=$7;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.change_description, objectToEdit.notes, objectToEdit.product, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing pcn', error);
            res.sendStatus(500);
        })
})

// Route will update the PCN form that is currently being modified when it is saved
router.put('/save', (req, res) => {
    const objectToEdit = req.body;
    const sqlText = `UPDATE pcn SET type=$1, date=$2, audience=$3, change_description=$4, notes=$5 WHERE id=$6;`;
    const values = [objectToEdit.type, objectToEdit.date, objectToEdit.audience, objectToEdit.change_description, objectToEdit.notes, objectToEdit.number]
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error editing pcn', error);
            res.sendStatus(500);
        })
})

// Route to handle admin reviews of submitted forms. Expecting to receive the PCN ID, denial message values, and denial status.
router.put('/reviewpcn/:id', rejectUnauthenticatedAdmin, (req, res) => {
    if( req.body.type === 'PCN' ){
        if (req.body.status === 'DENIED'){
        const sqlText = `UPDATE pcn SET status=$1, notification_message=$2, message_time=$3, message_read=0 WHERE id=$4;`;
        const values = [req.body.status, req.body.message, req.body.time, req.params.id]
        pool.query(sqlText, values)
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error reviewing pcn', error);
                res.sendStatus(500);
            })
        }
        else if (req.body.status === 'PUBLISHED'){
        const sqlText = `UPDATE pcn SET status=$1, notification_message=$2, message_time=$3, message_read=1 WHERE id=$4;`;
        const values = [req.body.status, req.body.message, req.body.time, req.params.id]
        pool.query(sqlText, values)
            .then(response => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error reviewing pcn', error);
                res.sendStatus(500);
            })
        }
    }
    else if (req.body.type === 'EOL') {
        if (req.body.status === 'DENIED') {
            const sqlText = `UPDATE eol SET status=$1, notification_message=$2, message_time=$3, message_read=0 WHERE id=$4;`;
            const values = [req.body.status, req.body.message, req.body.time, req.params.id]
            pool.query(sqlText, values)
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error reviewing eol', error);
                    res.sendStatus(500);
                })
        }
        else if (req.body.status === 'PUBLISHED') {
            const sqlText = `UPDATE eol SET status=$1, notification_message=$2, message_time=$3, message_read=1 WHERE id=$4;`;
            const values = [req.body.status, req.body.message, req.body.time, req.params.id]
            pool.query(sqlText, values)
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error reviewing eol', error);
                    res.sendStatus(500);
                })
        }
    }
    else if (req.body.type === 'NPI') {
        if (req.body.status === 'DENIED') {
            const sqlText = `UPDATE npi SET status=$1, notification_message=$2, message_time=$3, message_read=0 WHERE id=$4;`;
            const values = [req.body.status, req.body.message, req.body.time, req.params.id]
            pool.query(sqlText, values)
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error reviewing npi', error);
                    res.sendStatus(500);
                })
        }
        else if (req.body.status === 'PUBLISHED') {
            const sqlText = `UPDATE npi SET status=$1, notification_message=$2, message_time=$3, message_read=1 WHERE id=$4;`;
            const values = [req.body.status, req.body.message, req.body.time, req.params.id]
            pool.query(sqlText, values)
                .then(response => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('error reviewing npi', error);
                    res.sendStatus(500);
                })
        }
    }else{
        res.sendStatus(500);
    }
})

// Route to delete a PCN form from the PM dashboard, expecting PCN ID
router.delete('/deletepcn', (req, res) => {
    if (req.query.type === 'PCN') {
        const sqlText = `DELETE FROM pcn_part WHERE pcn_id = $1;`;
        const values = [req.query.id];
        pool.query(sqlText, values)
            .then(response => {
                const sqlText = `DELETE FROM pcn_review_log WHERE pcn_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from pcn log', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM image WHERE pcn_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from pcn image', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM pcn WHERE id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting pcn', error);
                    })
            })
            .catch(error => {
                console.log('error deleting pcn_part', error);
                res.sendStatus(500);
            })
    }
    else if (req.query.type === 'EOL') {
        const sqlText = `DELETE FROM eol_part WHERE eol_id=$1;`;
        const values = [req.query.id];
        pool.query(sqlText, values)
            .then(response => {
                const sqlText = `DELETE FROM eol_review_log WHERE eol_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from eol log', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM image WHERE pcn_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from eol image', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM eol WHERE id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting eol', error);
                    })
            })
            .catch(error => {
                console.log('error deleting eol_parts', error);
                res.sendStatus(500);
            })
    }
    else if (req.query.type === 'NPI') {
        const sqlText = `DELETE FROM npi_part WHERE npi_id=$1;`;
        const values = [req.query.id];
        pool.query(sqlText, values)
            .then(response => {
                const sqlText = `DELETE FROM npi_review_log WHERE npi_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from npi log', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM image WHERE pcn_id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting from npi image', error);
                    })
            })
            .then(response => {
                const sqlText = `DELETE FROM npi WHERE id = $1;`;
                pool.query(sqlText, [req.query.id])
                    .then((response) => {
                        res.sendStatus(200)
                    })
                    .catch((error) => {
                        console.log('error deleting npi', error);
                    })
            })
            .catch(error => {
                res.sendStatus(200)
            })
    }
    else {
        res.sendStatus(500);
    }
})

module.exports = router;
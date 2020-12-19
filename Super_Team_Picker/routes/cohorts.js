const express = require('express');
const knex = require('../db/client');

const router = express.Router();


//New cohorts page to add a cohort
router.get('/new',(request,response)=>{
    response.render('cohorts/new', {cohort: false});
})




//Index page which mean /cohorts
router.get('/',(request,response)=>{
    knex('cohorts')
        .orderBy('created_at','desc')
        .then(lists => {
            response.render(('cohorts/index'),{lists});
        })
});









module.exports = router;
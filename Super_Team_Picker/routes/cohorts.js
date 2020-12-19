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
        .then(cohorts => {
            response.render(('cohorts/index'),{cohorts});
        })
});

//Add detail of cohort when adding a new cohort
router.get('/:id',(request,response)=>{
    knex('cohorts')
        .where('id', request.params.id)
        .first()
        .then((cohort)=>{
            if(!cohort){
                response.send('No list found');
            }else{
                response.render('cohorts/show', {cohort})
            }
        })
})

//create a new cohort
router.post('/',(request,response)=>{
    const logo_url= request.body.logo_url
    const cohort_name= request.body.cohort_name
    const members= request.body.members
    knex('cohorts')
        .insert({
            logo_url,
            cohort_name,
            members,
        },'*')
        .then(cohorts=>{
            const cohort = cohorts[0];
            response.redirect(`/cohorts/${cohort.id}`)
        });
});

//delete function
router.delete('/:id',(request,response)=>{
    knex('cohorts')
        .where('id', request.params.id)
        .del()
        .then(()=>{
            response.redirect('/cohorts')
        })
})

// edit cohort
router.get('/:id/edit', (request, response) => {
    knex('cohorts')
      .where('id', request.params.id)
      .first()
      .then(cohort => {
        response.render('cohorts/edit', { cohort });
      });
  });

//update function
router.patch('/:id',(request,response)=>{
    const logo_url= request.body.logo_url
    const cohort_name= request.body.cohort_name
    const members= request.body.members
    knex('cohorts')
        .where('id',request.params.id)
        .update({
            logo_url,
            cohort_name,
            members,
        })
        .then(()=>{
            response.redirect(`/cohorts/${request.params.id}`)
        })
})



module.exports = router;
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
    const teamCount = request.query.teamCount
    const numberPerTeam = request.query.numberPerTeam
    const quantity = request.query.quantity
    knex('cohorts')
        .where('id', request.params.id)
        .first()
        .then((cohort)=>{
            if(!cohort){
                response.send('No list found');
            }else{

            const memberCohort = cohort.members
            const memberCohortArray = memberCohort.split(',')
            const numberCohort = memberCohort.split(',').length
            const randomMemberArray = memberCohortArray;
            for(let i =0; i<100; i++){
            let loc1 =Math.floor(Math.random()*randomMemberArray.length);
            let loc2 =Math.floor(Math.random()*randomMemberArray.length);
            let tmploc = randomMemberArray[loc1];
            randomMemberArray[loc1] = randomMemberArray[loc2];
            randomMemberArray[loc2] = tmploc;
            }
            ///Team Count
            const memberPerTeam = Math.floor(numberCohort/quantity)
            const extraMember = randomMemberArray.slice(-numberCohort%memberPerTeam)
            const allTeamArray = [];
            let singleTeamArray = [];
            for(let i =1;i<numberCohort+1;i++){
                if(i%memberPerTeam === 0){
                    singleTeamArray.push(randomMemberArray[i-1])
                    allTeamArray.push(singleTeamArray)
                    singleTeamArray = [];
                }else{
                    singleTeamArray.push(randomMemberArray[i-1])
                }
                }
                // }

                // console.log(allTeamArray)
            


                
                response.render('cohorts/show', {cohort,teamCount,numberPerTeam,quantity,allTeamArray})
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
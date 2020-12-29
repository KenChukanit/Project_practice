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
    const method = request.query.method
    const quantity = request.query.quantity
    knex('cohorts')
        .where('id', request.params.id)
        .first()
        .then((cohort)=>{
            if(!cohort){
                response.send('No list found');
            }else{

            const memberCohort = cohort.members //list of cohort member
            const memberCohortArray = memberCohort.split(',')//make it to array by taking out ','
            const numberCohort = memberCohort.split(',').length//number of members
            let randomMemberArray = memberCohortArray;
            //Randomly shuffling positions of cohort members 100 times
            for(let i =0; i<100; i++){
            let loc1 =Math.floor(Math.random()*randomMemberArray.length);
            let loc2 =Math.floor(Math.random()*randomMemberArray.length);
            let tmploc = randomMemberArray[loc1];
            randomMemberArray[loc1] = randomMemberArray[loc2];
            randomMemberArray[loc2] = tmploc;
            }
            /// Set Default Method as Team Count
            let memberPerTeam = Math.floor(numberCohort/quantity) // Amount of members per team in method of Team Count
            let numberOfTeam = quantity;
            let extraMember= randomMemberArray// Extra member in method Team Count
                                    .slice(numberCohort-numberCohort%memberPerTeam,numberCohort)
            let selectedMember = randomMemberArray//cut out extra member before assigning team
                                    .slice(0,numberCohort-(numberCohort%memberPerTeam))
            ///Number Per Team
            
            if(method ==='numberPerTeam'){ // Change value of some variables if method is Number Per Team
                memberPerTeam = quantity;
                numberOfTeam = Math.floor(numberCohort/quantity)
                selectedMember = randomMemberArray
                                    .slice(0,numberCohort-(numberCohort%quantity))
                extraMember = randomMemberArray
                                    .slice(numberCohort-numberCohort%quantity,numberCohort)
            }
            
            let allTeamArray = [];
            let singleTeamArray = [];
            for(let i =1;i<selectedMember.length+1;i++){
                if(i%memberPerTeam === 0){
                    singleTeamArray.push(selectedMember[i-1])
                    allTeamArray.push(singleTeamArray)
                    singleTeamArray = [];
                }else{
                    singleTeamArray.push(selectedMember[i-1])
                }
            }
            //recheck in case Team count and assigning too much team 
            //the member of each team will be one and that is not a team
            // console.log(allTeamArray.length)
            if(allTeamArray.length > quantity && method === 'teamCount'){
                extraMember = allTeamArray.slice(quantity,allTeamArray.length)
                allTeamArray = allTeamArray.slice(0,quantity)
            }

                response.render('cohorts/show', {cohort,method,quantity,allTeamArray,extraMember})
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
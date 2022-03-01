#!/usr/bin/env node
'use strict';

console.log( "Hello Running Simple Scenario Runner CLI!" );
const ttlStart = new Date().getTime();

//read json test config file
const flow = require('../scenarios/test_scen.json')

//set start time
console.log("Flow start time: ");
getTime();

console.log("Running Flow ID:" + flow.flow)

//get flow start step
let start = flow.startAt;
startFlow(flow.states, start)

//date and time function for showing start and stop times
function getTime(){
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = ("0" + (date_ob.getMinutes() + 1)).slice(-2);
  // current seconds
  let seconds = ("0" + (date_ob.getSeconds() + 1)).slice(-2);


  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}

//execution time function to show how long task takes to run
function exctTime(states,nextStep,start){
  let stop = new Date().getTime();
  console.log("Step done!")
  console.log(`Execution Time : ${(stop - start)/1000} seconds`)
  startFlow(states,nextStep);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)*1000;
}

//post periodic update every 5 secs if step exists else go to end
function chkStepLogic(states, chkStep, step, startExc, stepTime){
  if(step.hasOwnProperty(chkStep)){
    let nextStep = step[chkStep]
    let interval = setInterval(function(){ 
      console.log('Still running : '+ step.resolver); 
    }, 5000);
    setTimeout(function() { 
      clearInterval(interval); 
      exctTime(states,nextStep,startExc); 
    }, stepTime);
  }else{
    setTimeout(()=>{
      exctTime(states,"end",startExc);   
    },5000);
  }
}

//function for going thru tasks and show flow id, flow name, state(the step name or "finished"), start time, execution time 
function startFlow(states,startStep){
  //check json object for required keys to run properly and handle missing keys
  if(states.hasOwnProperty(startStep)){
    let step = states[startStep];
    let startExc = new Date().getTime();

    if(step.hasOwnProperty("resolver")){
      console.log("Running Step: " + step.resolver);
      console.log("Step start time : ");
      getTime();
      let stepTime = getRandomInt(10);
      if(stepTime <9000){
        chkStepLogic(states, "next", step,startExc, stepTime)
      }else{
        console.log("Execution time exceeded running exception step!")
        chkStepLogic(states, "exception", step,startExc, stepTime)
      }

    }else if(step.hasOwnProperty("end")){
      if(step.end){
        console.log("Successfully ran flow test!!")

      }
      console.log("Flow Ended at : ");
      getTime();
      let ttlStop = new Date().getTime();
      console.log(`Total Execution Time : ${(ttlStop - ttlStart)/1000} seconds`)
    }else{
      return;
    }
    
  }else{
    console.log("Step : " + startStep +" not found!")
  }
  
  
}

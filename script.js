const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById("countdownForm");
const dateEl=document.getElementById("date-picker");

const countdownEl=document.getElementById('countdown');
const countdownElTitle=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');
const completeEl=document.getElementById('complete');
const completeElInfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdownDate=''; 
let countdownValue= new Date();
let countdownActive;
let savedCountdown;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;


// Set date input  Min with Today's date
const today=new  Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);





//populate our countdown
function updateDOM(){
if(countdownDate){
  countdownActive=setInterval(()=>{
    const now=new Date().getTime();
  const distance=countdownValue-now;
  const days=Math.floor(distance/day);
  const hours=Math.floor((distance%day)/hour);
  const minutes=Math.floor((distance%hour)/minute);
  const seconds=Math.floor((distance%minute)/second);
  // hide input container
  inputContainer.hidden=true;
  //if the coutdown has ended ,show complete
  if(distance<0){
    countdownEl.hidden=true;
    
    completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
    clearInterval(countdownActive);
    completeEl.hidden=false;
       
  }else{
    // show countdown in progress
  countdownElTitle.textContent=`${countdownTitle}`;
  timeElements[0].textContent=`${days}`;
  timeElements[1].textContent=`${hours}`;
  timeElements[2].textContent=`${minutes}`;
  timeElements[3].textContent=`${seconds}`;
  completeEl.hidden=true;
  countdownEl.hidden=false;

   }
 },second);
}else{
  alert("please select a date for the countdown!!");
}
}
//take values from form when subbmited
function updateCountdown(e){
  e.preventDefault();// to prevent the page from reloading after the event submit
    
  countdownTitle=e.srcElement[0].value;
  countdownDate=e.srcElement[1].value;
  savedCountdown={title:countdownTitle,
                  date:countdownDate
   };
  
   localStorage.setItem('countdown',JSON.stringify(savedCountdown));
  
  // get number version of current date
  countdownValue=new Date(countdownDate).getTime();
  
  updateDOM();
 


}

// Reset all values
function reset(){
  countdownEl.hidden=true;
  inputContainer.hidden=false;
  completeEl.hidden=true;
  // stop countdown
clearInterval(countdownActive);
// Reset values
countdownTitle='';
countdownDate='';
localStorage.removeItem('countdown');


}


function restorePreviousCountdown(){
  //get countdown from local storage if available
  if(localStorage.getItem('countdown')){
    inputContainer.hidden=true;
    savedCountdown=JSON.parse(localStorage.getItem('countdown'));
    countdownTitle=savedCountdown.title;
    countdownDate=savedCountdown.date;
    countdownValue=new Date(countdownDate).getTime();
    updateDOM();

  }
}
//Event Listener
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
// on Load ,check localstorage
restorePreviousCountdown();


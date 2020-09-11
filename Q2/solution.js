notifications = [
	{message: 'Lorem', read: true},
{message: 'Ipsum', read: true},
{message: 'Dolor', read: true},
{message: 'Sit', read: false},
{message: 'Amet', read: true}
];

allRead = true;
notifications2Analyze=[];

function checkStatus(){
  allRead = true;
  notifArr=notifications;
  analyzeStatus();
  console.log(allRead);
}
function analyzeStatus() {
  if(notifArr.length){
    singleNot = notifArr.shift();
    if(!singleNot.read) allRead = false;
    analyzeStatus();
  }
  return true;
}

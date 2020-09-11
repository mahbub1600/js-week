var notifications = [
	{message: 'Lorem', read: true},
	{message: 'Ipsum', read: true},
	{message: 'Dolor', read: true},
	{message: 'Sit', read: false},
	{message: 'Amet', read: true}
];

var allRead = true;
var notifications2Analyze=[];

function checkStatus(){
  allRead = true;
  notifArr=notifications;
  //analyzeStatus();
  console.log('read');
  console.log(allRead);
}
function analyzeStatus() {
  if(notifArr.length){
    var singleNot = notifArr.shift();
    if(!singleNot.read) allRead = false;
    analyzeStatus();
  }
  return true;
}


  function customPrint(n, message){
    //Add your code here
    if(n){
      console.log(message);
      customPrint(n-1, message);    
    }
    return true;
  }
  customPrint(5, "Hello, World!");

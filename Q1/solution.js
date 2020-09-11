
  function customPrint(n, message){
    //Add your code here
    if(n){
      document.write(message+'\r');
      customPrint(n-1, message);    
    }
    return true;
  }
  customPrint(5, "Hello, World!");

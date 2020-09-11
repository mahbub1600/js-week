<script>
  function customPrint(n, message) {
    //  Add your code here
    if(n){
      document.write("Hello, World!");
      customPrint(n-1, "Hello, World!");    
    }
    return true;
  }
  customPrint(5, "Hello, World!");
</script>

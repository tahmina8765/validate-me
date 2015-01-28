var validateMeModule = (function () {
 
        var privateCounter = 0;
 
        function privateFunction() {
            privateCounter++;
        }
 
        function publicFunction() {
            publicIncrement();
        }
 
        function publicIncrement() {
            privateFunction();
        }
 
        function publicGetCount(){
          return privateCounter;
        }

        function publicHello(message){
          console.log(message);
        }
 
        // Reveal public pointers to
        // private functions and properties
 
       return {
            hello: publicHello,
            start: publicFunction,
            increment: publicIncrement,
            count: publicGetCount
        };
 
    })();
 


/**
 * Created by Bryan Guner
 *
 * bryan.guner@gmail.com 
 */

 function generateFioSeries(n){
   const result = [0, 1];
   for(let i = 2; i<n ; i++){
     result.push(result[i-2] + result[i-1])
   }
   return result
 }

 console.log(generateFioSeries(8));

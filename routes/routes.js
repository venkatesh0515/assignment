const cardlistRoutes = require('./cardlist');
var appRouter = function (app,fs) {
//  app.post("/api/card", function(req, res) {

 
//   if(cardData.creditcard.indexOf(req.body.cardnumber)!==-1){
//     cardData.creditcard.push(req.body);
//     console.log(req.body);
//     res.send(
//         `true`,
//       );
//   }
//   else{
//     res.send(
//         `false`,
//       ); 
//   }

  
  
// });

cardlistRoutes(app,fs)





  }
  
  module.exports = appRouter;
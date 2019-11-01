const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/creditcard.json';
     
  

    // refactored helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

   const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/api/cardlist', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

// create
    app.post('/api/card', (req, res) => {
       
        readFile(data => {
            
            const cardId = Object.keys(data["creditcard"]).length;
            if(cardId>=1){
            Object.keys(data["creditcard"]).map((card)=>{
               
              if(data["creditcard"][card].cardnumber===req.body.cardnumber){
               

                res.status(200).send(false);
                
              }
              else{
                 data["creditcard"][cardId] = req.body;
                 writeFile(JSON.stringify(data), () => {
                    res.status(200).send(true);
                });
            
              }
            })
        }
        else{
            data["creditcard"][cardId] = req.body;
                 writeFile(JSON.stringify(data), () => {
                    res.status(200).send(true);
                }); 
        }
        
           
        },
            true);
    });
};

module.exports = userRoutes;
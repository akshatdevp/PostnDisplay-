const express=require('express');

const cors = require('cors');

const monk= require('monk');

const Filter= require('bad-words');//prevent bad words
//const limit=require('express-rate-limit');//prevent excessive requests
//const slowDown=require('express-slow-down');//slowdown when user crosses a certain number of requests in x amount of time
const app=express();

const db=monk('localhost/WDYK');//if doesn't exist, it is created .db 
const senddd=db.get('senddd');// if doesn't exist, is created. collection
app.use(cors());//prevent cors error

app.use(express.json());    //parse reqs as json 
/**/
/*app.use(slowDown({
    windowMs: 60 * 1000, // 15 minutes
  delayAfter: 3, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
}))*/
filter= new Filter();
app.get('/',(req,res)=>{
    res.json({
        message:"You're here! update 🙂 "
    });
});

app.get('/all',(req,res)=>{
    senddd
    .find()
    .then(recs=>{
            res.json(recs);
        }
    );
});

/*app.use(limit({
    windowMs:30*1000,
    max:2   
}));
*/

function callf(x)
{
    return x.name&&x.name.toString().trim()!==''&&x.WDYK&&x.WDYK.toString().trim()!=='';
    //console.log(x.WDYK);
}
app.post('/sends',(req,res)=>{
    //console.log(req.body);

     if ( callf(req.body) ){
        //console.log("VALIDATED");
        const myobj={
            name: filter.clean(req.body.name.toString()),
            WDYK: filter.clean(req.body.WDYK.toString()),
            created: new Date()
        }
        senddd.
            insert(myobj)
            .then(insertedobj=>{
                res.json(insertedobj);
            });

     }
    else{
        //console.log("INVALID!");
        res.status(422);
        res.json(
            {
                message:"HEY!Please fill all fields!"
            }
        );
    }  
});
app.listen(
    5000,
    ()=>{
        console.log("listening on http://localhost:5000");
    }
);
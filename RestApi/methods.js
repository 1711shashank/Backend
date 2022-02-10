const express = require('express');
const app = express();

app.use(express.json()); 
app.listen(4000);

let users={};


// to get data
app.get('/user',(req,res)=>{
    res.send(users);
})


// to post data
app.post('/user',(req,res)=>{
    console.log(req.body);
    users = req.body;
    res.json({
        message:"Data recived Successfully",
        user:req.body
    });
});


// to update data
app.patch('/user', (req,res)=>{
    console.log('req.body => ', req.body);
    let updatData = req.body;
    for(key in updatData){
        users[key] = updatData[key];
    }
    res.json({
        message:"Data updated Successfully",
    })
})

// to delete
app.delete('/user', (req,res)=>{
    users={};
    res.json({
        message:"Data has been deleted",
    })

})
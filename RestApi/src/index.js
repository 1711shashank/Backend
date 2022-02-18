const http = require('http');
const _ = require('lodash');

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.statusCode = 200;
        res.write("I m listen");
        res.end();
    }
    else if(req.url === '/about'){
        res.statusCode = 200;
        res.write("I m about page");
        res.end();
    }
    else if(req.url === '/about-me'){
        res.statusCode = 301;
        res.setHeader('Location', './about');
        res.end();
    }
    else{
        res.statusCode = 404;
        res.write("404 page not found");
        res.end();
    }

})

server.listen(1000, ()=>{
    console.log('Server started on port 3000')
    let num = _.random(0,20);
    console.log(num);
})
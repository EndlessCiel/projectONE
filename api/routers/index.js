var express = require('express');
var app = express();
var bp = require('body-parser');
var path=require('path');
var supplier = require("./suppliers");
var powerRouter=require('./power');




   app.use(express.static(path.join(__dirname, '../../web/')));
module.exports = {
    start: function(_port){

        app.use(bp.urlencoded({extended: false}));

        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });

        // userRouter.register(app);
        // productRouter.register(app);
        // memberRouter.register(app);
        // trackerRouter.register(app);
        powerRouter.register(app);
		 supplier.register(app);

        app.listen(_port,function(){
          console.log(_port);
        });
    }
}
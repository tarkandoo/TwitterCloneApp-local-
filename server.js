var express=require('express');
var app=express();
var routes=require('./app/routes/routes');
var port=process.env.PORT || 3000;

app.use('/',routes);
app.use(express.static(__dirname+'/app'));


app.listen(port,(err) => {
	if(err)
		return console.log("Error occured",err);
    console.log("Listening on port : " + port);
});
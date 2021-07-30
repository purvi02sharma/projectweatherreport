var express= require('express');
var path= require('path');
var app= express();
app.get("/index",function(request,response){
	console.log(request);
	response.sendFile('index.html',{root: path.join(__dirname,'')});
});
app.listen('12345',function function_name(){
	console.log("Node server started");
});
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))

//configuration of database
var dbPath = "mongodb://localhost/blogApp";
db = mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
   console.log("connection open")
});

//var middleware=require('./mymiddleware.js');
var Blog = require('./blogModel.js');
var blogModel = mongoose.model('Blog');
//var comments=mongoose.model('Comments');

// welcome blog
app.get('/',function(req,res)
{
  res.send("Welcom to blogModel");
});


//To get blog details
app.get('/blogs',function(req,res)	
{
   blogModel.find(function(err,result)
   {
      	if (err)
      	{
      		console.log(err)
            res.send(err);
      	}
        else
        	res.send(result);
   });
});



//To create a blog
app.post('/blogs/create',function(req,res)	
{

	var newBlog = new blogModel
	({
      title    :  req.body.title,
      subTitle :  req.body.subTitle,
      blogBody :  req.body.blogBody
	});

	var today=Date.now();
	newBlog.created=today;

	var alltags=(req.body.alltags!=undefined && req.body.alltags!=null)?req.body.alltags.split(','):'';
	newBlog.tags=alltags;

	var authorInfo={fullname:req.body.authorFullname,email:req.body.email};
    newBlog.authorInfo=authorInfo;
    
    var like=(req.body.like)

    var comment=(req.body.comment!=undefined && req.body.comment!=null)?req.body.comment.split(','):'';
    var user=(req.body.user!=undefined && req.body.user!=null)?req.body.user.split(','):'';
    for (var i=0;i<comment.length;i++)
    {
         var comments=({Comment:comment[i],CommentBy:user[i]});
     //ewBlog.Comments=comments;
  newBlog.Comments.push(comments);
}
	newBlog.save(function(error)
	{
		if(error)
		{ 
			console.log(error)
			res.send(error);
		}
		else
			res.send(newBlog);
	});
});


//Api to view a particular blog
app.get('/blogs/:id',function(req,res)	
{
   blogModel.findOne({'_id':req.params.id},function(err,result)
   {
      	if (err)
      	{
      		console.log(err);
            res.send(err);
      	}
        else
        	res.send(result);
   });
});




//To Edit A blog
app.put('/blogs/:id/edit',function(req,res)
{   if(req.body.comments==undefined || req.body.comments==null)
	{
    var update=req.body;
    var today=Date.now();

    var newBlog = new blogModel
	newBlog.lastModified=today;
    blogModel.findOneAndUpdate({'_id':req.params.id},{$set:update,'lastModified':today},function(err,result)
    {
      if(err)
      {
      	console.log(err)
      	res.send(err)
      }
      else
      {
        console.log(result)
      	res.send(result)
      }
    });
}
  else
  {
  	//res.send(result);
  	console.log("Comments Cannot be edited");
  	res.send("comments cannot be edited");
  }

});




//To delete a particular blog
app.post('/blogs/:id/delete',function(req,res)
{
	blogModel.remove({'_id':req.params.id},function(err,result)
	{
		    if(err)
      {
      	console.log(err)
      	res.send(err)
      }
      else
      {
        console.log("deleted");
        res.send(result);
}
	})
})

//Sending to local host
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


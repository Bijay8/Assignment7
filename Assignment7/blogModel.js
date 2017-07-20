//instance
var mongoose=require('mongoose');

//declare schema object
var Schema=mongoose.Schema;
var blogSchema=new Schema({

	title       :    {type:String,default:'',required:true},
	subTitle    :    {type:String,default:''},
	blogBody    :    {type:String,default:''},
	tags	    :    [],
	created     :    {type:Date},
	lastModified:    {type:Date},
	authorInfo  :    {},
	Like        :    {type:Number,default:0},
	Comments    :    []
});

/*var Comments=new Schema(
{
	Comment   : {type:String,default:''},
	Commentby : {type:String,default:''},
	Date      :  {type:Date}
})
*/
mongoose.model('Blog',blogSchema);	
/*mongoose.model('Comments',Comments);*/

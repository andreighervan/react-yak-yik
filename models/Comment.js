var mongoose=require('mongoose');

var CommentSchema=new mongoose.Schema({
   body:{type:String,default:''},
    timestamp:{type:Date,default:Date.now},
    username:{type:String,default:''}
});

module.exports=mongoose.model('CommentSchema',CommentSchema);
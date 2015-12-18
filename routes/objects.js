var express = require('express');
var router = express.Router();
var ObjCollection = require('../models/objects');


/* GET objects. */
router.get('/', function(req, res) {

	console.log("in get");
	
   
   	ObjCollection.find({},'-_id ',function(err,objColl){
        if (err)
            console.log('error occured in the database');


         var objCollection = []; 
         objColl.forEach(function (val) { 
 
         	objCollection.push(val); 
         });

        res.render('objects', {objects: JSON.stringify(objCollection)});
    });   

    

  });  


/* Post objects. */
router.post('/', function(req, res) {

   var obj=req.body;


   	ObjCollection.find({},function(err,objColl){
        if (err)
            console.log('error occured in the database');


         var objCollection = []; 
         objColl.forEach(function (val) { 
 
         	for(var i=0;i<obj.length;i++){

         		if(val.id==obj[i].id){
         			val.color=obj[i].color;
         		}
         	}

         	val.save(function(err,data){

         			//console.log(err);

         			//console.log(data);
         	});
         });

	});
} );  

    


module.exports = router;

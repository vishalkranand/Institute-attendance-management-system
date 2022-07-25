const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const bodyParser=require('body-parser')
const ejs=require('ejs')
const helmet=require('helmet')
const morgan=require('morgan')

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(helmet())
app.use(morgan('dev'))

mongoose.connect("mongodb://localhost:27017/universityDB");

let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:Number
})

let User=new mongoose.model('user',userSchema);


app.route('/users')
.post((req,res)=>{

 let body=req.body;                         //renaming body object
 console.log(body);


if(body.Email  && (body.FullName==="" && body.MobileNo==="")){    //( YOU MAY ADD --> (&& body.Password ) CONDITION HERE)
    User.findOne({email:body.Email},(err,userData)=>{
     if(userData){                                          //if user found then check password
  
    if(body.Password===userData.password) { res.json({message:"login-successful",data:userData})}  //password match
     else { 
        res.json({message:"wrong-password"})}                                                   //password mismatch
     }
     else if(!userData){                                   //if user not found
      res.json({message:"user-not-found"})
     }else {                                                //if error
        res.status(500).json({message:err});              
     }
    });
}

else if(body.FullName && body.Email && body.Password && body.MobileNo){
    User.findOne({email:body.Email},(err,userData)=>{
        if(userData){ res.json({message:"registered-already"}) }                    //if already registered
        else if(!userData){                                                         //if new user
        let user=new User({name:body.FullName,email:body.Email,password:body.Password,contact:body.MobileNo});
        user.save(err=>{
           if(!err) res.json({message:"registered-successfully"})
           else res.status(500).json({message:"try-again-later"})
        });
     }
     else {                                                                         //if some error
        res.status(500).json({message:"service-unavailable-at-the-moment / insufficient-data-sent"});
     }
   })

}

else{
 res.json({message:"resource-not-reachable"});
}

});



app.route('*')
.get((req,res)=>{res.render('index');})
.post((req,res)=>{res.status(400).json({message:"url-not-found"})})
.put((req,res)=>{resstatus(400).json({message:"url-not-found"})})
.patch((req,res)=>{res.status(400).json({message:"url-not-found"})})
.delete((req,res)=>{res.status(400).json({message:"url-not-found"})});


app.listen(process.env.PORT || 3050 ,()=>console.log("Your server is now live on port 3050...") )
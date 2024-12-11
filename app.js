const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


//require contact shcema
const Contact = require('./models/contact');
const contact = require('./models/contact');
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{
    
}).then(()=>{

     const contacts = ([
//   {name:"joe",phone:"32323232323",email:"jow@gmail.com"},
//   {name:"jagu",phone:"3242424234",email:"aasa@gmail.com"},
//   {name:"reja",phone:"323243122323",email:"dfd@gmail.com"},
//   {name:"dwe",phone:"32323232323",email:"sddfd@gmail.com"},
//   {name:"fef",phone:"323232323",email:"sfsdf@gmail.com"},
//   {name:"ew",phone:"3235454542323",email:"aa@gmail.com"},
//   {name:"gge",phone:"55555556623",email:"vdf@gmail.com"},
//   {name:"ewe",phone:"78787878723",email:"gfh@gmail.com"},
//   {name:"hy",phone:"656565623",email:"nhn@gmail.com"},
//   {name:"jre",phone:"3454542323",email:"ds@gmail.com"},
//   {name:"rer",phone:"7676787632323",email:"hhhhh@gmail.com"},
//   {name:"jj",phone:"546567767323",email:"eww@gmail.com"},
//   {name:"rtt",phone:"3546476723",email:"wqq@gmail.com"},
])
Contact.insertMany(contacts).then(()=>{
    console.log('contact saved');
}).catch((err)=>{
    console.log(err);
});
}).catch((err)=>{
    console.log(err);
})

//midleware
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//add contact
app.get('/',async (req,res) => {
    try {
        const contacts = await Contact.find({});
        res.render("index",{contacts});
    } catch (error) {
        console.error(err);
    }
});


app.get('/add',(req,res) =>{
    res.render('addContact');
})

app.post('/add',async (req,res) => {
    const {name,phone,email} = req.body;
    const newContact = new contact({name,phone,email});
    try {
        await newContact.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
})

//edit contact

app.get('/edit/:id',async (req,res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.render('edit',{contact});
    } catch (error) {
        console.log(error);
    }
});

app.post('/edit/:id',async (req,res) => {
    const {name,phone,email} = req.body;
    try {
      await contact.findByIdAndUpdate(req.params.id,{name,phone,email});
      res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});
app.post('/edit/:id',async (req,res) => {
    try {
        
    } catch (error) {
        console.error(error);
    }
    
})

//delete contact 
app.post('/delete/:id',async (req,res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log(err);
    }
})


app.listen(3000,()=>{
  console.log('server is running on port 3000');
});


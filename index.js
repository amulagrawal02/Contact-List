const express = require('express');
const path = require('path');
const port = 9000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');
const app = express();


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

// for adding static files

app.use(express.static('assets'));

var contactList = [
    { name: "SRK", number: '9872828290' }
    , { name: "Aamir Khan", number: '8720829299' }
];


// for submitting the form
// app.post('/', function (req, res) {

//     // contactList.push(req.body);
//     // Contact.create({
//     //     name : req.body.name,
//     //     number : req.body.number
//     // },function(err,newContact)
//     // {
//     //     if(err)
//     //     {
//     //         console.log("Error in creating the contact!")
//     //         return;
//     //     }
//     //     console.log('*******',newContact)
//     // })
//     // return res.redirect('/')

// })
app.post('/create-contact', function(req, res){
    
    
    Contact.create({
        name: req.body.name,
        number: req.body.number
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});
// Basic setup
app.get('/', function (req, res) {
   
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error')
            return;
        }
       console.log(contacts)
        return res.render('home', {
            contact_list: contacts
        });
    })
   
})

// for deleting the contact
app.get('/delete-contact/', function (req, res) {

    
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("Error during the delete operation from the database");
            return
        }
    })
    
        return res.redirect('back');



})

// for setup live server
app.listen(port, function (err) {
    if (err) {
        console.log("err", err);
    }

    console.log("Yup! the server is start at port:", port);
})
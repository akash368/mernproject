const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

require("../db/connection");
const User= require("../model/userSchema");
const { now } = require('mongoose');

// middleware --- iska kaam ye hote hai ki, agar user ne login nhi kiya hai to agar vo show vale button/url pe jata hai to use show page nhi dikhna cahiye. vo login page pe redirect to jayega

const middleware = (req, res, next) =>
{
        console.log('this is middleware');   
        next();
}

// ------------------------middleware------------------------------------



// for home page
router.get('/', (req, res) =>{
    res.send('this is home page');
})

// for about us page

router.get("/about",authenticate, (req, res) => {
	// console.log(req.cookies.jwtoken);
	console.log("This is about");
	res.send(req.rootUser);
});


// show page after login

router.get('/show',middleware, (req, res) =>          
{
    res.send('this is show page');
})

// this is register page with post method

router.post('/register', async(req, res) =>       // this method is called async and await------
{
    const {name, email, phone, work, password, cpassword} = req.body;
    /*console.log(name);*/

    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error:"Fill all mandatory fields"});
    }

    try{
        const userExist=await User.findOne({ email:email});    // checking of existing user by existing email

        if(userExist)
        {
            return res.status(423).json({error:"Email already exist"});
        }
        else if (password != cpassword)
        {
            return res.status(424).json({error:"value is different in confirm password"});
        }

        else
        {
            const user = new User({name, email, phone, work, password, cpassword});          // input data ko get krna
            // yahan pe password and cpassword ko encrypt krna hai....userSchema m hashing/encrypting kri hai
            await user.save();         //input data ko sve krna database m...connection code ki file import kri hai upar
    
            res.status(201).json({message:"User register successfully"});       
        }

                                             
        


    }
    catch(err)
    {
        console.log(err);
    }
   
         
    //console.log(name);
    //console.log(email);
    //res.json({message:req.body});
    //res.send('this is registration page');
})

// **************************login page********************************

router.post('/login', async(req, res) =>
{
    try{
        let token;

        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({error:"please enter the fields"});
        }

        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);

        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            

            if(!isMatch)
            {
                res.status(400).json({error:"invali login crediential"});
            }
            else
            {
                token  = await userLogin.generateAuthToken();
                console.log(token);

                res.cookie("jwtoken", token, {                            // ye cookie m token store kr rhe hai taaki baad m user ko authenticate kr sake
                    expires:new Date(Date.now() + 28592000000),
                    httpOnly:true
            });
                res.json({message:"User login successfully"});
            }
        }

        else
        {
            res.status(400).json({error:"invali login crediential"});
        }
        

    }catch(err)
    {
        console.log(err);
    }
})

router.get('/getData', authenticate, (req,res) =>
{
    console.log('this is getdata');
    res.send(req.rootUser);
});

// contact us page

router.post('/contact', authenticate , async(req, res) =>
{
    try{
        const {name, email, phone, message} = req.body;          /// frontend c data lana

        if(!name || !email || !phone || !message)
        {
            console.log("error in contct form");
            return res.json({error: "please fill the contact form"});
        }

        const userContact = await User.findOne({_id: req.userId});

        if(userContact)
        {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();

            res.status(201).json({message:" User message send"})
        }
    }catch(error)
    {
        console.log(error);
    }
})


// logout 

router.get('/logout', (req,res) =>
{
    console.log('this is getdata');
    res.clearCookie('jwtoken',{path:'/'} );
    res.status(200).send('User Logout');
});

// export this page

module.exports = router;
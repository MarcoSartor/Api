import {RequestHandler} from 'express'
import User from '../models/User';
import jwt from 'jsonwebtoken';


export const signUp: RequestHandler = async (req, res) => {
    const {username, email, password} = req.body;
    const userFound = await User.findOne({'email': email});
   if(userFound) return res.status(301).json({message:'Email already exist'})
   const user = new User(req.body);
   
   user.password = await user.encryptPassword(password);
   const saveUser = await user.save();
   
   //token
   const token: string = jwt.sign({_id: saveUser._id}, process.env.TOKEN_SECRET || 'tokentest');

   res.header('auth-token',token).json(saveUser)


};

export const logIn: RequestHandler = async (req, res) => {
 const user = await User.findOne({email:req.body.email});

   if(!user)  res.status(400).json('Email or password is wrong');

   const correctPassword: boolean = await user?.validatePassword(req.body.password) || false;
   if(!correctPassword) res.status(400).json('Invalid password');

   const token = jwt.sign({_id: user?._id}, process.env.TOKEN_SECRET || 'tokentest', {
      expiresIn: 60 * 60 * 24
   });

   res.header('auth-token',token).json(user);


};

export const profile:RequestHandler = async (req, res) => {
   const user =  await User.findById(req.userId, {password: 0});

   if(!user) return res.status(404).json('No user found');


   res.json(user);
};
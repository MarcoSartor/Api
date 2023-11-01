import {RequestHandler} from 'express'
import User from '../models/User'


export const getUsers: RequestHandler = async (req, res) =>  {
    const users = await User.find();
    res.json(users)
}

export const getUser: RequestHandler = async (req, res) =>  {
    const user = await User.findById(req.params.id);
    if(!user)  res.status(204);
    res.json(user)
}


export const updateUser: RequestHandler =async (req, res) =>  {
 
    const user = await User.findByIdAndUpdate(req.params.id,req.body, {new:true} );
    if(!user)  res.status(204);
    res.json(user)
    
}

export const deleteUser: RequestHandler = async (req, res) =>  {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)  res.status(204);
    res.json(user)
}

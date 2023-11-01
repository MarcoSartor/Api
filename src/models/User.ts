import {Schema, model,Document} from 'mongoose';
import bcrypt from 'bcryptjs'

export interface User extends Document {
   username: string;
   email:string;
   password:string;
   encryptPassword(password:string): Promise<string>;
   validatePassword(password:string): Promise<boolean>;
}

const userShema = new Schema({
    username:{
        type: 'string',
        required: true,
        trim: true
    },
    email:{
        type: 'string',
        required: true,
        trim: true,
        unique:true,
        lowercase: true
    },
    password:{
        type: 'string',
        required: true,
        trim: true
    }
})

userShema.methods.encryptPassword = async (password: string): Promise<string> =>{
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password,salt);
  
};

userShema.methods.validatePassword = async function (password:string): Promise<boolean>{
  return await bcrypt.compare(password,this.password);
}
export default model<User>('User', userShema);
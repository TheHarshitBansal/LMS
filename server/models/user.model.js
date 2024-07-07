import { compare, hash } from "bcrypt";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema({
    name:{
        type:'string',
        required: [true, 'Name is required'],
        minLength: [2, 'Minimum length should be 2 characters'],
        maxLength: [20, 'Maximum length should be 20 characters'],
        lowercase: true,
        trim: true
    },
    email:{
        type:'String',
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please fill a valid email address"
        ]
    },
    password:{
        type:'String',
        required: [true, "Password is required"],
        minLength: [8, 'Password should be atleast 8 characters long'],
        select: false, 
    },
    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
        type:'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    forgotPasswordToken:{
        type: 'String'
    },
    forgotPasswordExpiry: Date,
    subscription:{
        id:{
        type:String,
        default : null
        },
        status: {
            type: String,
            enum : ["ACTIVE", 'INACTIVE'],
            default: 'INACTIVE'
        }
    }
}, {
    timestamps: true
})

    userSchema.pre("save", async function(next){
        if(!this.isModified('password')){
            return next();
        }
        this.password = await hash(this.password, 20)
        next();
    })

    userSchema.methods = {
        generateJWTToken: async function () {
            return jwt.sign(
              { id: this._id, role: this.role, subscription: this.subscription },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRY,
              }
            );
        }, 
        comparePassword: async function (pass){
            return await compare(pass, this.password)
        },
        generateResetToken: async function(){
            const resetToken = crypto.randomBytes(20).toString('hex');

            this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            this.forgotPasswordExpiry = Date.now() + 60*60*1000;  //1 hr

            return resetToken;
        }
    }

const User = model("User", userSchema);
export default User;
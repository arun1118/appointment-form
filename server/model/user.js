const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true, 
        // default: ()=> Date.now() // default: new Date() // this will initialize date everytime program is run...but using a function only will fill the date if its not filled 
    }
});

const User=mongoose.model('user',UserSchema);

module.exports=User;
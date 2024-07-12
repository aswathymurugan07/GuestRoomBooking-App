const { type } = require('express/lib/response');
const mongoose=require('mongoose');

const roomSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amenity:{
        type:String,
        required:true
    },
    floorsize:{
        type:String,
        required:true
    },
    noofbeds:{
        type:Number,
        required:true
    },
    minstay:{
        type:Number,
        required:true
    },
    maxstay:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    imageurls:[String],
    currentbookings:[],
    description:{
        type:String,
        required:true
    },
    houseownerid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'houseowners'
    }
},{
    timestamps:true,
})


const roomModel = mongoose.model('rooms',roomSchema)
module.exports=roomModel
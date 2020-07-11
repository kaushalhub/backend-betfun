const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  createdAt: {type:String, default: new Date().toISOString().substring(0, 10)},
  status: {type:Boolean, default:false},
  userName:{type:String, required:true},
  master:{type:String},
  admin:{type:String},
  superadmin:{type:String},
  password:{type:String, required:true},
  walletBalance:{type:Number,default:0},
  userType:{type:Boolean,default:null},
  Master:{type:Boolean,default:false},
  Admin:{type:Boolean,default:false},
  superAdmin:{type:Boolean,default:false},
  blocked:{type:Boolean,default:false},
  Commission:{type:Number,default:0},
  ref:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  ongoingCasinoGame:{type: mongoose.Schema.Types.ObjectId, ref: 'Casino'},
  completedCasinoGame:[{type: mongoose.Schema.Types.ObjectId, ref: 'Casino'}],
  winCasinoGame:[{type: mongoose.Schema.Types.ObjectId, ref: 'Casino'}],
  account:{type: mongoose.Schema.Types.ObjectId, ref: 'account'}
})




var depositSchema = new mongoose.Schema({
  createdAt: {type:String, default: new Date().toISOString().substring(0, 10)},
  createdDate  :{type:String, default: new Date()},
  amount:{type:Number,required:true, default:0},
  accountHolderName:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  userName:{type:String,unique:false},


})
var withdrawSchema = new mongoose.Schema({
  createdAt: {type:String, default: new Date().toISOString().substring(0, 10)},
  createdDate  :{type:String, default: new Date()},
  amount:{type:Number,required:true, default:0},
  accountHolderName:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  userName:{type:String,unique:false},


})
var accountSchema = new mongoose.Schema({
  createdAt: {type:String, default: new Date().toISOString().substring(0, 10)},
  userName:{type:String,unique:true},
  accountHolderName:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  casinotransaction:[{type: mongoose.Schema.Types.ObjectId, ref: 'casinoGame'}],
  cricketTransaction:[{type: mongoose.Schema.Types.ObjectId, ref: 'cricketGame'}],
  walletBalance:{type:Number,required:true, default:0},
  amountDepositedByMaster:{type:Number, required:true,default:0},
  lastDepositDate:{type:String},
  userType:{type:Boolean,default:false},
  depositTransaction:[{type: mongoose.Schema.Types.ObjectId, ref: 'deposit'}],
  withdrawTransaction:[{type: mongoose.Schema.Types.ObjectId, ref: 'withdraw'}],


})

userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const user = mongoose.model('user',userSchema)
const account = mongoose.model('account',accountSchema)
const deposit = mongoose.model('deposit',depositSchema)
const withdraw = mongoose.model('withdraw',withdrawSchema)

module.exports = {userSchema,user,account,deposit,withdraw}

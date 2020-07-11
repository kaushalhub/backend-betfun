const Utils = require('../utils/utils.user');
var Users = require('../dao/user.dao');
var DB = require('../models/user.model');

// var DB = require('../db/user')



const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

/**
 * @author: Sopra Steria
 * @description:Create user function add new user in file also check from email id user already exist.
 * @param:req is request payload,res is reponse object and next for hanlled error
 * @return:return current user object or exist user object
 */

exports.createUser = function (req, res, next) {
      
if(req.body.userName == null || req.body.userName == undefined || req.body.password == null || req.body.password == undefined){
    return res.send({status:false, message:"Please Provide All Required Information"})
  }
  else{
     DB.user.findOne({userName:req.body.userName}).then((USER)=>{
        if(USER){
            return res.send({status:false, message:"username already exist"})

        }
        
        else{
            // DB.account.findOne({userName:req.body.userName}).then((masterAccount)=>{
            //     if(masterAccount){
            //         return res.send({status:false, message:"username already exist in master"})

            //     }
                
                    DB.user.findOne({userName:req.body.userName}).then((user)=>{
                        if(!user){
                            var salt = genSaltSync(10);
                            var hash= hashSync(req.body.password, salt);
                                var user = new DB.user ({
                                    userName: req.body.userName,
                                    password: hash,
                                    walletBalance:req.body.walletBalance,
                                    master:req.body.master,
                                    admin:req.body.admin,
                                    superadmin:req.body.superadmin,
                                    Master:req.body.Master,
                                    Admin:req.body.Admin,
                                    superAdmin:req.body.superAdmin              ,
                                    userType: 1,
                                    
                                })
                                var deposit = new DB.deposit({
                                    userName:req.body.userName,
                                    accountHolderName: user,
                                    amount:req.body.walletBalance

                                })
                                var account = new DB.account({
                                    userName:req.body.userName,
                                    accountHolderName: user,
                                    walletBalance:req.body.walletBalance,
                                    amountDepositedByMaster:req.body.walletBalance,
                                    userType: true,
                                    depositTransaction:deposit

                                })
                                deposit.save()
                                // masterAccount.walletBalance = masterAccount.walletBalance - req.body.walletBalance
                                // masterAccount.save()
                                account.save()
                                console.log("==========1234========",user)
                                user.save().then((saved)=>{
                                    if(!saved){
                                        return res.send({status:false, message:"Technical Error"})
                                    
                                    }
                            //         else{
                            //             USER
                            //             .ref
                            //             .push(user);
                            //         USER.save().then((resp)=>{
                            //             console.log("=====12342323========",resp)
                            //             if(!resp){
                            //                         return res.send({status:false, message:"Technical Error2"})
                            
                            //                     }
                            //    })
                            // }  
                                    //     if(!resp){
                                    //         return res.send({status:false, message:"Technical Error2"})
                    
                                    //     }else{
                                    //         // DB.user.findOneAndUpdate({userName:req.user.userName},{$inc:{walletBalance:-req.body.walletBalance}}).then((adminbalaceupdated)=>{
                                    //             // if(!adminbalaceupdated){
                                    //             //     return res.send({status:false, message:"Technical Error"})
    
                                    //             // }else{
                                    //                 return res.send({status:true, message:"User Added Sucessfully"})
    
                                    //             // }
                                    //         // })
    
                                            return res.send({status:true,
                                                 message:"User Added Sucessfully",
                                                data:user})
                                    //     }
                                //      }).catch((error)=>{
                                //         console.log("========error=========",error)
                                //   });
    
                                        
                
                                //   }
                            //    }  
                            });
                            
                         } 
                     });
                
            //  }); 
                  
           } 
       });
    }

 }







//  login based on the user email id and password
exports.login= function(req,res,next){
    const body = req.body;
Utils.getUserDetailsByEmail(req.body.userName).then(data=>{
const result = compareSync(body.password,data.password);
if(result){
    data.password = undefined;
    const jsontoken = sign({result: data}, "xyz1235",{
        expiresIn: "1h"
    });
    return res.json({
          success: 1,
          message :"login successfully",
          token: jsontoken,
          data:data

    });
} else {
    return res.json({
        success: 0,
        data :"invalid email or password"
    });
}
});

}


/**
 * @author: Sopra Steria
 * @description:get User function get the User Details based on the User Email ID.
 * @param:req is request payload,res is reponse object and next for hanlled error
 * @return:return current user Details
 */
exports.getUserDetailsByEmail= function (req,res,next){
    Utils.getUserDetailsByEmail(req.body.email).then(data=>{
        res.json(data);
    });
}
/**
 * @author: Sopra Steria
 * @description:Get all users list .
 * @param:req is request payload,res is reponse object and next for hanlled error
 * @return:return all users list object
 */
exports.getUsers = function (req, res, next) {
    Utils.getAllusers().then(data=>{
        res.json(data);
    });
   
}

//get all master list

exports.getMasters = function (req, res, next) {
    Utils.getAllMasters().then(data=>{
        res.json(data);
    });
   
}

//get all admin list

exports.getAdmins = function (req, res, next) {
    Utils.getAllAdmins().then(data=>{
        res.json(data);
    });
   
}

//get all block users


exports.getBlockUsers = function (req, res, next) {
    Utils.getBlockusersList().then(data=>{
        res.json(data);
    });
   
}


//close user

exports.blockUser = (req,res)=>{
    try {
        DB.user.findOne({userName:req.body.userName}).then((user)=>{
            if(!user){
                return  res.send({status:false, message:"Technical Error"})
            }else{
                user.blocked = true
                user.save().then((saved)=>{
                    if(!saved){
                       return  res.send({status:false, message:"Technical Error"})

                    }else{
                       return  res.send({status:true, message:"User Blocked Successfully",data:user})

                    }
                })
            }
        })
    } catch (error) {
       return  res.send({status:false, message:"Technical Error"})

    }
}

/**
 * @author: Sopra Steria
 * @description:Get one user details .
 * @param:req is request payload,res is reponse object and next for hanlled error
 * @return:return user object
 */
// exports.getUserById = function (req, res, next) {
//     Utils.getUserdetailsById(req.body.id).then(data=>{
//     if (data && data !== null) {
//             res.json(data);
//     } else {
//             return res.json('No record found')
//     }       
//     });
   
// }
/**
 * @author: Sopra Steria
 * @description:Update user function add new user in file also check from email id user already exist.
 * @param:req is request payload,res is reponse object and next for hanlled error
 * @return:return current user object or exist user object
 */
// exports.updateUser = function (req, res, next) {
//     const  userData ={
//         email:req.body.email,
//         displayName:req.body.displayName,
//         extension:req.body.extension,
//         isDeleted:false,
//         createdDate:req.body.createdDate,
//         lastUpdatedDate:req.body.lastUpdatedDate
//     }    
//      Users.update({_id:req.body.id},userData, function(err, user) {
//          if(err) {
//              res.json(err)
//          }
//          else{
//          res.json(user);
//          }
//      });
//  }



 //credit account of user


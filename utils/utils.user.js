
var Users = require('../dao/user.dao');
/**
 * @author: Sopra Steria
 * @description:this method return all users list.
 * @param:NA
 * @return:return all users list array
 */
module.exports.getAllusers = ()=>{   
    return new Promise((resolve,reject)=>{
        Users.get({blocked:false,superAdmin:false,Master:false,Admin:false}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
}
//get all Masters
module.exports.getAllMasters = ()=>{   
    return new Promise((resolve,reject)=>{
        Users.get({blocked:false,superAdmin:false,Master:true,Admin:false}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
}

//get all Admins

module.exports.getAllAdmins = ()=>{   
    return new Promise((resolve,reject)=>{
        Users.get({blocked:false,superAdmin:false,Master:false,Admin:true}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
}
//get all closed user list

module.exports.getBlockusersList = ()=>{   
    return new Promise((resolve,reject)=>{
        Users.get({blocked:true,superAdmin:false,Master:false,Admin:false}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
}
/**
 * @author: Sopra Steria
 * @description:create user details as per ID .
 * @param:id is int value
 * @return:return user object based on id 
 */
module.exports.getUserdetailsById = (id)=>{
    return new Promise((resolve,reject)=>{
        Users.getByID({_id:id}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
    }

/**
 * @author: Sopra Steria
 * @description:create user details as per Email ID .
 * @param:emailId is String value
 * @return:return user object based on EmailId 
 */
module.exports.getUserDetailsByEmail = (username)=>{
    return new Promise((resolve,reject)=>{
        Users.getByID({userName:username}, function(err, users) {
            if(err) {
               return reject(err);
            }
            else{
            return resolve(users);
            }
        })

    });
    }
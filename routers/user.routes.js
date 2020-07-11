var Auth = require('../controllers/user.controller');
var Token = require('../middleware/authentication');

// defined routing for auth module.
module.exports = function(router) {
    router.post('/createAccount', Auth.createUser);
    router.post('/login', Auth.login);
    router.get('/getUsers',Token.checkToken, Auth.getUsers);
    router.get('/getMasters',Token.checkToken, Auth.getMasters);
    router.get('/getBlockUsers',Token.checkToken, Auth.getBlockUsers);
    router.get('/getAdmins',Token.checkToken, Auth.getAdmins);
    router.post('/blockUser',Token.checkToken, Auth.blockUser);
    // router.post('/getUserById',Token.checkToken, Auth.getUserById);
    // router.put('/updateUser',Token.checkToken, Auth.updateUser);
    router.post('/getUserDetailsByEmail',Token.checkToken,Auth.getUserDetailsByEmail)
}
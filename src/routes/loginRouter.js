var express = require('express');
var mssql = require('mssql');
var loginRouter = express.Router();
module.exports = function () {
    loginRouter.route('/')
        .post(function (req, res) {
            var userId = req.body.userId;
            var pwd = req.body.password;
            var ps = new mssql.PreparedStatement();
            ps.input('userId', mssql.Int);
            ps.input('password', mssql.VarChar);
            ps.prepare('SELECT * FROM [Users] where UserId=@userId AND Password=@password', function (err) {
                if (err) {
                    console.log("error in login router" + err);
                } else {
                    ps.execute({
                        userId: userId,
                        password: pwd
                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(data);
                            if (data.recordset.length == 1) {
                                req.userSession.IsAuthenticated = true;
                                req.userSession.IsAuthorised = false;
                                req.userSession.user = data.recordset[0];
                                req.userSession.IsAdmin = data.recordset[0].IsAdmin;
                                // console.log(JSON.stringify(req.userSession));
                                res.send(JSON.stringify(req.userSession));
                            } else {
                                req.userSession.IsAuthenticated = false;
                                req.userSession.IsAuthorised = false;
                                req.userSession.user = null;
                                req.userSession.IsAdmin = 0;
                                res.send(JSON.stringify(req.userSession));
                            }
                        }
                    });
                }
            });
        });
    return loginRouter;
}
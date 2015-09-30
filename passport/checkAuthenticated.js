/**
 * Created by Ian on 30/09/2015.
 */

    //TODO this whole method is probably unnecessary
var checkAuthenticated = function(request){
    if(request.isAuthenticated()){
        return true
    }
    else
        return false
}


module.exports = function(req, res, next){

    console.log("chaeckAuthenticated Middleware")
    if(checkAuthenticated(req) || req.path == '/login'){
        console.log("Authentication ok")
        next()
    }
    else{
        console.log("Not authenticated");
        if(req.path == '/sites' || req.path == '/users'){
            console.log('api request - forbidden')
            res.status(403).send('forbidden');
        }
        else {
            res.redirect('/login');
        }
    }
};
/**
 * Created by Ian on 30/09/2015.
 */


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.model.Site.findAll().then(function(sites){
        res.json(sites)
    });
    //res.send('respond with a resource');
});

module.exports = router;
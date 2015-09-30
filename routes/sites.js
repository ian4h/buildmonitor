/**
 * Created by Ian on 30/09/2015.
 */


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.model.Sites.findAll().then(function(sites){
        res.json(sites)
    });
    //res.send('respond with a resource');
});

router.get('/:id', function(req, res){
    console.log("Get a particular site with ID >> " + req.params.id)
    req.model.Sites.findById(req.params.id, {
        include: [req.model.Stats]
    }).then(function(site){
        res.json(site);
    })
});

module.exports = router;
function logged(req, res, next){
    if(req.session.user){
        res.redirect('/users/profile')
    }
    next()
};

module.exports=logged;
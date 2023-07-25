const usersController = {
    register:(req,res)=>{
        res.render('usersRegisterForm')
    },

    login:(req,res)=>{
        res.render('usersLoginForm')
    },

    profile:(req,res)=>{
        res.render('userProfile')
    },
};

module.exports=usersController
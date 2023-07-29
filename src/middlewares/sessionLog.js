const Users = require('../models/Users');

function session(req, res, next) {
    const userEmailFromSession = req.session.user ? req.session.user.email : null;
    const userEmailFromCookie = req.cookies.logMail;
    
    if (userEmailFromSession && userEmailFromCookie) {
        const userValid = Users.findUserByField('email', userEmailFromCookie);
        delete userValid.password;
        if (userValid && userValid.email === userEmailFromSession) {
            res.locals.logged = true;
            res.locals.userValid = userValid;
        } else {
            res.locals.logged = false;
        }
    } else {
        if (req.session.user) {
            let userValid = req.session.user;
            delete userValid.password;
            res.locals.userValid = userValid;
            res.locals.logged = true;
        } else {
            res.locals.logged = false;
        }
    }

    next();
}

module.exports = session;

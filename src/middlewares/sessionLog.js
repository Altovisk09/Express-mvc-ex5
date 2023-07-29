const Users = require('../models/Users');

function session(req, res, next) {
    const userEmailFromSession = req.session.user ? req.session.user.email : null;
    const userEmailFromCookie = req.cookies.logMail;
    
    if (userEmailFromSession && userEmailFromCookie) {
        const userValidation = Users.findUserByField('email', userEmailFromCookie);
        if (userValidation && userValidation.email === userEmailFromSession) {
            res.locals.logged = true;
        } else {
            res.locals.logged = false;
        }
    } else {
        if (req.session.user) {
            res.locals.logged = true;
        } else {
            res.locals.logged = false;
        }
    }

    next();
}

module.exports = session;

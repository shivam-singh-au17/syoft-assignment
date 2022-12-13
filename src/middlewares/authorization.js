
module.exports = (permittedRoles) => {

    return (req, res, next) => {

        // first get the user from the req
        const user = req.user;

        // then check if any of the roles that user has matches with any of the permittedRoles
        const isPermittedArray = user.role.filter((role) => {
            return permittedRoles.includes(role);
        });

        // if not then throw an error
        if (isPermittedArray.length === 0) {
            return res.status(400).json({ message: "You are not permitted to access this" });
        }

        // else return next
        return next();

    };
};

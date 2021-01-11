exports.userSignupValidator = (req,res,next) => {

    req.check("name", "name is required").notEmpty()

    req.check("email", "email must be 10 to 32 character").notEmpty()
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({min:8,max:32})
        .withMessage("Email must contain length of minimum 8  and maximum 32 ")


    req.check("password", "password is required").notEmpty()
        .isLength({min:6})
        .withMessage("password must contain at least 6 character ")
        .matches(/\d/)
        .withMessage("password must contain at least a number")

    const errors = req.validationErrors()
    if(errors)
    {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error : firstError})
    }

    next();

}
//Reason Why and What
//Next(): - next() is middleware/callback function 
//, it will be executed--> whether  it will be succeeded or fail (It need to move next phase)
//Otherwise our application will hault .....this is the core concept of the middleware
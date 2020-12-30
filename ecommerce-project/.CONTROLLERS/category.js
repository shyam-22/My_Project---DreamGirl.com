const Category = require("../.MODULE-Schema/categoryScheme")

const {errorHandler} = require( "../.Error_Message-DB/dbEroor.js");

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,data)=> {
        if(err)
        {
            return res.status(400).json({error: errorHandler(err) })
        }
        res.json({data})
    })
}

//fetch Category By Id
exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category) => {
        if(err || !category)
        {
            return res.status(400).json({error: "category does not exist"})            
        }
        req.category = category;
        next();
    })
}

//Read the category By ITs Id
exports.read = (req,res) => {
    return res.json(req.category)
}


//Output will be like
// {
//     "data": {
//         "_id": "5fe8c2e1b935f026bcda749f",
//         "name": "Node",
//         "createdAt": "2020-12-27T17:22:41.065Z",
//         "updatedAt": "2020-12-27T17:22:41.065Z",
//         "__v": 0
//     }
// }
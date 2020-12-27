const Category = require("../.MODULE-Schema/categoryScheme")

const {errorHandler} = require( "../.Error_Message-DB/dbEroor.js");


exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,data)=> {
        if(err)
        {
            return res.this.status(400).json({error: errorHandler(err) })
        }
        res.json({data : data})
    })
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
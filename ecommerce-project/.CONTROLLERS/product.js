const Product = require("../.MODULE-Schema/productSchema")
const {errorHandler} = require( "../.Error_Message-DB/dbEroor")

const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//fetch the Product by Its ID
exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product)=> {
        if(err || !product)
        {
            return res.status(400).json({error : "Product Not Found "})
        }
        req.product = product
        next();
    })
}
//Read the Product
exports.read = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}
//Remove the Product By ITs add
exports.remove = (req,res) => {
    let product = req.product
    product.remove((err,deletedProduct)=> {
        if(err)
        {
            return res.status(400).json({error: errorHandler(err) })
        }
        res.json({"message": "Product deleted successfully"})
    })
}
//Create the Product
exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions= true
    form.parse(req, (err,fields, files) => {
        if(err)
        {
            return res.status(400).json({error : "image could not be uploaded"});
        }
        //Validation : Now check for all fields 
        const {name,description,price,category,quantity,shipping,photo} = fields
        if(!name ||  !description ||  !price ||  !category ||  !quantity ||  !shipping || !photo)
        {
            return res.status(400).json({error : "sorry....!all fields are required"});
        }

        let product = new Product(fields)
        //Validation : restrict user to upload the image within size...1 KB =1ooo, 1 MB = 100000
        if(files.photo)
        {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
            if(files.photo.size > 200000)
            {
            return res.status(400).json({error : "image should be upto 2MB size "});
            }
        }
        product.save((err,result) => {
            if(err)
            {
                return res.status(400).json({error : errorHandler(err)})
            }
            res.json(result);
        });
    });
};
//Update the Product By Its ID
exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err)
        {
            return res.status(400).json({error : "Image could not be uploaded"})
        }

        //Check for all fields are filled or not
        const {name,description,price ,category,quantity,shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping)
        {
            return res.status(400).json({error : "All fields are required"})
        }

        let product = req.product
        product = _.extend(product,fields)
        //extend method takes 2 argument.....!st itself product ,second as updated field
         //Validation : restrict user to upload the image within size...1 KB =1ooo, 1 MB = 100000
        if(files.photo)
        {
            console.log("FILES PHOTO:" , files.photo)
            if(files.photo.size > 1000000)
            {
                return res.status(400).json({error:"Image should be less than 1MB in size" })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType  = files.photo.type
        }

        product.save((err,result) => {
            if(err)
            {
                return res.status(400).json({error: errorHandler(err) })
            }
            res.json(result)
        })
    })
};

//Reason why and what ---->For image upload [multer,formidable]
//FormData() ----> 7bcoz in product schema we use image upload
 //1kb = 1000.....1mb = 1000000

//Output will be like

//--------------------------------------------------------------------------------------------------------------
//Important feature of any Ecomm application we might to return product  By sell and arrival--> 
//By_Sell Routes in form of --->  /products?sortBy = sold&order=desc&limit=4
//By_Arrival Routes in form of ---> /products?sortBy = createdAt&order=desc&limit=4

//If no params are sent,then all products ae return --->fetch the products,based on what we need
exports.list = (req,res) => {
    let order  = req.query.order ? req.query.order : "ase"
    let sortBy  = req.query.sortBy ? req.query.sortBy : "_id"
    let  limit = req.query.limit ? parseInt(req.query.limit) : 5

    Product.find()
           .select("-photo")
           .populate("category")
           .sort([[sortBy,order]])
           .limit(limit)
           .exec( (err,products) => {
            if(err)
            {
                return res.status(400).json({ error : "Products Not found "})
            }
            res.send(products)
           })
}





















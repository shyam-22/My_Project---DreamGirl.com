const Product = require("../.MODULE-Schema/productSchema")
const {errorHandler} = require( "../.Error_Message-DB/dbEroor")

const formidable = require("formidable")
// const _ = require("lodash")
const fs = require("fs")

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

exports.read = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

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

exports.createProduct = (req,res) => {
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

        let product = new Product(fields)
         //Validation : restrict user to upload the image within size...1 KB =1ooo, 1 MB = 100000
        if(files.photo)
        {
            console.log("FILES PHOTO:" , files.photo);
            if(files.photo.size > 1000000)
            {
                return res.status(400).json({error:"Image should be less than 1MB in size" })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType  = files.photo.type
        }

        product.Save((err,result) => {
            if(err)
            {
                return res.status(400).json({error: errorHandler(err) })
            }
            res.json(result)
        })
    })
};
//Reason why and what ---->For image upload [multer,formidable]
//FormData() ----> bcoz in product schema we use image upload
 //1kb = 1000.....1mb = 1000000

//Output will be like


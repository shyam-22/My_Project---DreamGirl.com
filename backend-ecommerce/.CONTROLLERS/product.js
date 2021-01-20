const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require("../.MODULE-Schema/productSchema");
const { errorHandler } = require("../.Error_Message-DB/dbEroor");

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.listSearch = (req,res) => {
    //create a query object  to hold  search value and category  value
    const query = {}
    //assign search value to query.name
    if(req.query.search){
        query.name = {$regex : req.query.search, $option : "i"}
        //assign category value to query category
        if(req.query.category &&  req.query.category != "All"){
            query.category = req.query.category
        }
        //Now will find product based on query object with a 2 properties----> search and category
        Product.find(query,(err,products) => {
            if(err){
                return res.status(400).json({error :  errorHandler(err)})
            }
            res.json(products)
        }).select("-photo")
    }
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields); // 1kb = 1000// 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            return res.json(products);
        });
};

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};




// const Product = require("../.MODULE-Schema/productSchema")
// const {errorHandler} = require( "../.Error_Message-DB/dbEroor")

// const formidable = require("formidable")
// const _ = require("lodash")
// const fs = require("fs")

// //fetch the Product by Its ID
// exports.productById = (req,res,next,id) => {
//     Product.findById(id).exec((err,product)=> {
//         if(err || !product)
//         {
//             return res.status(400).json({error : "Product Not Found "})
//         }
//         req.product = product
//         next();
//     })
// }
// //Read the Product
// exports.read = (req,res) => {
//     req.product.photo = undefined
//     return res.json(req.product)
// }
// //Remove the Product By ITs add
// exports.remove = (req,res) => {
//     let product = req.product
//     product.remove((err,deletedProduct)=> {
//         if(err)
//         {
//             return res.status(400).json({error: errorHandler(err) })
//         }
//         res.json({"message": "Product deleted successfully"})
//     })
// }
// //Create the Product
// exports.create = (req,res) => {
//     let form = new formidable.IncomingForm()
//     form.keepExtensions= true
//     form.parse(req, (err,fields, files) => {
//         if(err)
//         {
//             return res.status(400).json({error : "image could not be uploaded"});
//         }
//         //Validation : Now check for all fields 
//         const {name,description,price,category,quantity,shipping,photo} = fields
//         if(!name ||  !description ||  !price ||  !category ||  !quantity ||  !shipping || !photo)
//         {
//             return res.status(400).json({error : "sorry....!all fields are required"});
//         }

//         let product = new Product(fields)
//         //Validation : restrict user to upload the image within size...1 KB =1ooo, 1 MB = 100000
//         if(files.photo)
//         {
//             product.photo.data = fs.readFileSync(files.photo.path)
//             product.photo.contentType = files.photo.type
//             if(files.photo.size > 200000)
//             {
//             return res.status(400).json({error : "image should be upto 2MB size "});
//             }
//         }
//         product.save((err,result) => {
//             if(err)
//             {
//                 return res.status(400).json({error : errorHandler(err)})
//             }
//             res.json(result);
//         });
//     });
// };
// //Update the Product By Its ID
// exports.update = (req,res) => {
//     let form = new formidable.IncomingForm()
//     form.keepExtensions = true
//     form.parse(req, (err,fields,files) => {
//         if(err)
//         {
//             return res.status(400).json({error : "Image could not be uploaded"})
//         }

//         //Check for all fields are filled or not
//         const {name,description,price ,category,quantity,shipping} = fields
//         if(!name || !description || !price || !category || !quantity || !shipping)
//         {
//             return res.status(400).json({error : "All fields are required"})
//         }

//         let product = req.product
//         product = _.extend(product,fields)
//         //extend method takes 2 argument.....!st itself product ,second as updated field
//          //Validation : restrict user to upload the image within size...1 KB =1ooo, 1 MB = 100000
//         if(files.photo)
//         {
//             console.log("FILES PHOTO:" , files.photo)
//             if(files.photo.size > 1000000)
//             {
//                 return res.status(400).json({error:"Image should be less than 1MB in size" })
//             }
//             product.photo.data = fs.readFileSync(files.photo.path)
//             product.photo.contentType  = files.photo.type
//         }

//         product.save((err,result) => {
//             if(err)
//             {
//                 return res.status(400).json({error: errorHandler(err) })
//             }
//             res.json(result)
//         })
//     })
// };

// //Reason why and what ---->For image upload [multer,formidable]
// //FormData() ----> 7bcoz in product schema we use image upload
//  //1kb = 1000.....1mb = 1000000

// //Output will be like

// //--------------------------------------------------------------------------------------------------------------
// //Important feature of any Ecomm application we might to return product  By sell and arrival--> 
// //By_Sell Routes in form of --->  /products?sortBy = sold&order=desc&limit=4
// //By_Arrival Routes in form of ---> /products?sortBy = createdAt&order=desc&limit=4

// //If no params are sent,then all products ae return --->fetch the products,based on what we need
// exports.list = (req,res) => {
//     let order  = req.query.order ? req.query.order : "ase"
//     let sortBy  = req.query.sortBy ? req.query.sortBy : "_id"
//     let  limit = req.query.limit ? parseInt(req.query.limit) : 5

//     Product.find()
//            .select("-photo")
//            .populate("category")
//            .sort([[sortBy,order]])
//            .limit(limit)
//            .exec( (err,products) => {
//             if(err)
//             {
//                 return res.status(400).json({ error : "Products Not found "})
//             }
//             res.send(products)
//            })
// }
// //it will find the product based on the request product category 
//     //other products that has been same category, will also be returned 
// exports.listRelated = (req,res) => {
//     let limit = req.query.limit ? parseInt(req.query,limit) : 6;
//     Product.find( {_id : {$ne : req.product}, category:req.product.category} )
//     .limit(limit)
//     .populate("category", "_id name")
//     .exec((err,products) => {
//         if(err)
//         {
//             return res.status(400).json({ error : "Products Not found "})
//         }
//         res.json(products)
//     })
// }
// //List down only that categories ---> that are used by 
// exports.listCategories = (req,res) => {
//     Product.distinct("category", {},(err,categories) => {
//         if(err)
//         {
//             return res.status(400).json({ error : "categories Not found "})
//         }
//         res.json(categories)  
//     })
// }

// /**
//  * list products by search
//  * we will implement product search in react frontend
//  * we will show categories in checkbox and price range in radio buttons
//  * as the user clicks on those checkbox and radio buttons
//  * we will make api request and show the products to users based on what he wants
//  */
 
// // route - make sure its post

 
// exports.listBySearch = (req, res) => {
//     let order = req.body.order ? req.body.order : "desc";
//     let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
//     let limit = req.body.limit ? parseInt(req.body.limit) : 100;
//     let skip = parseInt(req.body.skip);
//     let findArgs = {};
 
//     // console.log(order, sortBy, limit, skip, req.body.filters);
//     // console.log("findArgs", findArgs);
 
//     for (let key in req.body.filters) {
//         if (req.body.filters[key].length > 0) {
//             if (key === "price") {
//                 // gte -  greater than price [0-10]
//                 // lte - less than
//                 findArgs[key] = {
//                     $gte: req.body.filters[key][0],
//                     $lte: req.body.filters[key][1]
//                 };
//             } else {
//                 findArgs[key] = req.body.filters[key];
//             }
//         }
//     }
 
//     Product.find(findArgs)
//         .select("-photo")
//         .populate("category")
//         .sort([[sortBy, order]])
//         .skip(skip)
//         .limit(limit)
//         .exec((err, data) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "Products not found"
//                 });
//             }
//             res.json({
//                 size: data.length,
//                 data
//             });
//         });
//     };

// exports.photo = (req,res,next) => {
//     if(req.product.photo.data)
//     {
//         res.set("content-Type",req.product.photo.contentType)
//         return res.send(req.product.photo.data)
//     }
//     next();
// }








































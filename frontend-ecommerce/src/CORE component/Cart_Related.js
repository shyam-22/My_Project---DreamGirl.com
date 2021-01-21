//Add to cart, remove fro cart......increment quantity and decrement quantity
// #1 Add product to the local storage----> Here we need to send actual item as an argument
//And we will use callback function ---> to do something Once we added to the local storage
export const addItem = (item,next) => {
    let cart = [] //first we are going to create cart array....which is going to be empty
        //To begin--->make sure that we have the window object
        //if not equal to undefined....then we want to access local storage
    if(typeof window !== "undefined")
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))//parse : to convert JSON to object
            //here we try to get the item from the local storage with the name of "Cart"
            //populate all products fro this cart variable //stringify : to convert object to JSON
        }
        cart.push({
            //to push new product 
            ...item,
            count : 1   //By default it is going to be always 1
        })
        //If same product has been clicked twice or more than that....So for that -->we need to run a small function
        //so that we can use---> Our array.from() to create a new array that will make sure that there is no duplicate
        //Array.from () -this will give us a new array of products in d cart
        //new set () -this will removes the duplicates 
        cart = Array.from(new Set(cart.map( (p,i) => (p._id) ))).map(id => 
        {
            return cart.find(p._id === id)
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
}
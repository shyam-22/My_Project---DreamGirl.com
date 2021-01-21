# My_Project---DreamGirl.com
Now moving further ....we have to start working in the  user dashboard
so in this ecommerce website there will be two types of user
--->one will be admin,,,,who will be creating products,checking orders and all that stuff(Admin stuff)
--->second will be user,,,who will just login,signup,purchase

"so we need to work on the dashboard and it has to to be pretty flexible bcoz it will be used both[admin and user]"
1)user-->user.js


# Backend 

express connection
port connection
db connection

make 5 folder as ---> Routes.....Schema_Model.....Controllers....validators......Db_Error_messages
Routes
auth--->signUp,signIN,signOut,requireSignin

user--->UserById [ auth - bearer paste ur token here, contentType - ApplicationJson]
here we will create 2 types of middleware....One for Admin....second for authenticated user
---->certain Routes for authenticated user
---->Certain routes for Admin

category--->category Both r same process
    Category --->Create,read,update,delete,list

Product---->Product Both r same process
    Product --->Create,read,update,delete,list
    returning the Product --->by sell, By Arrival,Asce/Desc Order,createdAt 
    returning relateed Product --->
                            
Products with certain Limit with like a 10/50/100 how many products u want to respond on each request


Al'right......I will see u in the next lecture....Thank you 

At the moment it looks fine.....but later to get a bit messy again


# All Install packages are list down here

cmd>npm i

uuidv1
bodyParser
cookieParser
morgan
express-validator
mongoose
express-jwt isonwebtoken

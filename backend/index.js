const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// app.use(http());

const db = mysql.createConnection({
  user: "root",
  host: "giftify.cs0gg5mbtn2b.ap-south-1.rds.amazonaws.com",
  password: "Shivam114",
  database: "giftyfy",
  multipleStatements: true
});


app.post("/getProduct", (req, res) => {
    db.query("select * from product_detail ;", (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(102).send(new Error(err.sqlMessage));
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });

  app.post('/form', function(req, res) {
    console.log(req.body);
    var Email=req.body.email;
    var name=req.body.name;
    var colors=req.body.colors;
    var addons=req.body.addons;
    var product_id=req.body.product_id;
    var total_price=req.body.total_price;
    var mobile_no=req.body.mobile_no;
    var address=req.body.address;
    var Name_on_Gift=req.body.Name_on_Gift;
    var types=req.body.types;
    var special_product=req.body.special_product;
    var success=false;
    db.query("select email from user_detail where email= ? ;",[Email] ,(err, result) => {
      if (err) {
        console.log("ERROR : ");
        console.log(err.sqlMessage);
        res.status(102).send(new Error(err.sqlMessage));
      } else {
        if(result[0]!=null){
          console.log("old user");
          db.query(`update user_detail set name=?,mobile=?,address=? where email=?;
          insert into order_detail (product_id,email,colors,addons,Total_price,types,special_product,name_on_gift) values (?,?,?,?,?,?);`
          ,[name,mobile_no,address,Email,product_id,Email,colors,addons,total_price,types,special_product,Name_on_Gift] ,(err, result) => {
            if (err) {
              console.log(err.sqlMessage);
              res.status(102).send(new Error(err.sqlMessage));
            } else {
              console.log("sucess");
              // res.redirect("http://127.0.0.1:5500/frontend/index.html");
              success=true;
              res.send("success");
            }
          });
        }
        else{
          console.log("new user");
          db.query(`insert into user_detail (name,email,mobile,address) values (?,?,?,?);
          insert into order_detail (product_id,email,colors,addons,Total_price,types,special_product,name_on_gift) values (?,?,?,?,?,?,?,?);`
          
          ,[name,Email,mobile_no,address,product_id,Email,colors,addons,total_price,types,special_product,Name_on_Gift] ,(err, result) => {
            if (err) {
              console.log(err.sqlMessage);
              res.status(102).send(new Error(err.sqlMessage));
            } else {
              console.log("sucess");
              success=true;
              res.send("success");
            }
          });
        }
      }
     
    });


});

 


  app.post("/getProductDetail", (req, res) => {
    var product_id=req.body.Product_id;
    console.log(req.body);
    db.query("select * from product_detail where product_id= ? ;",[product_id] ,(err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(102).send(new Error(err.sqlMessage));
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });

  // function update_tale(req ,res){
  //   var Email=req.body.email;
  //   var name=req.body.name;
  //   var colors=req.body.colors;
  //   var addons=req.body.addons;
  //   var product_id=req.body.product_id;
  //   var total_price=req.body.total_price;
  //   var mobile_no=req.body.mobile_no;
  //   var address=req.body.address;
  //   var Name_on_Gift=req.body.Name_on_Gift;
    
  // }


  app.listen(3001, () => {
    console.log("started successfully");
  });


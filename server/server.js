const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const fs = require("fs");
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.get("/api/products",(req,res)=>{
    
    // Read products_list.json file
    fs.readFile("products_list.json", function(err, data) {
       // Check for errors
       if (err) throw err;
   
       // Converting to JSON
       const products = JSON.parse(data);
       // Print products list
       console.log(products);  
       res.json(products);
});
});

app.post("/api/products", (req,res)=>{
   
    // STEP 1: Reading JSON file
    const purchased_products = require("./purchased_products_list.json");

    let product = req.body;
    console.log("product =>",product, purchased_products, purchased_products.length);

      purchased_products.push(product);
   
    fs.writeFile("purchased_products_list.json",JSON.stringify(purchased_products), err => {
     
        // Checking for errors
        if (err) throw err; 
   
        console.log("Done writing"); // Success
     }); 
     res.sendStatus(201); 
});

app.listen(PORT, ()=>{
   console.log(`Server started on Port Number: ${PORT}`);
});




   

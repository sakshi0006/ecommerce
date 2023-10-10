"use client"
import React, {useEffect,  useState} from 'react';

import ProductPage from '../product/page';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ProductProps } from '../constants/productType';
import { Button } from '@mui/material';


export default function HomePage(){
        const [productData, setProductData] = useState([]);
        const [searchedProductData, setsearchedProductData] = useState([]);

        const getProductsData = async () => {
           
           try{
            const response = await axios.get("http://localhost:8080/api/products");
            setProductData(response.data.products);
            console.log(response);
            toast.success("Products Fetched Successfully!");
           }catch(err){
               console.log("err:",err);
               toast.error("Encountered an error while fetching your products data!");
           }

        }

        const searchMyProduct = (name : string) => {
             const searchedProducts = productData.filter((item : ProductProps)=> 
                                item.productName.toLowerCase().startsWith(name.toLowerCase()));
                setsearchedProductData(searchedProducts);
        }

        useEffect(()=>{
            getProductsData();
        },[]);



    return <div className="flex-row">
        <TextField
                placeholder="Search..."
                size="small"
                id="filled-basic"
                variant="filled"
                hiddenLabel
                onChange={(event) =>{
                    searchMyProduct(event.target.value);
                }}
                className="bg-white ml-80 mt-20 mb-12 w-96 h-10"
        />
        {/* <a
            href="purchased_products_list.json"
            download="Products-Purchased-JSON-File"
            target="_blank"
            >
            <Button  size="medium" variant="contained"
             className="bg-black hover:bg-rose-600 hover:text-black hover:font-bold w-80 mb-2 ml-5 mt-2"
            >Download Purchased Products</Button>
        </a> */}
        <Typography component="div" display="flex" flexDirection="row" flexWrap="wrap">
        {  
          searchedProductData.length===0 ? productData.map((data: ProductProps) => {
               return <ProductPage 
                        {...data}
                        key={data.id}
                       />
            }) : searchedProductData.map((data: ProductProps) => {
                return <ProductPage 
                         {...data}
                         key={data.id}
                        />
             }) 
        }
        </Typography>
        

    </div> 
}
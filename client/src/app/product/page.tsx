"use client"
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { ProductProps } from '../constants/productType';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function ProductPage(props : ProductProps) {
     const {productName,productImage, averageRating, price} = props;

        const purchaseProduct = async (data : ProductProps) => {
           
           try{
            const response = await axios.post("http://localhost:8080/api/products", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log("response ",response);
            toast.success(`${data.productName} Purchased Successfully!`);
           }catch(err){
               console.log("err ",err);
               toast.error("Encountered an error while purchasing this product!");
           }
        }
     

     
    return  <Card sx={{height : "13rem", width : "21rem", margin: "0.5rem 0.5rem 0.5rem 0.5rem"}}>
                <CardContent>

                    <Typography component="div" display="flex" flexDirection="row">
                            <CardMedia
                                      style={{ "height":"5rem", "width":"5rem", "borderRadius": "15%",
                                       "margin": "2rem 4rem 0rem 1.2rem"}}
                                      component="img"
                                      //image="https://demo.sirv.com/chair.jpg"
                                      image={productImage}
                                      alt="logo"
                            />
                            <Typography component="div">
                                            <Typography component="div" display="flex">
                                                    <Typography  align='left' gutterBottom variant="h5" component="div" marginBottom="1rem"
                                                            sx={{ fontWeight: 'bold' , color: "firebrick", fontSize: 20}}>
                                                            {productName}
                                                    </Typography>
                                            </Typography>

                                            <Typography component="div" display="flex" flexDirection="column">    
                                            <Typography component="div" display="flex" flexDirection="row">    
                                            <Typography sx={{ fontWeight: 'bold' , fontSize: 14}}> Average Rating :</Typography> 
                                            <Typography sx={{ fontSize: 14, marginLeft: "0.5rem"}}> {averageRating} </Typography>             
                                            </Typography>   
                                            <Typography component="div" display="flex" flexDirection="row">    
                                            <Typography sx={{ fontWeight: 'bold' , fontSize: 14}}> Price :  </Typography> 
                                            <Typography sx={{ fontSize: 14, marginLeft: "0.5rem"}}> Rs. {price} </Typography>             
                                            </Typography>         
                                            </Typography>
                           
                                            <CardActions>
                                                        <Typography component="div" display="flex" flexDirection="column">
                                                                <Typography gutterBottom variant="h5"
                                                                            sx={{fontSize: 11, color: "grey" }}>
                                                                        By clicking on Purchase button, I agree to 
                                                                    <span className="text-blue-700"> buy </span> 
                                                                        the
                                                                    <span className="text-blue-700"> Product.</span>
                                                                </Typography>
                                                                <Button 
                                                                    size="medium"
                                                                    variant="contained"
                                                                    onClick={()=>{
                                                                        purchaseProduct(props);
                                                                    }}
                                                                    className="bg-black hover:bg-rose-600 hover:text-black hover:font-bold w-36 mb-2 mt-2"
                                                                >Purchase</Button>
                                                        </Typography>
                                            </CardActions>
                            </Typography>
                    </Typography>
                </CardContent>
           </Card>
  
}
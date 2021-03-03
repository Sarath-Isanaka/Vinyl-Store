import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { getmeToken, processPayment } from './helper/paymentbHelper'
import {createOrder} from "./helper/OrderHelper"
import { isAuthenticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react"
import { PayPalButton } from "react-paypal-button-v2";


const Paymentb = ({products, setReload = f => f, reload=undefined}) => {

    const [info, setInfo] = useState({
        loading : false,
        success : false,
        clientToken : null,
        error : "",
        instance : {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    const getToken = (userId, token) =>{
        getmeToken(userId, token).then(info=>{
            console.log(`INFORMATION ${info}`)
            if(info.error){
                setInfo({...info, error : info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    // const showbtdropIn = () => {
    //     return(
    //         <div>
    //             {info.clientToken !==null && products.length>0 ? (
    //                 <div>
    //                 <DropIn
    //                   options={{ authorization: info.clientToken }}
    //                   onInstance={(instance) => (info.instance = instance)}
    //                 />
    //                 <button onClick={()=>{}}>Buy</button>
    //               </div>
    //             ) : (<h3>Please login</h3>)}
    //         </div>
    //     )
    // }

    const onPurchase = ()=>{
        console.log("Hi");
    }
    const showbtdropIn = () => {
        return (
          <div>
            {info.clientToken !== null && products.length > 0 ? (
              <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={instance => (info.instance = instance)}
                />
                <button className="btn btn-block btn-success" onClick={onPurchase}>
                  Buy
                </button>
              </div>
            ) : (
              <h3>Please login or add something to cart</h3>
            )}
          </div>
        );
      };


    useEffect(() => {
        getToken(userId,token)
    }, [])

    return (
        <div>
            <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={instance => (info.instance = instance)}
                />

            <PayPalButton 
                amount="0.01"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  alert("Hi")}} 
                />   
            {showbtdropIn}
        </div>
    )
}

export default Paymentb

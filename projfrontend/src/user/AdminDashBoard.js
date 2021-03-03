import React from 'react'
import {Link} from "react-router-dom"
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper"

const AdminDashBoard = ()=> {
    const { user :{name, email, role}} = isAuthenticated();

    const adminLeftSide = ()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>     
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/create/category">
                            Create Categories
                        </Link>
                    </li>   
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/categories">
                            Manage Categories
                        </Link>
                    </li>  
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/create/product">
                            Create Products
                        </Link>
                    </li>   
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/products">
                            Manage Products
                        </Link>
                    </li>   
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/orders">
                            Manage Orders
                        </Link>
                    </li>   
                    <li className="list-group-item">
                        <Link className="nav-link text-success"to="/admin/orders">
                            Manage Orders
                        </Link>
                    </li>   
                </ul> 
            </div>
        )
    }

    const adminRightSide = ()=>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                       <h6> Name :<span style = {{color : "green"}}> {name}</span> </h6>
                       
                    </li>
                    <li className="list-group-item">
                         <h6>Email :<span style = {{color : "green"}}> {email} </span> </h6>
                    </li>
                    
                </ul>
            </div>
        )
    }

    return (
        <Base 
            title="Welcome to Admin Area" 
            description= "Manage all of your products here"
            className= "container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                  {adminLeftSide()}
                </div>
                <div className="col-9">
                   {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}


export default AdminDashBoard;

import React, {useState} from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {createCategory} from "./helper/adminapicall"

const AddCategory = ()=>{

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccesss] = useState(false);

    const {user, token} = isAuthenticated();

    const myCategoryForm = ()=>(
        <form>
            <div className="form-group">
                <p className="lead mt-4">Enter the Category</p>
                <input 
                type="text" 
                className="form-control my-3"
                onChange = {handleChange}
                value = {name}
                autoFocus
                required
                placeholder="Classics"
                />
                <button onClick = {onSubmit} className="btn btn-outline-info mb-2">Create Category</button>
            </div>
        </form>
    )

    const successMessage = ()=>{
        if(success){
            return <h4 className="text-success">Category Created successfully</h4>
        }
    }

    const warningMessage = ()=>{
        if(error){
            return <h4 className="text-success">Failed to create Category</h4>
        }
    }
    const goBack = ()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event)=>{
        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccesss("false");
        
        createCategory(user._id, token, {name})
            .then(data=>{
                if(data.error){
                    setError(true)
                }else{
                    setError("")
                    setSuccesss(true)
                    setName("")
                }
            })
    }

    return (
        <Base className = "container bg-info p-4" title = "Create Category" description = "Add a Category for new Vinyls">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()} {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory

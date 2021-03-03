import React, {useState, useEffect} from 'react'
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import Base from '../core/Base'
import {updateProduct, getCategories, getProduct, getCategory, updateCategory } from './helper/adminapicall'
import {isAuthenticated} from "../auth/helper/index" 
import { findByPlaceholderText, render } from '@testing-library/react'


const UpdateCategory = ({match})=>{

    const {user, token} = isAuthenticated();

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccesss] = useState(false);


      const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setName(data.name);
          }          
        });
      };

      useEffect(() => {
        preload(match.params.categoryId);
      }, []);

      const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccesss("false");
        
        updateCategory(match.params.categoryId, user._id, token, {name})
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

      const handleChange = (event)=>{
        setError("");
        setName(event.target.value)
    }

    const successMessage = () => (
          <div
          className="alert alert-success mt-3"
          style={{ display: success ? "" : "none" }}
        >
          <h4> Updated successfully</h4>
        </div>
      )
      

    const warningMessage = ()=>{
      if(error){
        return <h4 className="alert alert-success mt-3">{error}</h4>
      }
    }


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
                <button onClick = {onSubmit} className="btn btn-outline-info mb-2">Update Category</button>
            </div>
        </form>
    )

    return (
        <Base title ="Add a product here" description="Welcome to product creation section" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin home</Link>
            <div className="row bg-dark rounded text-white">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}{warningMessage()}
                    {myCategoryForm()} 
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;

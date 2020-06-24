import React, { useState, useEffect, useCallback} from 'react';
import './../App.css';
import {Select} from 'antd'
import {Formik} from 'formik';
import {
  BrowserRouter as Router,
  useHistory,
  NavLink
} from "react-router-dom"


function AuthHeader() {
  const {Option} = Select
  const history = useHistory()

  interface Input{
    latitude: number 
    longitude: number
  }

  
  interface MyFormValues {
    searchQuery: string
    radius: number 
    latitude: number | null
    longitude: number | null,
    searchType: string
  }
  
  interface ErrorObject{
    searchQuery: string
  }


  const [searchInput, setSearchInput] = useState<Input>({
    latitude: 0,
    longitude: 0
  })

  const initialValues: MyFormValues = {  
    searchQuery: '',
    radius: 50000,
    latitude: 0,
    longitude: 0,
    searchType: ''
    
  }
 
  const validation= (value: MyFormValues): ErrorObject =>{
    const error = {} as ErrorObject
    if(!value.searchQuery){
      error.searchQuery = 'Search input is required'
    }
    return error
  }

  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setSearchInput({latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
    
  }, [])

  return (
    <div className="App">
      <div className='header-wrapper'>
          <div className='header-search'>
          <div className='text-wrapper'>
          <p className='header-main-text'>Find nearest hospital around you</p>
          <p className='header-sec-text'>Emergency situation requires quick findings</p>
          </div>
          <div className='input-wrapper'>
          
          <Formik
            validate={validation}


            initialValues={initialValues}


            onSubmit={(values, actions) => {
              history.push({
                pathname: '/',
                state: { 
                  searchQuery: values.searchQuery, 
                  radius: values.radius,
                  latitude: searchInput.latitude, 
                  longitude: searchInput.longitude ,
                  searchType: values.searchType
                }
              })
              actions.setSubmitting(false);
            }}


          render={ ({ handleChange,handleSubmit, touched, values, errors, setFieldValue })=> (

              <form className='form-control' onSubmit={handleSubmit}>

                <div className='search-container'>

                <input type='text' name='searchQuery' className='search-input' id='searchQuery' onChange={handleChange}/>

                <input type="submit" value="Submit" className='submit'/>

                </div>

                <div className='error'>

                  {touched.searchQuery && errors.searchQuery ? (
                      errors.searchQuery
                      ): null}
                </div>

                <Select
                  style={{ width: 200, marginRight: 9}}
                  placeholder="Choose a radius"
                  onChange={(value)=> setFieldValue('radius', value)}
                  className='select'
                >

                  <Option value={10000} >10km</Option>
                  <Option value={20000}>20km</Option>
                  <Option value={30000}>30km</Option>
                  <Option value={50000}>50km</Option>

                </Select>


                <Select placeholder='Search Type' style={{ width: 120 }} allowClear onChange={(value)=> setFieldValue('searchType', value)}>
                    <Option value="hospital">Hospitals</Option>
                    <Option value="pharmacy">Pharmacies</Option>
                    <Option value="hospital1">Clinics</Option>
                    <Option value="hospital2">Medical Offices</Option>
                </Select>
              </form>

          )}
        />
       
        </div>
        </div>
      </div>



    </div>
  );
}

export default AuthHeader
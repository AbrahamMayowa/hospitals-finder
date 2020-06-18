import React, { useState, useEffect} from 'react';
import './App.css';
import {Select} from 'antd'
import{Loading} from './components/Loading'
import {NoSearch} from './components/NoSearch'
import {HospitalList} from './components/HospitalList'
import {Formik} from 'formik';
import { format } from 'path';


function App() {
  const {Option} = Select


  interface Hospitals{
    hospitals: any[] | undefined
    error: object | undefined
    loading: boolean
    success: boolean 
  }

  interface Input{
    latitude: number | undefined
    longitude: number | undefined
  }

  interface ErrorCode{
    code: number
  }
  
  interface CooordObject{ 
    longitude: number
    latitude: number
  }
  
  interface Coords{
    coords: CooordObject
  }


 
  interface ResultObject{
    results: object[]
  }

  interface HospitalsObject{
    data: ResultObject
  }

  interface MyFormValues {
    searchQuery: string 
    radius: number 
    latitude: number | null
    longitude: number | null
  }
  
  interface ErrorObject{
    searchQuery: string
    searchType: string
  }


  




  const [locationData, setLocationData] = useState<Hospitals | null>(null)
  const [searchInput, setSearchInput] = useState<Input | null>(null)

  const initialValues: MyFormValues = {  
    searchQuery: '',
    radius: 50000,
    latitude: null,
    longitude: null,
  }
 
  const validation= (value: MyFormValues): ErrorObject =>{
    const error = {} as ErrorObject
    if(!value.searchQuery){
      error.searchQuery = 'Search input is required'
    }
    return error
  }

  const handleDispatch= async (searchQuery: string, radius: number)=>{
 
      
      setLocationData({
        hospitals: locationData?.hospitals,
        error: locationData?.error,
        loading: true,
        success: false

      })
      try{
      const response = await fetch('https://damp-tor-85117.herokuapp.com',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          querySearch: searchQuery,
          geoFence: radius,
          latitude: searchInput?.latitude,
          longitude: searchInput?.latitude,
        })
      })
      if(!response.ok){
        throw new Error('Server error')
      }
      const resData: HospitalsObject = await response.json()
      setLocationData({hospitals: resData.data.results, error: undefined, loading: false, success:true})
      }catch(error){
        setLocationData({
          hospitals: locationData?.hospitals,
          error: error,
          loading: false,
          success: false
        })
      }
  }


  const handleGeoPermission=()=>{
    navigator.geolocation.getCurrentPosition(
      displayLocationInfo,
    );
  }


  const displayLocationInfo=(position: Coords)=>{
    const lng = position.coords.longitude
    const lat = position.coords.latitude
    setSearchInput({
      latitude: lat, 
      longitude: lng,
    })

  }


  useEffect(()=>{
    handleGeoPermission()
  }, [])


  let conditionalElement: any;
  if(!locationData?.success && !locationData?.loading){
    conditionalElement = <NoSearch />
  }else if(locationData.loading){
    conditionalElement = <Loading />
  }else{
    conditionalElement = <HospitalList hospitals={locationData.hospitals}/>
  }


  return (
    <div className="App">
     
      <div className='header-wrapper'>
        <div className='header-container'>
        <div className='website-name'>
          HospitalFinder
        </div>
        <div className='text-wrapper'>
        <p className='header-main-text'>Find nearest hospital around you</p>
        <p className='header-sec-text'>Emergency situation requires quick findings</p>
        </div>
        <div className='input-wrapper'>
        

        <Formik
        validate={validation}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          handleDispatch(values.searchQuery, values.radius)
          actions.setSubmitting(false);
        }}
        render={ ({ handleChange, handleBlur, handleSubmit, touched, values, errors, setFieldValue })=> (
            <form className='form-control' onSubmit={handleSubmit}>
              <div className='search-wrapper'>
              <input type='text' name='searchQuery' className='search-input' id='searchQuery' onChange={handleChange}/>
              <input type="submit" value="Submit" className='submit'/>
              </div>
              <div className='error'>
              {touched.searchQuery && errors.searchQuery ? (
                   errors.searchQuery
                  ): null}
              </div>
              <Select
              style={{ width: 200 }}
              placeholder="Choose a radius"
              onChange={(value)=> setFieldValue('radius', value)}
              className='select'
              >
                <Option value={10000} >10km</Option>
                <Option value={20000}>20km</Option>
                <Option value={30000}>30km</Option>
                <Option value={50000}>50km</Option>
              </Select>
            </form>

        )}
        />
       
       
          
        </div>
        </div>
      </div>
      {conditionalElement}

    </div>
  );
}

export default App;

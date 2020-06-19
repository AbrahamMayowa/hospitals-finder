import React, { useState, useEffect} from 'react';
import '../App.css';
import {Select} from 'antd'
import{Loading} from '../components/Loading'
import {NoSearch} from '../components/NoSearch'
import {HospitalList} from '../components/HospitalList'
import {Formik} from 'formik';
import { format } from 'path';
import {
  useParams,
  useLocation,
  useHistory,
  Link,
} from "react-router-dom";


function Search() {

  interface LocationObject{
    searchQuery: string 
    radius: number
    latitude: number
    longitude: number
    redirect: boolean
  }
  const {Option} = Select
  const location = useLocation() 
  const history = useHistory()
  const state = location.state as LocationObject

  interface Hospitals{
    hospitals: any[] 
    error: object 
    loading: boolean
    success: boolean 
  }


  interface ResultObject{
    results: object[]
  }

  interface HospitalsObject{
    data: ResultObject
  }


  const [locationData, setLocationData] = useState<Hospitals>({
    hospitals: [], 
    error: {},
    loading: false,
    success: false
  })

  const handleDispatch= async (searchQuery: string, radius: number, latitude: number, longitude: number)=>{
 
      
      setLocationData({
        ...locationData,
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
           latitude: latitude,
          longitude: latitude,
        })
      })
      if(!response.ok){
        throw new Error('Server error')
      }
      const resData: HospitalsObject = await response.json()
      console.log(resData)
      setLocationData({hospitals: resData.data.results, error: {}, loading: false, success:true})
      }catch(error){
        setLocationData({
          hospitals: locationData.hospitals,
          error: error,
          loading: false,
          success: false
        })
      }
  }






  useEffect(()=>{
    if(state?.searchQuery){
      handleDispatch(state.searchQuery, state.radius, state.latitude, state.longitude)
    }
    history.replace('/')
  }, [state?.searchQuery])


  let conditionalElement: any;
  if(!locationData.success && !locationData.loading){
    conditionalElement = <NoSearch />
  }else if(locationData.loading){
    conditionalElement = <Loading />
  }else{
    conditionalElement = <HospitalList hospitals={locationData.hospitals}/>
  }


  return (
    <div>
      {conditionalElement}
    </div>
      
  )
}

export default Search;

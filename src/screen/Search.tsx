import React, { useState, useEffect} from 'react';
import {Select} from 'antd'
import{Loading} from '../components/Loading'
import {NoSearch} from '../components/NoSearch'
import {HospitalList} from '../components/HospitalList'
import FormHeader from '../components/FormHeader'

import {
  useLocation,
  useHistory,
} from "react-router-dom";


function Search({isAuth, token}:any) {

  interface LocationObject{
    searchQuery: string 
    radius: number
    latitude: number
    longitude: number
    redirect: boolean
    searchType: string
  }
  const {Option} = Select
  const location = useLocation() 
  const history = useHistory()
  const state = location.state as LocationObject

  interface Hospitals{
    hospitals: any[] | any
    error: object 
    loading: boolean
    success: boolean 
  }


  interface ResultObject{
    getSearch: object[]
  }

  interface HospitalsObject{
    data: ResultObject
    errors: any
  }

  


  const [locationData, setLocationData] = useState<Hospitals>({
    hospitals: [], 
    error: {},
    loading: false,
    success: false
  })

  const handleDispatch= async (searchQuery: string, radius: number, latitude: number, longitude: number, searchType: string)=>{
 
      setLocationData({
        ...locationData,
        loading: true,
        success: false

      })
      try{
        const graphqlQuery = {
          query: `
          mutation search($searchQuery: String!, $geoFence: Int!, $latitude: Float!, $longitude: Float!, $searchType: String){
            getSearch(searchInput: {querySearch: $searchQuery, geoFence: $geoFence, latitude: $latitude, longitude: $longitude, searchType: $searchType}){
                  formatted_address
                  name
                  user_rating_total
              }
          }
          `,

          variables: {
              searchQuery,
              geoFence: radius,
              latitude,
              longitude,
              searchType
          }

      }
      const response = await fetch('https://oluwasina-finder.herokuapp.com/graphql',{

        method: 'POST',

        headers:{
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
      },

        body: JSON.stringify(graphqlQuery)

      }) 
      const resData: HospitalsObject = await response.json()
console.log(resData)
      if(resData.errors){
        console.log(resData)
        // return zero results
        setLocationData({hospitals: [], error: {}, loading: false, success:true})

      }else{
        console.log(resData)
        setLocationData({hospitals: resData.data.getSearch, error: {}, loading: false, success:true})
      }
   
    
      }catch(error){
        console.log(error)
        setLocationData({
          hospitals: [],
          error: error.message,
          loading: false,
          success: false
        })
      }
  }




  useEffect(()=>{
    if(state?.searchQuery){
      handleDispatch(state.searchQuery, state.radius, state.latitude, state.longitude, state.searchType)
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
      <FormHeader />
      {conditionalElement}
    </div>
      
  )
}

export default Search;

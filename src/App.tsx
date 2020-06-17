import React, { useState, useEffect} from 'react';
import './App.css';
import {Select} from 'antd'
import{Loading} from './components/Loading'
import {NoSearch} from './components/NoSearch'
import {HospitalList} from './components/HospitalList'


function App() {
  const {Option} = Select


  interface Hospitals{
    hospitals: any[] | undefined
    error: object | undefined
    loading: boolean
    success: boolean 
  }

  interface Input{
    searchQuery: string | undefined
    radius: number | undefined
    latitude: number | undefined
    longitude: number | undefined
    error: string | undefined
  

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

  interface Notv{
    target: any
  }

 
  interface ResultObject{
    results: object[]
  }

  interface HospitalsObject{
    data: ResultObject
  }

 

  const [locationData, setLocationData] = useState<Hospitals | null>(null)
  const [searchInput, setSearchInput] = useState<Input | null>(null)

  const handleDispatch= async ()=>{
    if(typeof searchInput?.searchQuery === 'string'){
      setSearchInput({
        searchQuery: searchInput?.searchQuery, 
        radius: searchInput?.radius, 
        latitude: searchInput?.latitude, 
        longitude: searchInput?.longitude,
        error: undefined
      })
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
          querySearch: searchInput?.searchQuery,
          geoFence: searchInput?.radius,
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
    }else{
      setSearchInput({
        searchQuery: searchInput?.searchQuery, 
        radius: searchInput?.radius, 
        latitude: searchInput?.latitude, 
        longitude: searchInput?.longitude,
        error: 'Search input is empty'
      })
    }
  }


  const handleGeoPermission=()=>{
    navigator.geolocation.getCurrentPosition(
      displayLocationInfo,
      handleLocationError,
      { timeout: 5000 }
    );
  }
  const displayLocationInfo=(position: Coords)=>{
    const lng = position.coords.longitude
    const lat = position.coords.latitude

    setSearchInput({
      searchQuery: searchInput?.searchQuery, 
      radius: searchInput?.radius, 
      latitude: lat, 
      longitude: lng,
      error: ''
    })

  }

  const handleLocationError=(error: ErrorCode)=>{
    setSearchInput({
      searchQuery: searchInput?.searchQuery, 
      radius: searchInput?.radius, 
      latitude: searchInput?.latitude, 
      longitude: searchInput?.longitude,
      error: 'Permission to get your location denied. Location finder cannot without knowing your location'
    })
    
  }


  const handleSelectChange=(value: number)=>{
    setSearchInput({
      searchQuery: searchInput?.searchQuery,
      radius: value,
      latitude: searchInput?.latitude, 
      longitude: searchInput?.longitude,
      error: searchInput?.error
    })
  }

 
  const handleSearchQuery=(value: Notv )=>{
  
        setSearchInput({
          searchQuery: value.target.value, 
          radius: searchInput?.radius, 
          latitude: searchInput?.latitude, 
          longitude: searchInput?.longitude,
          error: searchInput?.error
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
        <div className='website-name'>
          HospitalFinder
        </div>
        <div className='text-wrapper'>
        <p className='header-main-text'>Find nearest hospital around you</p>
        <p className='header-sec-text'>Emergency situation require quick findings</p>
        </div>
        <div className='input-wrapper'>
        <div className='search-wrapper'>
          <input
          type='text'
          name='search'
          id='search'
          onChange={handleSearchQuery}
          placeholder='Search hospitals'
          className='search-input'
          />
          <div onClick={handleDispatch} className='submit'><span className='search-button'>Search</span></div>
        </div>
        {searchInput?.error && <div className='error'>Search input is empty</div>}
        <Select
        style={{ width: 200 }}
        placeholder="Choose a radius"
        onChange={handleSelectChange}
        className='select'
        >
        <Option value={10000} >10km</Option>
        <Option value={20000}>20km</Option>
        <Option value={30000}>30km</Option>
        <Option value={50000}>50km</Option>
        </Select>
          
        </div>
      </div>
      {conditionalElement}

    </div>
  );
}

export default App;

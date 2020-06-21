import React , { useState, useEffect} from 'react'
import {Loading} from '../components/Loading'
import { Card } from 'antd';
import '../styles/activities.css'
import moment from 'moment'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
    NavLink
  } from "react-router-dom";

interface ActivityHistory{
    history: any[]
    loading: boolean
    error: string
}
const Activities =()=>{
    const history = useHistory()
    const [activities, setActivities] = useState<ActivityHistory>({
       history:[],
       loading: false,
       error: ''
      })
    
    const dispatchHistory= async()=>{
        setActivities({
            ...activities,
            loading: true
        })
        try{
        const response = await fetch('https://damp-tor-85117.herokuapp.com/search-history',{
            method: 'GET'
        })
        if(!response.ok){
            throw new Error('Server error')
        }
        const resData = await response.json()
        setActivities({
            ...activities,
            loading: false,
            history: resData.history
        })
        }catch(error){
            setActivities({
                ...activities,
                error: error.message
            })
        }
    }

    useEffect(()=>{
        dispatchHistory()
    }, [])
    if(activities.loading){
        return <Loading />
    }

    
    return (
        <div className='activities-container'>
            <div className='items'>
                {activities.history.map(item=>{
    
                        return(
                            <div className='card' onClick={()=>{
                                history.push({
                                    pathname: '/',
                                    state: {
                                      searchQuery: item.querySearch,
                                      radius: item.geoFence,
                                      latitude: item.latitude,
                                      longitude: item.longitude 
                                    }
                                  })
                            }}>
                            <Card title={item.querySearch} bordered={false} style={{height: 200}}>
                            <div className='location'>
                                <div className='location-position'>
                                    <i className="fas fa-map-marker-alt location-icon"></i>
                                    <span>Latitude: {item.latitude.toFixed(3)}</span>
                                    </div>

                                <div className='location-position'>
                                <i className="fas fa-map-marker-alt location-icon"></i>
                                    Longitude: {item.longitude.toFixed(3)}
                                </div>
                            </div>
                            </Card>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default Activities
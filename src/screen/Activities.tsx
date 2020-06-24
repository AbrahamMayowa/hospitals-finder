import React , { useState, useEffect} from 'react'
import {Loading} from '../components/Loading'
import { Card } from 'antd';
import '../styles/activities.css'
import moment from 'moment'
import {
    BrowserRouter as Router,
    useHistory,
} from "react-router-dom"
import FormHeader from '../components/FormHeader'
import {NoSearch} from '../components/NoSearch'






interface ActivityHistory{
    history: any[]
    loading: boolean
    error: string
}


const Activities =({isAuth, token}:any)=>{

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
            const graphqlQuery = {
                query: `
                query{
                  getHistory{
                        latitude
                        longitude
                        querySearch
                    }
                }
                `
            }

            const response = await fetch('https://damp-tor-85117.herokuapp.com/graphql',{

                method: 'POST',

                headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token
              },

                body: JSON.stringify(graphqlQuery)

              }) 
              const resData= await response.json()

              if(resData.errors){
                // return zero results
                setActivities({
                    ...activities,
                    loading: false,
                    history: []
                })
                
              }else{
                setActivities({
                    ...activities,
                    loading: false,
                    history:  resData.data.getHistory
                })
              }
        }catch(error){
            setActivities({
                ...activities,
                history:[],
                error: error.message
            })
        }
    }

    useEffect(()=>{
        dispatchHistory()
    }, [])

    return (
        <div>
            <FormHeader />
            
            {activities.loading && <Loading />}
            {activities.history.length <=0 && (!activities.loading) ? <NoSearch message="We do not have your search history."/> :
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
                                <Card title={item.querySearch} bordered={false} style={{height: 200, marginBottom: 15}}>
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
}
        </div>
    )
}

export default Activities
import React, { useState, useEffect } from 'react';
import {ScrollView,SafeAreaView,View, AsyncStorage,Text,Image,StyleSheet, Alert} from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList'
import api from '../services/api';
import logo from '../assets/logo.png'

export default function List(){
    const [techs,setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = socketio('http://192.168.4.17:3333',{
                query:{user_id}
            })

            socket.on('booking_response',booking=>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "APROVADA": "REJEITADA"}`)
            })
        })

    },[]);
    
    useEffect(()=>{
            const storagedTechs = AsyncStorage.getItem('techs').then(storagedTechs=>{
                const techsArrays = storagedTechs.split(',').map(tech=>tech.trim());
                setTechs(techsArrays);
            }) 
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain"/>
            <ScrollView>
                {techs.map((tech,index)=><SpotList key={index} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    logo:{
        height: 32,
        alignSelf: 'center',
        marginTop: 30
    }
})
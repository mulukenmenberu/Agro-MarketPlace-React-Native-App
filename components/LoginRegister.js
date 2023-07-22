import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Register from './Register'
import Login from './Login'
const LoginRegister = ({route, navigation}) => {
    const [page, setPage] = useState(route.params?.page || 'login');
    const chnagePage = (value) => {
        setPage(value);
      }
    if(page=="login") return <Login navigation={navigation}  chnagePage={chnagePage}/>
    else if(page=="register")return<Register navigation={navigation} chnagePage={chnagePage}/>

}

export default LoginRegister

const styles = StyleSheet.create({})
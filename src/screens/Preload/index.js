import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import BarberLogo from '../../assets/barber.svg';
//ContexAPi tipo Redux porem mais atualizado
export default () => {

    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token !== null){
                //Validar token
                navigation.navigate('SignUp');
            }else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);


    return (
        <Container>
            <BarberLogo width="40%" height="40%" /> 
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}
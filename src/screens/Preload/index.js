import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
//ContexAPi tipo Redux porem mais atualizado
export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token !== null){
                //Validar token
                let res = await Api.checkToken(token);

                if(res.token){
                    //Salva no AsyncStorage
                    await AsyncStorage.setItem('token', res.token);
                    
                    //Salva no context
                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });

                } else {
                    navigation.navigate('SignIn');
                }
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
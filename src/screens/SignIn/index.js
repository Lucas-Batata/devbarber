import React, { useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

export default () => {

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            
            let json = await Api.signIn(emailField, passwordField);
            //console.log(json);

            if(json.token){
                alert("Deu certo!");
            }else {
                alert('Email e/ou senha incorretos!');
            }

        } else{
            alert("Preencha os campos!");
        }

    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }


    return (
        <Container>
            <BarberLogo width="100%" height="160" />            

            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu email"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha" 
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}
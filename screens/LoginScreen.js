import React from "react";
import { Image, StyleSheet, View, Alert, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        password: '',
    };

    _OnAcessButtonPress = async () => {        
        try {
            const loginInfos = await AsyncStorage.getItem('LOGIN_INFO');
            if (loginInfos === null) {
                try {
                    await AsyncStorage.setItem('LOGIN_INFO',`${this.state.name}|${this.state.password}`);
                    this.props.navigation.navigate('ToDoScreen');
                } catch (error) {
                    Alert.alert('Erro para salvar dados no local storage');
                }       
            } else {
                let credencials = loginInfos.split("|");
                if ((this.state.name == credencials[0]) && (this.state.password == credencials[1])) {
                    this.props.navigation.navigate('ToDoScreen');
                } else {
                    Alert.alert('Usuário ou senha estão incorretos');
                }              
            }
        } catch (error) {
            Alert.alert('Erro na obtenção de informações do local storage');
        }
    }

    render () {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
                </View>      
                <View style={styles.fieldsContainer}>
                    <TextInput
                        label='Nome de usuario'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        style={styles.inputTexts}
                    />
                    <TextInput
                        label='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={styles.inputTexts}
                        secureTextEntry={true}
                    />
                    <Button 
                        mode='contained'
                        onPress={this._OnAcessButtonPress}
                        style={styles.buttons}
                    >
                        Acessar To-Do-List
                    </Button>    
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,        
    },
    logoContainer: {
        flexGrow: 2,        
    },
    logo: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    fieldsContainer: {
        flexGrow: 1,
    },
    inputTexts: {
        marginTop: 10,    
    },
    buttons: {
        marginTop: 10,    
    }
});
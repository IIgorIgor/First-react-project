import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, FlatList, Alert } from 'react-native';
import { Button, TextInput, Appbar, FAB } from 'react-native-paper';
import FlatListItem from "../components/FlatListItem";
import DialogInput from 'react-native-dialog-input';

export default class ToDoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="To-Do-List do Igor" />
                </Appbar.Header>
            ),
             gesturesEnabled: false,
        }
    }

    constructor(props) {
        super(props);
    }

    state = {
        id: [],
        isDialogVisible: false,
    }

    _onCheckItem = (idIndex) => {
        let tasks = this.state.id;
        tasks = tasks.map(item => item.id === idIndex ? {...item, checked: !item.checked} : item);
        this.setState({ id: tasks });
        console.log(tasks);
    }

    _OnAddAtividade = (newToDo) => {
        let nLength = this.state.id.length;
        if (newToDo == '') {
            Alert.alert('É necessário digitar o nome da atividade');
        } else {
            this.setState({ id: [...this.state.id, { id: nLength, title: newToDo, checked: false }] });
        }
        console.log(this.state.id);
    }

    _OnDeleteItem = (idIndex) => {
        let tasks = this.state.id;
        tasks = tasks.filter(item => item.id != idIndex); 
        this.setState({ id: tasks });
        console.log(tasks);
    }

    _OnSubmitInput = (inputText) => {
        this._OnAddAtividade(inputText);
    }

    _OnManageDialog = (dialogState) => {
        this.setState({ isDialogVisible: dialogState });
    }
 
    render() {
        const flatList = this.state.id.length > 0 ?
            <FlatList
                data={this.state.id}
                renderItem={({ item }) =>
                    <FlatListItem listItem={item} onCheckItem={this._onCheckItem} onDeleteItem={this._OnDeleteItem}/>
                }
                keyExtractor={item => item.id.toString()}
            />
            :
            <Text>Não existe nenhuma atividade cadastrada</Text>
        
        const modalAtividades = 
            <DialogInput isDialogVisible={this.state.isDialogVisible}
                title={"Inclusão de To-Do"}
                message={"Informe a atividade"}
                hintInput ={"Atividade"}
                submitInput={(inputText) => {this._OnSubmitInput(inputText)}}
                closeDialog={() => {this._OnManageDialog(false)}}
            >
            </DialogInput>

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.flatListContainer}>
                    {flatList}
                    {modalAtividades}
                </View>                
                <FAB style={styles.fab}
                    icon="add"
                    onPress={() => {this._OnManageDialog(true)}}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
    },
    listItem: {
        backgroundColor: 'blue',
    },
    flatListContainer: {
        flex: 1,
        margin: 5,
    },
    insertContainer: {
        justifyContent: 'flex-end',
    },
    atividadeInput: {
        margin: 5,
    },
    atividadeButton: {
        margin: 5,
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
    },
});
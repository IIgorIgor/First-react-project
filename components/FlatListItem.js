import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, IconButton, Divider } from 'react-native-paper';

export default class FlatListItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerRow}>
                    <TouchableOpacity style={styles.containerTouch} onPress={() => this.props.onCheckItem(this.props.listItem.id)}> 
                        <Checkbox
                            style={styles.itemCheckBox}
                            status={this.props.listItem.checked ? 'checked' : 'unchecked'}
                        />
                        <Text style={styles.checkboxTitle}>{this.props.listItem.title}</Text>
                    </TouchableOpacity>  
                    <View style={styles.buttonContainer}>
                        <IconButton
                            icon="delete"
                            onPress={() => this.props.onDeleteItem(this.props.listItem.id)}
                        />    
                    </View>
                </View>
                <Divider />
            </View>
        );
    }
}   

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
    },
    containerRow: {
        flexDirection: 'row',
    },
    containerTouch: {
        flexDirection: 'row',
        flex: 1,
    },
    checkboxTitle: {
        marginLeft: 5,
        fontSize: 15,
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 10,
    },
    recordButton: {
        left: '50%',
        transform: [{ translateX: -30 }],
    },
    ctButton: {
        right: 20
    }
});
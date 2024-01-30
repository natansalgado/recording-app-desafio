import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Props } from './props';
import { styles } from './styles';
import { Camera, CameraType } from 'expo-camera';

export function CameraView({ cameraRef, isRecording, onRecord, onStopRecording, cameraType, changeCameraType }: Props) {
    return (
        <Camera style={styles.container} ref={cameraRef} type={cameraType} ratio='16:9'>
            <TouchableOpacity style={[styles.button, styles.recordButton]} onPress={isRecording ? onStopRecording : onRecord}>
                <MaterialCommunityIcons
                    name={isRecording ? 'square' : 'circle'}
                    size={60}
                    color='#f00'
                />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.ctButton]} onPress={changeCameraType}>
                <MaterialCommunityIcons
                    name='camera-flip'
                    size={60}
                    color='#fff'
                />
            </TouchableOpacity>
        </Camera>
    );
}
import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { Props } from './props';
import { styles } from './styles';

import { Video } from 'expo-av';

export function VideoPlayer({ video, onShare, onSave, onDiscard }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <Video style={styles.video} source={{ uri: video.uri }} useNativeControls isLooping shouldPlay >
            </Video>

            <View style={styles.menuButtons}>
                <TouchableOpacity onPress={onShare}>
                    <Feather name='share' size={40} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onSave}>
                    <Feather name='save' size={40} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDiscard}>
                    <Feather name='trash' size={40} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
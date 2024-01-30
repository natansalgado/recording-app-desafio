import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { VideoPlayer } from './src/components/VideoPlayer';
import { CameraView } from './src/components/CameraView';

import * as actions from './src/actions/App';

export default function App() {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrofonePermission, setHasMicrofonePermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

  const recordVideo = async () => {
    await actions.recordVideo(cameraRef, setIsRecording, setVideo);
  }

  const StopRecording = () => {
    actions.StopRecording(cameraRef, isRecording, setIsRecording)
  }

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microfonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status == "granted");
      setHasMicrofonePermission(microfonePermission.status == "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status == "granted");
    })();
  }, [])

  if (!hasCameraPermission || !hasMicrofonePermission) {
    return (
      <View style={styles.container}>
        <Text>Não tem permissão da câmera ou microfone!</Text>
      </View>
    )
  }

  if (!hasMediaLibraryPermission) {
    return (
      <View style={styles.container}>
        <Text>Não tem permissão a bibliotecas!</Text>
      </View>
    )
  }

  if (video) {
    const shareVideo = async () => {
      await shareAsync(video.uri);
    }

    const saveVideo = async () => {
      await MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined)
      })
    }

    return <VideoPlayer
      video={video}
      onShare={shareVideo}
      onSave={saveVideo}
      onDiscard={() => setVideo(undefined)}
    />
  }

  return (
    <View style={styles.container}>
      <CameraView
        cameraRef={cameraRef}
        isRecording={isRecording}
        onRecord={recordVideo}
        onStopRecording={StopRecording}
        cameraType={cameraType}
        changeCameraType={() => setCameraType(cameraType == CameraType.back ? CameraType.front : CameraType.back)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

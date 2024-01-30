import { CameraRecordingOptions } from "expo-camera";
import { Dispatch, SetStateAction } from "react";

export const recordVideo = async (
    cameraRef: any,
    setIsRecording: Dispatch<SetStateAction<boolean>>,
    setVideo: Dispatch<SetStateAction<any>>
) => {
    const options: CameraRecordingOptions = {
        quality: '1080p',
        maxDuration: 60,
        mute: false,
    };

    if (cameraRef && cameraRef.current) {
        setIsRecording(true);

        await cameraRef.current.recordAsync(options).then((recordedVideo: any) => {
            setVideo(recordedVideo);
            setIsRecording(false);
        });
    }
};

export const StopRecording = (cameraRef: any, isRecording: boolean, setIsRecording: Dispatch<SetStateAction<boolean>>) => {
    if (cameraRef && cameraRef.current && isRecording) {
        setIsRecording(false);
        cameraRef.current?.stopRecording();
    }
};
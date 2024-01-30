import { Camera, CameraType } from "expo-camera";
import { LegacyRef } from "react";

export interface Props {
    cameraRef: LegacyRef<Camera>;
    isRecording: boolean;
    onRecord: () => void;
    onStopRecording: () => void;
    cameraType: CameraType;
    changeCameraType: () => void;
}
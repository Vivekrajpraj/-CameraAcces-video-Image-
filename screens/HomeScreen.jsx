import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

function HomeScreen() {
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const timerRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [showvideocamera, setshowvideocamera] = useState(false);
  const [videopath, setVideopath] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    takePermission();
  }, []);

  const takePermission = async () => {
    const cam = await Camera.requestCameraPermission();
    const mic = await Camera.requestMicrophonePermission();
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePhoto();
    setImagePath(photo.path);
    setShowCamera(false);
  };

  const takevideo = () => {
    if (!cameraRef.current) return;

    setIsRecording(true);
    setRecordTime(0);

    timerRef.current = setInterval(() => {
      setRecordTime(prev => prev + 1);
    }, 1000);

    cameraRef.current.startRecording({
      onRecordingFinished: video => {
        clearInterval(timerRef.current);
        setIsRecording(false);
        setshowvideocamera(false);
        setVideopath(video.path);

        navigation.navigate('VideoScreen', {
          video: 'file://' + video.path,
        });
      },
      onRecordingError: error => {
        console.error(error);
        clearInterval(timerRef.current);
        setIsRecording(false);
      },
    });
  };

  const stopVideo = () => {
    if (!cameraRef.current) return;

    cameraRef.current.stopRecording();
  };

  const formatTime = seconds => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!device) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {showCamera ? (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo
          />

          <TouchableOpacity style={styles.captureBtn} onPress={takePicture} />
        </>
      ) : imagePath ? (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: 'file://' + imagePath }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => {
                setImagePath(null);
                setShowCamera(true);
              }}
            >
              <Text style={{ color: '#fff' }}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => {
                navigation.navigate('Details', { img: imagePath });
              }}
            >
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : showvideocamera ? (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            video
            audio
          />

          {isRecording && (
            <View style={styles.timerBox}>
              <Text style={styles.timerText}>{formatTime(recordTime)}</Text>
            </View>
          )}

          {!isRecording ? (
            <TouchableOpacity style={styles.captureBtn} onPress={takevideo} />
          ) : (
            <TouchableOpacity style={styles.stopBtn} onPress={stopVideo} />
          )}
        </>
      ) : (
        <View style={styles.center}>
          <TouchableOpacity onPress={() => setshowvideocamera(true)}>
            <Text style={{ fontSize: 18 }}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCamera(true)}>
            <Text style={{ fontSize: 18 }}>Click Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AudioScreen')}>
            <Text style={{ fontSize: 18 }}> Audio Record</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  retakeBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerBox: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopBtn: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default HomeScreen;

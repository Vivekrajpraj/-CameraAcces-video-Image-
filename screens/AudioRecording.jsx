import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AudioRecorderPlayer from 'react-native-nitro-sound';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const audioPath = useRef(null);

  const startRecording = async () => {
    const path = await AudioRecorderPlayer.startRecorder();
    audioPath.current = path;
    setIsRecording(true);

    AudioRecorderPlayer.addRecordBackListener(e => {
      const time = AudioRecorderPlayer.mmssss(Math.floor(e.currentPosition));
      setRecordTime(time);
    });
  };

  const playAudio = async path => {
    await AudioRecorderPlayer.startPlayer(path);

    AudioRecorderPlayer.addPlayBackListener(e => {
      console.log('Current Time:', e.currentPosition);
      console.log('Total Time:', e.duration);

      if (e.currentPosition >= e.duration) {
        AudioRecorderPlayer.stopPlayer();
        AudioRecorderPlayer.removePlayBackListener();
      }
    });
  };

  const stopRecording = async () => {
    const result = await AudioRecorderPlayer.stopRecorder();
    AudioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);

    console.log('Audio file saved at:', result);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{recordTime}</Text>

      {!isRecording ? (
        <TouchableOpacity onPress={startRecording}>
          <Text style={{ fontSize: 18 }}>Start Recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={stopRecording}>
          <Text style={{ fontSize: 18 }}> Stop Recording</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => playAudio(audioPath.current)}>
        <Text> Play Voice</Text>
      </TouchableOpacity>
    </View>
  );
}

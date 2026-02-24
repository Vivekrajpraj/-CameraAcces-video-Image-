import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';

const VideoScreen = () => {
  const route = useRoute();
  const { video } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Video
        source={{ uri: video }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

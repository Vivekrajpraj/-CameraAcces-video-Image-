import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const DetailsScreen = () => {
  const route = useRoute();
  const { img } = route.params;

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Image
        source={{ uri: 'file://' + img }}
        style={{ width: 100, height: 100 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});

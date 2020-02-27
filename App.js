import React, {setState, useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons, TouchableOpacity } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



export default function App() {
  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  
  const [permission,setPermission]=useState(null);
  const [type,setType]=useState(Camera.Constants.Type.back);
  useEffect(() => {
    const response = async () => {
      const { response } = await Permissions.askAsync(Permissions.CAMERA);
      setPermission('granted');
    }
    response();
  });
  useEffect(() => {
    const response = async () => {
      this.getPermissionAsync
    }
    response();
  });

  if (permission === null) {
    return <View/>;
    // return <Text>No access to camera</Text>;
  } else if (permission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return 
  <View style={{ flex: 1 }}>
    <Camera style={{ flex: 1 }} type={type} ref={ref => {
    this.camera = ref;
  }} >
      
<View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
  <TouchableOpacity
    style={{
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',                  
    }}
    onPress={()=>pickImage()}>
      >
    <Ionicons
        name="ios-photos"
        style={{ color: "#fff", fontSize: 40}}
    />
  </TouchableOpacity>
  <TouchableOpacity
    style={{
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',
    }}
    
    onPress={()=>takePicture()}>
      >
    <FontAwesome
        name="camera"
        style={{ color: "#fff", fontSize: 40}}
    />
  </TouchableOpacity>
  <TouchableOpacity
    style={{
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',
    }}
    onPress={()=>this.handleCameraType()}
    >


    <MaterialCommunityIcons
        name="camera-switch"
        style={{ color: "#fff", fontSize: 40}}
    />
  </TouchableOpacity>
  </View>
  </Camera>
</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const handleCameraType=()=>{
  const { cameraType } = this.state

  this.setState({cameraType:
    cameraType === Camera.Constants.Type.back
    ? Camera.Constants.Type.front
    : Camera.Constants.Type.back
  })
}
const takePicture = async () => {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync();
  }
}

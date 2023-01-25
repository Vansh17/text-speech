

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button ,TextInput,Image, TouchableOpacity,Pressable} from 'react-native';
import * as Speech from 'expo-speech';

import Voice from '@react-native-voice/voice'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

export default function App() {

  const [pitch,setPitch]=useState('');
  const [error,setError]=useState('');
  const [end,setEnd]=useState('');
  const [started,setStarted]=useState('');
  const [results,setResults]=useState([]);
  const [partialResults,setPartialResults]=useState([]);



  const [text, setText] = useState('')
  const LineToSpeak="Hello My name is Vansh Dodiya"
  const speak =()=>{
    Speech.speak(text)
  }

  useEffect(()=>{
    Voice.onSpeechStart=onSpeechStart;
    Voice.onSpeechEnd=onSpeechEnd;
    Voice.onSpeechError=onSpeechError;
    Voice.onSpeechResults=onSpeechResults;
    Voice.onSpeechPartialResults=onSpeechPartialResults;
    Voice.onSpeechVolumeChanged=onSpeechVolumeChanged;

    return ()=>{
      
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[]);

  const onSpeechStart = (e) => {
    
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = (e) => {
    
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = (e) => {
    
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };


    const startRecognizing = async () => {
      
      try{
        await Voice.start('en-US');
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');

      }catch (e)
      {
        
        console.error(e);
      }
    
    };

    const stopRecognizing = async ()=>{
      
      try{
        await Voice.stop();
      }catch (e){
        
        console.error(e);
      }
    };

    const cancelRecognizing = async ()=>{
      
      try{
        await Voice.cancel();
      }catch (e){
        
        console.error(e);
      }
    };

    const destroyRecognizer = async () => {
      
      try {
        await Voice.destroy();
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
      } catch (e) {
        console.error(e);
      }
      
    };

  return (
    // ***************************************TEXT TO SPEECH***********************************************
    <View style={styles.container}>
      <TextInput
        value={text}
        style={{ fontSize: 20, color: 'steelblue',paddingTop:245 }}
        placeholder="Type....."
        onChangeText={(text) => {
          setText(text)
        }}
      />
      <Text style={styles.text}>{text}</Text>
      <Pressable
      style={{backgroundColor:'#00bcd4',width:125,height:50}}
        onPress={speak}
      >
        <Text style={{marginLeft:20,width:95,fontSize:15,
        marginTop:13,}}>
          Read the line
        </Text>
        </Pressable>
    </View>
    // *****************************SPEECH TO TEXT*****************************************************
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.container}>
    //     <Text style={styles.textStyle}>
    //         Speech to text conversion
    //     </Text>
    //     <Text style={styles.textStyle}>
    //         Click on Mic
    //     </Text>

    //     <TouchableOpacity onPress={startRecognizing}>
    //         <Image
    //           style={styles.imageButton}
    //           source={{
    //             uri:
    //               'https://static.vecteezy.com/system/resources/thumbnails/006/935/152/small_2x/microphone-icon-illustration-template-simple-flat-shape-free-vector.jpg'
    //           }}
    //         />
    //     </TouchableOpacity>
    //     <Text  style={styles.textStyle}>
    //       Partial Results
    //     </Text>
    //     <ScrollView>
    //       {partialResults.map((result,index)=>{
    //         return(
    //           <Text
    //           key={`partial-result-${index}`}
    //           style={styles.textStyle}
    //           >
    //             {result}
    //           </Text>
    //         );
    //       })}
    //     </ScrollView>
    //     <Text style={styles.textStyle}>
    //       Results
    //     </Text>
    //     <ScrollView style={{marginBottom:42}}>
    //       {results.map((result,index)=>{
    //         return(
    //           <Text
    //           key={`result-${index}`}
    //           style={styles.textStyle}
    //           >
    //             {result}
    //           </Text>
    //         );
    //       })}
    //     </ScrollView>
    //     <View style={styles.horizontalView}>
    //       <TouchableHighlight
    //       onPress={stopRecognizing}
    //       style={styles.buttonStyle}
    //       >
    //         <Text style={styles.buttonTextStyle}>
    //           Stop
    //         </Text>
    //       </TouchableHighlight>

    //       <TouchableHighlight
    //       onPress={cancelRecognizing}
    //       style={styles.buttonStyle}
    //       >
    //         <Text style={styles.buttonTextStyle}>
    //           Cancel
    //         </Text>
    //       </TouchableHighlight>

    //       <TouchableHighlight
    //       onPress={destroyRecognizer}
    //       style={styles.buttonStyle}
    //       >
    //         <Text style={styles.buttonTextStyle}>
    //           Destroy
    //         </Text>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // </SafeAreaView>
    // *******************************************************************************
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    flexDirection:'column',
    alignItems: 'center',
    // justifyContent: 'center',
    padding:5,
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10,
  },
  titleText:{
    fontSize:22,
    textAlign:'center',
    fontWeight:'bold',
  },
  buttonStyle:
  {
    flex: 1,
    justifyContent: 'center',
    padding:10,
    marginTop:15,
    backgroundColor: '#000',
    marginRight:2,
    marginLeft:2,

  },
  buttonTextStyle:{
    color:'#fff',
    textAlign:'center',
  },
  horizontalView:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
  },
  textStyle:{
    textAlign:'center',
    padding:12,

  },
  imageButton:{
    width:50,
    height:50,
  },
  
  text:{
    marginTop:20,
    color:'black',
    padding:30,
  }
});


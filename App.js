import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchBar from './components/SearchBar';
import { getImages } from './services/api';
import { Grid } from '@material-ui/core';
import Photo from './components/Image';

const Stack = createStackNavigator();

const ImagesScreen = ({ data }, { navigation }, props) => {
    console.log("named data", data);

    return (
        <Grid container>
            {
                data.map(image => (
                    <Grid xs={3} item>
                        <Photo key={image.id} image={image} />
                        <ImageDetailScreen key={image.id} image={image} />
                    </Grid>
                ))
            }
        </Grid>
    )
}


function HomeScreen({navigation}, props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState('cars');
  const onTextChange = (text) => {
    setText(text);
  }

  useEffect(() => {
    const getData = async () => {
      await getImages(text).then(response => {
        setData(response.data.hits);
      }); 
    }
    getData();
  }, [text])

  return (
    <div className="App">
      <Text style={{marginLeft: 16, fontWeight: 500, }}>Image Search</Text>
      <SearchBar onTextChange={onTextChange}/>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <ImagesScreen  data={data}/>
      </TouchableOpacity>
    </div>
  )
}

function ImageDetailScreen({ image }, { navigation }, props) {
  console.log("detail data", image)
  return (
    <div className="DetailPage">
      <Grid container>
        <Text> User: {image.user} </Text>
        <Text> Tags: {image.tags} </Text>
      </Grid>
    </div>
  )
}

function SecondDetailScreen({ image }, { navigation }, props) {
  console.log("detail data", image)
  return (
    <div className="DetailPage">
      <Grid container>
        <Text> Details on Main Screen </Text>
{/*        <Text> User: {image.user} </Text>
        <Text> Tags: {image.tags} </Text>*/}
      </Grid>
    </div>
  )
}

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={SecondDetailScreen} />
        <Stack.Screen name="Images" component={ImagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
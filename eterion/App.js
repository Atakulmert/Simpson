import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BASE_URL = 'https://5fc9346b2af77700165ae514.mockapi.io/simpsons';

function HomeScreen({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [newData, setNewData] = useState([]);
  console.log('prop nedir?', route);
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };
  const addButton = (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      fill="#1E90FF"
      className="bi bi-plus-circle-fill"
      viewBox="0 0 16 16">
      <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
    </Svg>
  );
  const binIcon = (
    <Svg
      style={{
        color: '#000',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="currentColor"
      className="bi bi-trash"
      viewBox="0 0 16 16">
      <Path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
      <Path
        fillRule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      />
    </Svg>
  );
  const upArrow = (
    <Svg
      style={{
        color: '#4ff339',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="currentColor"
      className="bi bi-arrow-up-circle-fill"
      viewBox="0 0 16 16">
      <Path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
        fill="#4ff339"
      />
    </Svg>
  );
  const downArrow = (
    <Svg
      style={{
        color: 'red',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="currentColor"
      className="bi bi-arrow-down-circle-fill"
      viewBox="0 0 16 16">
      <Path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
        fill="red"
      />
    </Svg>
  );

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  useEffect(() => {
    let a = '';
    Axios.get(BASE_URL)
      .then(({data}) => {
        setDataFromApi(data);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false), setNewData(dataFromApi);
      });
  }, []);

  return (
    <View style={{flex: 1, padding: 5}}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={newData}
            ItemSeparatorComponent={ItemDivider}
            renderItem={({item}) => {
              return (
                <View style={styles.container}>
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Details', {item: item});
                      }}
                      style={styles.leftSide}>
                      <View style={styles.imageContainer}>
                        <Image
                          resizeMode="stretch"
                          style={styles.avatar}
                          source={{uri: item.avatar}}
                        />
                      </View>
                      <View style={styles.nameContainer}>
                        <Text style={{color: '#000'}}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                  <View style={styles.rightSide}>
                    <View style={styles.arrowContainer}>
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 15,
                        }}>
                        {upArrow}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 15,
                        }}>
                        {downArrow}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.binContainer}>
                      <TouchableOpacity>{binIcon}</TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add');
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 0,
            zIndex: 1,
          }}>
          {addButton}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({navigation, route}) {
  return (
    <ScrollView>
      <View style={(styles.container, {flexDirection: 'column'})}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.2,
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            resizeMode="stretch"
            style={styles.avatar}
            source={{uri: route.params.item.avatar}}
          />
        </View>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={styles.text}>{route.params.item.name}</Text>
          </View>
          <View>
            <Text style={styles.text}>{route.params.item.job}</Text>
          </View>
        </View>
        <View style={{margin: 30}}>
          <Text style={styles.text}>{route.params.item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function AddScreen({navigation}) {
  const addCharacter = () => {
    navigation.navigate('Home', {
      name: name,
      avatar: avatar,
      description: description,
      job: job,
    });
  };
  return (
    <View style={{flex: 1, margin: 10}}>
      <View>
        <View>
          <Text style={styles.text}>Name Surname:</Text>
        </View>
        <View>
          <TextInput
            onChange={text => setName(text)}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              borderRadius: 5,
              height: 45,
              paddingLeft: 10,
              backgroundColor: '#fff',
              color: '#000',
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Job Title:</Text>
        </View>
        <View>
          <TextInput
            onChange={text => setJob(text)}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              borderRadius: 5,
              height: 45,
              paddingLeft: 10,
              backgroundColor: '#fff',
              color: '#000',
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>About Him/Her:</Text>
        </View>
        <View>
          <TextInput
            onChange={text => setDescription(text)}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              borderRadius: 5,
              height: 100,
              paddingLeft: 10,
              backgroundColor: '#fff',
              color: '#000',
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Image Link:</Text>
        </View>
        <View>
          <TextInput
            onChange={text => setAvatar(text)}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              borderRadius: 5,
              height: 45,
              paddingLeft: 10,
              backgroundColor: '#fff',
              color: '#000',
            }}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            marginVertical: 10,
            height: windowHeight * 0.075,
            backgroundColor: '#1E90FF',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            addCharacter;
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Add Character</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: windowHeight * 0.1,
    flexDirection: 'row',
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    height: '80%',
    width: '50%',
    alignSelf: 'auto',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  binContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 24,
  },
});

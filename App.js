import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dictionary from './database'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: '',
      word: "",
      LexicalCategory: '',
      examples: [],
      definition: ""
    }
  }

  getWord = (text) => {
    var text = text.toLowerCase()
    try {
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]
      this.setState({
        "word": word,
        "lexicalCategory": lexicalCategory,
        "definition": definition
      })
    }
    catch (err) {
      alert("Sorry, This word doesnt exist in database")
      this.setState({
        'text': '',
        'isSearchButton': false
      })
    }
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'DictionaryApp-Offline-Version', style: { color: '#fff', marginHorizontal: 50 } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />

          <TextInput style={styles.inputBox} onChangeText={text => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "Loading...",
              LexicalCategory: '',
              examples: [],
              definition: ""
            })
          }}
            value={this.state.text}
          />

          <TouchableOpacity style={styles.searchButton} onPress={() => {
            this.setState({ isSearchPressed: true })
            this.getWord(this.state.text)
          }} >
            <Text style={{ fontSize: 18 }} > Go </Text>
          </TouchableOpacity>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Word: {"  "}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {this.state.text}
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Type: {"  "}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {this.state.LexicalCategory}
            </Text>
          </View>

          <View style={styles.detailsContainer} >
            <Text style={styles.detailsTitle} >
              Definition : {"  "}
            </Text>
            <Text style={{ fontSize: 18 }} >
              {this.state.definition}
            </Text>
          </View>

          <View style={styles.outputContainer} >
            <Text style={{ fontSize: 20 }}>
              {
                this.state.isSearchPressed && this.state.word === "Loading..."
                  ? this.state.word
                  : ""
              }
            </Text>
          </View>
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: "grey",
    border: 'none',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingHorizontal: 50
  },
  inputBoxContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '30%',
    alignSelf: 'center',
    height: 40,
    margin: 10,
    border: 'groove',
    borderRadius: 10
  },
  detailsContainer: {
    alignItems: 'center',
    padding: 5,
    margin: 19
  },
  detailsTitle: {
    color: 'blue'
  },
  outputContainer: {

  },
});

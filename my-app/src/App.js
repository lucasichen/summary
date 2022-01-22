
import './App.css';
import React, { Component } from 'react';
require('dotenv').config();
const fetch = require('node-fetch');
const upload = 'https://api.assemblyai.com/v2/transcript';
const transURL = 'https://api.assemblyai.com/v2/transcript/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: true,
      item: [],
      isLoading: false,
    }
  }
  
  async uploadArtifact() {
    let data = {
      "audio_url" : "https://s3-us-west-2.amazonaws.com/blog.assemblyai.com/audio/8-7-2018-post/7510.mp3"
    }
    try {
      const response = await fetch(upload,{
        headers:{
            "authorization": 'e1436fdf9c1346e18b5104ac96980290',
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST"
    });
      const json = await response.json();
      console.log("ID:",json.id)
      // this.setState({ data: json.id });
      return json;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  async getArtifact(json) {
    try {
      let theURL = transURL+json.id;
      // console.log(theURL);
      const Res = await fetch(theURL,{
        headers: {
          "authorization": 'e1436fdf9c1346e18b5104ac96980290',
          "content-type": "application/json",
        }, 
        method: "GET"
      });
      const transcript = await Res.json();
      this.setState({ item: transcript });
      return transcript;

    } 
    catch (error) {
    console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  // Where everything is runned
  async componentDidMount() {
    let json = await this.uploadArtifact();
    console.log("Await done: ",json.id);
    const interval = setInterval(async() => {
      try {
        const jsonArt = await this.getArtifact(json)
        console.log(jsonArt)
        if (jsonArt.status === 'completed') {
          let text = await this.getArtifact(json);
          console.log(text.text); //To get text
          clearInterval(interval);
        }
        if (jsonArt.status === 'trained') {
          clearInterval(interval);
        }
        if (jsonArt.status === 'error') {
          clearInterval(interval);
        }
      } catch (e) {
        clearInterval(interval);
      }
    }, 3000)
    
  }
  render() {
    const { data, isLoaded } = this.state;
    if(!isLoaded) {
      return <div>Loading....</div>;
    }
    else {
      return (
        <div className="App">
          
        </div>
      )
    }
  }
}

export default App;

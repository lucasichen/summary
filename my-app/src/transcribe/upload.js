// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// export default App = () => {
    // const [isLoading, setLoading] = useState(true);
    // const [data, setData] = useState([]);

    require('dotenv').config();
    const fetch = require('node-fetch');
    const url = 'https://api.assemblyai.com/v2/transcript';
    
    const uploadArtifact = async (audioURL) => {
        const uploaded = {
            "audio_url": "https://s3-us-west-2.amazonaws.com/blog.assemblyai.com/audio/8-7-2018-post/7510.mp3"
            };
        try {
            const response = await fetch(url, {
                headers: {
                "authorization": process.env.ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
                },
                body: JSON.stringify(uploaded),
                method: "POST"
            });
            const json = await response.json();
            let trans = url + "/" + json.id;
            console.log(trans)
            const getData = await fetch()
            upload_id = json.id;
            console.log(json.id);
        }catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
        
    }
audioURL = 'https://s3-us-west-2.amazonaws.com/blog.assemblyai.com/audio/8-7-2018-post/7510.mp3'
uploadArtifact(audioURL);

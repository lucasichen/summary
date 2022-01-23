// import logo from './logo.svg';
// import './App.css';

// import ReactPlayer from 'react-player'

// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
// 			<ReactPlayer url = 'https://www.youtube.com/watch?v=7sDY4m8KNLc'/>
//     </div>
//   );
// }

// export default App;

import axios from 'axios';
import ReactPlayer from 'react-player'
// import { readFile } from 'fs';
// import {moveFile} from 'move-file';
// import express from 'express'


 
import React,{Component} from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';

class App extends Component {
	
	state = {

		// Initially, no file is selected
		selectedFile: null,
		updateVid: false
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
		// console.log(event.target.files[0])

		console.log(event.target.value)

		// Update the state
		this.setState({ 
			selectedFile: event.target.files[0]
		});
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {

		let data = new FormData()
		data.append('avatar', this.state.selectedFile)

		axios.post('//localhost:8000/upload', data)
		.then ((e) => {
			console.log('Success')
			this.setState({
				updateVid: true
			})
		})
		.catch((e) => {
			console.error('Error', e)
		})
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
		if (this.state.selectedFile) {
			// console.log(this.state.selectedFile)
			return (
				<div>
					<h2>File Details:</h2>
             

					<p>File Name: {this.state.selectedFile.name}</p>             
					<p>File Type: {this.state.selectedFile.type}</p>
					
             
					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>

					{/* directory = ""
					<source src = {directory} type="video/mp4"/> */}

					{/* <ReactPlayer url = /> */}

				</div>
        );
      } 
			else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };

		uploadedVideo = () => {
			if (this.state.updateVid) {
				console.log("adding video")

				return (
					<video width="320" height="240" controls>
						<source src="video.mp4" type="video/mp4" />
					</video>
				)
			}
		}
    
    render() {
      return (
        <div>
            <h1>
              Uploading Mp4
            </h1>
            <h3>
              File Upload using React!
            </h3>
            <body>
							<form action='/single' method="post" enctype="multipart/form-data">
                <input type="file" name="avatar" onChange={this.onFileChange} />
							</form>
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </body>
						<ReactPlayer url='' controls={true}/>

          {this.fileData()}
					{this.uploadedVideo()}
        </div>
      );
    }
  }
 
  export default App;
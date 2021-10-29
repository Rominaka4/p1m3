import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';


function App() {
    // fetches JSON data passed in by flask.render_template and loaded
    // in public/index.html in the script with id "data"
    //   const args = JSON.parse(document.getElementById("data").text);

    //   // TODO: Implement your main page as a React component.
    // }

    const args = JSON.parse(document.getElementById("data").text);
    const [artists, setArtist] = useState(args.artist_ids);
    const textInput = useRef(null);

    function saveArtists() {
        let data = {"artist_ids": artists };
        console.log(JSON.stringify(data))
        fetch("/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then(data => {
            console.log('Success: ', data)
            setArtist(data.artist_ids)
        });
	}

    function add_Artists() {
        if (textInput.current.value != "") {
            let newList = textInput.current.value;
            let add_artist = [...artists, newList];
            setArtist(add_artist);
            textInput.current.value = "";
            console.log(add_Artists);
        }
    }

     function deleteButton(i) {
         let add_Artist = [...artists.slice(0, i), ...artists.slice(i + 1)];
         setArtist(add_Artist);
    }
	const deleteButtonStyle = {
		backgroundColor: 'red',
		border: 'none',
		color: 'white',
		padding: '15px 32px',
		textAlign: 'center',
		textDecoration: 'none',
		display: 'inline-block',
		fontSize: '16px',
	  };
    const artistList = artists.map((artist_id, i) =>(
        <div>
            <p> {artist_id}
            <button style={deleteButtonStyle} onClick={() => deleteButton(i)} >Delete</button></p>
        </div>
    ));

    let has_artists_saved = false;
    return (
        <>
        <h1> Romina's Song </h1> {
        args.has_artists_saved ? (
        <>
            <h2> { args.song_name } </h2> 
            <h3> { args.song_artist } </h3> 
            <div>
			<img src = { args.song_image_url } width = { 300 }height = { 300 }/> 
            </div>
            <div>
            <audio controls >
            <source src = { args.preview_url }/>
             </audio> 
             </div> 
                        <a href={args.genius_url} > Click here to see lyrics! </a>
                        <div>
                            <h1>You save artists: </h1>
                            {artistList}
                           
                        </div>                   
             
        </>):
         (<h2>Looks like you don't have anything saved! Use the form below!</h2>)
        } 
            <h1> Save a favorite artist ID for later: </h1>         

        <div>
                    <input  ref={textInput} type="text"/>
                    <button onClick={add_Artists}>Add Artist</button>
                    <button onClick={saveArtists}>Save</button>
                
            </div>
            <br />
            <br/>
			</>  
    );  
        
}

export default App;
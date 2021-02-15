import React from 'react';

let clientId = 'a51837af77184f96a21171be1d145115';
let redirectUri = "http://localhost:3000";
let accessToken = ''

class Spotify extends React.Component{
  constructor(props){
    super(props)
    this.getAccessToken = this.getAccessToken.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term){
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if(!jsonResponse.tracks){
          return [];
        }

        return jsonResponse.tracks.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      }
    );
  }

  savePlaylist(name, arr){
    if(!name || !arr){
      return;
    }
    let accessToken = this.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`}
    let userId = '';
    return fetch(`https://api.spotify.com/v1/me`,
      {headers: headers}
    )
    .then((response)=> {
      return response.json();
    })
    .then((jsonResponse)=>{
        userId = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers:headers,
          method: 'POST',
          body: JSON.stringify({name:name})
        }).then(response => {
          return response.json()
        }).then(jsonResponse => {
          let playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uri: this.props.trackUris})
          })
        })
        })
  }

  getAccessToken(token){
    if (accessToken) {
      return;
    }
    // check for access token match
    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)');
    const expiry = window.location.href.match('/expires_in=([^&]*)/');
    if (accessTokenMatch && expiry){
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiry[1])
      // clears parmeters from window
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl
    }
  }
}

export default Spotify;

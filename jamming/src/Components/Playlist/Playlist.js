import React from 'react';
import Tracklist from '../TrackList/Tracklist';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }
  render(){
    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} value="New Playlist" />
        <Tracklist onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks} name={this.props.playlistName}  />
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )};
};

export default Playlist;

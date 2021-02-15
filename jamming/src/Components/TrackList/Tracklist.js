import React from 'react';
import Track from '../Track/Track';

class Tracklist extends React.Component {
  render(){
    return(
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
        return  <Track key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={false} track={track} />;
      })
    }
      </div>
    )}
};

export default Tracklist;

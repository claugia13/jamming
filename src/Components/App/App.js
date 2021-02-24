import './App.css';
import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [
    {
      name: 'name-1',
      artist: 'artist-1',
      album: 'album-1',
      id: 'id-1'
    },
    {
      name: 'name-2',
      artist: 'artist-2',
      album: 'album-2',
      id: 'id-2'
    },
    {
      name: 'name-3',
      artist: 'artist-3',
      album: 'album-3',
      id: 'id-3'
    }
  ],

    playlistName: 'playlist-1',

  playlistTracks: [
    {
      name: 'track-name-1',
      artist: 'track-artist-1',
      album: 'track-album-1',
      id: 'track-id-1'
    },
    {
      name: 'track-name-2',
      artist: 'track-artist-2',
      album: 'track-album-2',
      id: 'track-id-2'
    },
    {
      name: 'track-name-3',
      artist: 'track-artist-3',
      album: 'track-album-3',
      id: 'track-id-3'
    }
  ]

}
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => 
      savedTrack.id === track.id)){
      return;
    }
    else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
   Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
    this.setState({ 
      playlistName: 'New Playlist', 
      playlistTracks: []
    });
   })
    
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults 
      searchResults={this.state.searchResults}
      onAdd={this.addTrack}
      onSearch={this.search}
      />
      <Playlist 
      playlistName={this.state.playlistName} 
      playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}
      />
    </div>
  </div>
</div>
    )
  }
}

export default App;

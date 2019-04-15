import React, {Component} from 'react';
import Typography from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Player extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: {name: 'Not Checked', albumArt: ''}
        }
    }

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {

            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url
                    }
                });
            })
    }

    render() {
        return (
            <div>
                <Typography >
                    Now Playing: {this.state.nowPlaying.name}
                </Typography>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{height: 150}}/>
                </div>
                { this.state.loggedIn &&
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
                }
            </div>
        );
    }
}

export default Player;
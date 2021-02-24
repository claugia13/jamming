const clientId = 'e6525188e780422b81e66898f07aee89';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
getAccessToken(){
    if(accessToken) {
        return accessToken;
    }
        // check for access token match
        const accessTokenMatch = window.location.href.match(access_token=([^&]*));
        const expiresInMatch = window.location.href.match(expires_in=([^&]*));

    if(accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        // this clears the paramaters, allowing us to grab a new access token when it expires
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    }
    else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${cliendId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }
},

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    }

}

export default Spotify;
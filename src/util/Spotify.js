let userAccessToken;

const Spotify = {
getAccessToken(){
    if(userAccessToken) {
        return userAccessToken;
    }
    else {
        // check for access token match
        const userAccessToken = window.location.href.match(access_token=([^&]*));
        const expiresInMatch = window.location.href.match(expires_in=([^&]*));
    }
}
}

export default Spotify;
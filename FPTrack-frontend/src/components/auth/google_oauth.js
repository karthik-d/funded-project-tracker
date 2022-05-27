import { GoogleLogin } from 'react-google-login';

function handleLogin() {
    console.log("login triggered");
}

export default function GoogleSignin() {
    return (<GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENTID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    />);
}

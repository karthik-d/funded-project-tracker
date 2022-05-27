import { GoogleLogin } from 'react-google-login';


const handleLogin = async googleData => {

    const res = await fetch(
        "/api/v1/auth/google",
        {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

    const data = await res.json();
    conole.log(data);
}

export default function GoogleSignin() {
    return (<GoogleLogin
        client_id={process.env.REACT_APP_OAUTH_CLIENTID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    />);
}

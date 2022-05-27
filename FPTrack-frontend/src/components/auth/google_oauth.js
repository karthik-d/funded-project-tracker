import { GoogleLogin } from 'react-google-login';


const handleLogin = async (googleData) => {

    console.log(googleData);

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

    const data = await res;
    console.log(data);
}

export default function GoogleSignin() {
    return (<GoogleLogin
        clientId={"103603048152-42oo200pr067ahtntminh5m6kc88m618.apps.googleusercontent.com"}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    />);
}

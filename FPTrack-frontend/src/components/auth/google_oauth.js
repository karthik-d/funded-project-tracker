import { GoogleLogin } from 'react-google-login';

export default function GoogleSignin() {
    const onSuccess = async (googleData) => {

        console.log(googleData);

        console.log("Handling...");
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

    const onFailure = async (response) => {
        console.log(response);
    }

    const client_id = '103603048152-42oo200pr067ahtntminh5m6kc88m618.apps.googleusercontent.com';
    const client_secret = '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'
    return (<GoogleLogin
        clientId={client_id}
        clientSecret={client_secret}
        buttonText="Log in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
    />);
}

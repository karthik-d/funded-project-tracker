import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleSignin() {
    return (
        <GoogleOAuthProvider
            clientId="103603048152-42oo200pr067ahtntminh5m6kc88m618.apps.googleusercontent.com">
            <LoginOneTapCrux />
        </GoogleOAuthProvider>
    )
}

export function LoginOneTapCrux() {

    const onSuccess = async (googleData) => {
        console.log("Login Tap Success");
        // fetch user from server
        fetch(
            "http://localhost:3000/api/auth",
            {
                method: "POST",
                body: JSON.stringify({
                    token: googleData.credential
                })
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                // PUT YOUR ERROR PAGE HANDLE HERE!!!
                console.log("ERROR 2" + error);
            });
    };

    const onFailure = async (response) => {
        console.log("Failed: ");
        console.log(response.error);
        console.log(response.details);
    }

    return (
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            useOneTap
        />
    );

}


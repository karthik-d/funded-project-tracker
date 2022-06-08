import SignupForm from '../../components/SignupForm';
import Header from '../header';

export default function signup() {
    return (
        <div id="signupform">
            <Header></Header>
            <SignupForm name="Adam" />
        </div>
    );
}
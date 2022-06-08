
import Header from '../pages/header';

export default function message(props) {
    return (
        <div id="message">
            <Header></Header>
            <h1>Message:</h1><h2>{props}</h2>
        </div>
    );
}
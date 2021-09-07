import './HomePage.scss';
import {Link} from 'react-router-dom';
import { Component } from 'react';

class HomePage  extends Component {
    audio = new Audio('http://localhost:6969/audio/Mall.mp3');

    componentDidMount() {
        this.audio.play();
        this.audio.volume = 0.005;
        this.audio.loop = true;
    }

    componentWillUnmount() {
        this.audio.pause();
    }

    render() {
        return(
            <main className="homepage">
                {/* <img src="http://localhost:6969/logo/Logo.png" alt="logo" /> */}
                <h1 className="homepage__heading">Jojo's Adventure</h1>
                <div className="homepage__jojo"></div>
                <p>Whatever this is....</p>
                <Link className="homepage__start" to='/story'> 
                    <p className="homepage__start-button">START GAME</p>
                    <p className="homepage__start-seriously">SERIOUSLY?</p>
                </Link>
            </main>
        )
    }
}

export default HomePage;
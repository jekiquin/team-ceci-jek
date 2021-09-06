import './HomePage.scss';
import {Link} from 'react-router-dom';

const HomePage = () => {
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

export default HomePage;
import './HomePage.scss';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return(
        <main className="homepage">
            <img src="http://localhost:6969/logo/Logo.png" alt="logo" />
            <p>Whatever this is</p>
            <Link to='/story'> START GAME </Link>
        </main>
    )
}

export default HomePage;
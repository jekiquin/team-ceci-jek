import './HomePage.scss';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return(
        <div>
            <h1>Jojo's Adventure</h1>
            <p>Whatever this is</p>
            <Link to='/story'> START GAME </Link>
        </div>
    )
}

export default HomePage;
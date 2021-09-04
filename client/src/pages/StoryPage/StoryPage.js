import './StoryPage.scss';
import {Link} from 'react-router-dom';
import {Component} from 'react';
import storyCalls from '../../utils/apiCall';


class StoryPage extends Component {
    state = {
        storyLine: null,
        displayStoryLine: ''
    }

    componentDidMount() {
        const storyId = this.props.match.params && this.props.match.params.storyId;
        storyId
        ? storyCalls.nextStory(storyId).then((res) => {this.setState({storyLine: res.data})})
        : storyCalls.startStory().then((res) => {this.setState({storyLine: res.data})})
    }

    componentDidUpdate(prevProps) {
        const storyId = this.props.match.params && this.props.match.params.storyId;
       if (storyId !== prevProps.match.params.storyId) {
        storyCalls.nextStory(storyId).then((res) => {this.setState({storyLine: res.data})})
       }
    }

    optionsLink = () => {
        const options = this.state.storyLine.options;
        return options.map(option => 
            <Link key={option.toNextId} to={`/story/${option.toNextId}`}>{option.description}</Link>
        )
    }

    render() {
        const {storyLine} = this.state;
       return !storyLine ? <h1>Loading...</h1> : 
        ( <div>
            <Link to='/'>Home</Link>
            <h1>Jojo's Adventure</h1>
            <p>{storyLine.storyline}</p>
            <p>What should Jojo do?</p>
            {this.optionsLink()}
        </div> )
    }

}

export default StoryPage;
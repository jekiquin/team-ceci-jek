import './StoryPage.scss';
import {Link} from 'react-router-dom';
import {Component} from 'react';
import storyCalls from '../../utils/apiCall';
import Animation from '../../components/Animation/Animation';

class StoryPage extends Component {
    state = {
        storyLine: null,
        displayStoryLine: '',
        animationRun: false,
        animationImage: null
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
            storyCalls.nextStory(storyId)
                .then((res) => {
                    setTimeout(() => {
                        this.setState({storyLine: res.data, animationRun: false, animationImage: null})
                    }, 4000)
                    
                })
        }

    }

    handleClick = (option) => {
        console.log(option)
        this.setState({
            animationRun: !option.isEnd,
            animationImage: option.image
        })
    }

    optionsLink = () => {
        const options = this.state.storyLine.options;
        return options.map(option => 
            <Link onClick={() => this.handleClick(option)} className="story-container__option" key={option.toNextId} to={`/story/${option.toNextId}`}>{option.description}</Link>
        )
    }

    render() {
        const {storyLine} = this.state;
       return !storyLine ? <h1>Loading...</h1> : 
        ( <div className="story-container">
            <h1 className="story-container__heading">Jojo's Adventure</h1>
            <Animation image={this.state.animationImage} animate={this.state.animationRun}/>
            <div className="story-container__storyline">
                <p className="story-container__text">{storyLine.storyline}</p>
                <p className="story-container__text">What should Jojo do?</p>
                {this.optionsLink()}
            </div>
        </div> )
    }

}

export default StoryPage;
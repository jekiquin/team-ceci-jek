import './StoryPage.scss';
import {Link} from 'react-router-dom';
import {Component} from 'react';
import storyCalls from '../../utils/apiCall';
import Animation from '../../components/Animation/Animation';

class StoryPage extends Component {
    state = {
        storyLine: null,
        isDead: false,
        isEnd: false,
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
        const timeOut = this.state.animationRun ? 4000 : 0;
        if (storyId !== prevProps.match.params.storyId) {
            storyCalls.nextStory(storyId)
                .then((res) => {
                    setTimeout(() => {
                        this.setState({storyLine: res.data, isDead: res.data.isDead, isEnd: res.data.isEnd, animationRun: false, animationImage: null})
                    }, timeOut)
                    
                })
        }

    }

    handleClick = (option) => {
        this.setState({
            animationRun: !option.isEnd,
            animationImage: option.image,
        })
    }

    optionsLink = () => {
        const options = this.state.storyLine.options;
        return options.map(option => 
            <Link onClick={() => this.handleClick(option)} className="story-container__option" key={option.toNextId} to={`/story/${option.toNextId}`}>{option.description}</Link>
        )
    }

    render() {
        const {storyLine, animationRun} = this.state;
        const storylineHide = animationRun ? 'story-container__storyline--hide' : '';
        
        return !storyLine ? <h1>Loading...</h1> : 
            ( <main className="story-container">
                <h1 className="story-container__heading">Jojo's Adventure</h1>
                <Animation image={this.state.animationImage} animate={this.state.animationRun} isDead={this.state.isDead} isEnd={this.state.isEnd}/>
                <div className={`story-container__storyline  ${storylineHide}`}>
                    <div className="story-container__text-container">
                        <p className="story-container__text">{storyLine.storyline}</p>
                        <p className="story-container__text story-container__question">What should Jojo do next?</p>
                    </div>
                    <div>
                        {this.optionsLink()}
                    </div>
  
                </div>
            </main> )
    }

}

export default StoryPage;
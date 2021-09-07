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

    background = new Audio('http://localhost:6969/audio/Electronic_Fantasy.mp3');
    buttonSound = new Audio('http://localhost:6969/audio/mixkit-arcade-game-jump-coin-216.wav');
    gameWin = new Audio('http://localhost:6969/audio/mixkit-video-game-win-2016.wav');
    gameOver = new Audio('http://localhost:6969/audio/mixkit-retro-arcade-game-over-470.wav')
    
    componentDidMount() {
        this.background.play();
        this.background.volume = 0.005;
        this.gameWin.volume = 0.01;         
        this.gameOver.volume = 0.01;
        this.background.loop = true;

        const storyId = this.props.match.params && this.props.match.params.storyId;
        storyId
        ? storyCalls.nextStory(storyId).then((res) => {this.setState({storyLine: res.data, isDead: res.data.isDead, isEnd:res.data.isEnd})})
        : storyCalls.startStory().then((res) => {this.setState({storyLine: res.data, isDead: res.data.isDead, isEnd:res.data.isEnd})})
    }

    componentDidUpdate(prevProps) {
        const storyId = this.props.match.params && this.props.match.params.storyId;
        const timeOut = this.state.animationRun ? 4000 : 0;
        if (storyId !== prevProps.match.params.storyId) {
            storyId
            ? storyCalls.nextStory(storyId)
                .then((res) => {
                    setTimeout(() => {
                        this.setState({storyLine: res.data, isDead: res.data.isDead, isEnd: res.data.isEnd, animationRun: false, animationImage: null})
                    }, timeOut)
                    
                })
            : storyCalls.startStory().then((res) => {
                this.setState({storyLine: res.data, isDead: res.data.isDead, isEnd: res.data.isEnd, animationRun: false, animationImage: null})
            });
        }

        const {isEnd, isDead} = this.state;
        if (isEnd) {
            this.background.pause();
            this.buttonSound.pause();
            isDead ? this.gameOver.play() : this.gameWin.play();
        } else {
            this.background.play();
            this.gameOver.pause();
            this.gameWin.pause();
        }
    }

    componentWillUnmount() {
        this.background.pause();
        this.gameOver.pause();
        this.gameWin.pause();
    }

    handleClick = (option) => {
        this.buttonSound.play();
        this.buttonSound.volume = 0.1;
        this.setState({
            animationRun: !option.isEnd,
            animationImage: option.image,
        }, () => {
            setTimeout(() => this.buttonSound.pause(), 200);
        })
    }

    optionsLink = () => {
        const options = this.state.storyLine.options;
        return options.map(option => 
            <Link onClick={() => this.handleClick(option)} className="story-container__option" key={option.toNextId} to={`/story/${option.toNextId}`}>{option.description}</Link>
        )
    }

    render() {
        const {storyLine, animationRun, isEnd} = this.state;
        const storylineHide = animationRun ? 'story-container__storyline--hide' : '';
        
        return !storyLine ? <h1>Loading...</h1> : 
            ( <main className="story-container">
                <h1 className="story-container__heading">Jojo's Adventure</h1>
                <Animation image={this.state.animationImage} animate={this.state.animationRun} isDead={this.state.isDead} isEnd={this.state.isEnd}/>
                <div className={`story-container__storyline  ${storylineHide}`}>
                    <div className="story-container__text-container">
                        <p className="story-container__text">{storyLine.storyline}</p>
                        {!isEnd && <p className="story-container__text story-container__question">What should Jojo do next?</p>}
                    </div>
                    <div className="story-container__buttons">
                        {this.optionsLink()}
                    </div>
                </div>
            </main> )
    }

}

export default StoryPage;
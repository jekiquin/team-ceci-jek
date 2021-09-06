import './Animation.scss';

function Animation(props) {
    const {image, animate, isDead, isEnd} = props;
    // image = image || 'http://localhost:6969/images/boss.png';
    // console.log(props.storyLine);

    const animateEnv = animate ? 'animation--run' : '';
    let animateJojo = animate ? 'animation__jojo--run' : 'animation__jojo--standing';
    animateJojo = image?.includes('boss') ? 'animation__jojo--punch' : animateJojo;
    let animateObstruction = animate ? 'animation__obstruction--run' : '';
    animateObstruction = image?.includes('boss') ? 'animation__obstruction--punch' : animateObstruction;
    let overMessage = isEnd ? (isDead ? 'GAME OVER!' : 'WINNER!!!!') : '';
    

    return(
        <div className={`animation ${animateEnv}`}>
            <h1 className='animation__overmessage'>{overMessage}</h1>
            <div className={`animation__jojo ${animateJojo}`}>
            </div>
            <div className={`animation__obstruction ${animateObstruction}`}>
                {animate && <img className="animation__obstruction-img" src={image} alt="" />}
            </div>
        </div>
    )
}



export default Animation;
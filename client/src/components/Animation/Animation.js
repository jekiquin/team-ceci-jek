import './Animation.scss';

function Animation(props) {
    const {image, animate} = props;
    // image = image || 'http://localhost:6969/images/boss.png';
    // console.log(image);

    const animateEnv = animate ? 'animation--run' : '';
    let animateJojo = animate ? 'animation__jojo--run' : 'animation__jojo--standing';
    animateJojo = animate && image.includes('boss') ? 'animation__jojo--punch' : animateJojo;
    let animateObstruction = animate ? 'animation__obstruction--run' : '';
    animateObstruction = animate && image.includes('boss') ? 'animation__obstruction--punch' : animateObstruction;

    return(
        <div className={`animation ${animateEnv}`}>
            <div className={`animation__jojo ${animateJojo}`}>
            </div>
            <div className={`animation__obstruction ${animateObstruction}`}>
                <img className="animation__obstruction-img" src={image} alt="" />
            </div>
        </div>
    )
}



export default Animation;
import './Animation.scss';

function Animation(props) {
    const {image, animate} = props;

    const animateStr = animate ? '--run' : '';
    const animateJojo = animate ? 'animation__jojo--run' : 'animation__jojo--standing'
    return(
        <div className={`animation animation${animateStr}`}>
            <div className={`animation__jojo ${animateJojo}`}>
            </div>
            <div className={`animation__obstruction animation__obstruction${animateStr}`}>
                <img className="animation__obstruction-img" src={image} alt="" />
            </div>
        </div>
    )
}

Animation.defaultProps = {
    image: 'http://localhost:6969/images/coffeepot.png'
}

export default Animation;
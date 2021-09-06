import './Animation.scss';

function Animation(props) {
    return(
        <div className="animation">
            <div className="animation__jojo">
            </div>
            <div className="animation__obstruction">
                <img className="animation__obstruction-img" src={props.image} alt="" />
            </div>
        </div>
    )
}

Animation.defaultProps = {
    image: 'http://localhost:6969/images/coffeepot.png'
}

export default Animation;
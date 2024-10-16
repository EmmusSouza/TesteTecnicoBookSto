import hero_img from '../../assets/stack.png'
import './Hero.css'
const Hero = () => {
  return (
    <div>
    <div className="hero_top">
          <div className="hero_left">
            <h2>Escrito Pela Escritora Alice Green</h2>
            <h1>O novo Best Seller da literatura mundial</h1>
            <p>A historia de uma jovem menina descobrindo o mundo</p>
          </div>
          <div className="hero_right">
            <img src={hero_img} alt="hero_image" />
          </div>
    </div>
    </div>
  )
}

export default Hero
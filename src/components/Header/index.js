import styles from './style.module.css'
import pokeball from '../../images/poke-ball.png'

const Header = () => {
  return (
    <>
      <div className={styles.header__container}>  
        <img className={styles.header__img} src={pokeball}/>    
        <h1 className='heder__title'>Pokemon's Store</h1>
      </div>
    </>
  )
}

export default Header;
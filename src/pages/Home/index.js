import styles from './style.module.css'

import Header from '../../components/Header'
import Body from '../../components/Body'
import ShippingCart from '../../components/ShippingCart'
import { useState } from 'react'

const Home = () => {
  const [successfulPurchase, setSuccessfulPurchase] = useState(false)
  const [pokemonToCart, setPokemonTocart] = useState([])

  const buy = () => {
    setSuccessfulPurchase(true)
  } 

  const buyPokemon = (name, qtde, price, total) => {
    let isAlreadInCart = pokemonToCart.filter(pokemon => pokemon.name == name).length

    if(!isAlreadInCart) {
      setPokemonTocart([...(pokemonToCart), {name, qtde, price, total}])
    } else {
      let copypokemonToCart = [...pokemonToCart]
      let indexRepeatedEl = copypokemonToCart.findIndex((pokemon) => pokemon.name === name)

      copypokemonToCart[indexRepeatedEl].qtde++
      copypokemonToCart[indexRepeatedEl].total = copypokemonToCart[indexRepeatedEl].qtde * copypokemonToCart[indexRepeatedEl].price
      setPokemonTocart([...(copypokemonToCart) ])  
    } 
  }

  return (
    <>
      <div className={styles.home__container}>
        <div className={styles.header__container}>
          <Header />
        </div>   
        <div className={styles.shippingcart__container}>
          <ShippingCart pokemonToCart={pokemonToCart} buy={buy}/>
        </div>      
        <div className={styles.body__container}>
          <Body buyPokemon={buyPokemon} setPokemonTocart={setPokemonTocart} successfulPurchase={successfulPurchase}/>
        </div> 
      </div>
    </>
  )
}

export default Home;
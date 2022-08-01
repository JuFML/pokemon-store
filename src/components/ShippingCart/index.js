import styles from './style.module.css'

const ShippingCart = (props) => {

  const shippingCartTotal = (props.pokemonToCart).map(pokemon => (
    pokemon.total
  ))

  const totalCart = shippingCartTotal.reduce( (previousValue, currentValue) => (
    previousValue + currentValue
  ), 0)

  return (
    <>
      <div className={styles.shippingcart__container}>
        <div className={styles.cart__container}>
          <div className={styles.cart__title}>
            <p>Carrinho</p>
          </div>          
          
            {props.pokemonToCart.map((pokemon, index) => (              
                (pokemon.name) &&
                <div key={index} className={styles.cart__item}>
                  <p>{pokemon.name} ({pokemon.qtde})</p> 
                  <p>R$ {pokemon.qtde * pokemon.price},00</p>
                </div>             
              )
            )}              
          
          <div className={styles.cart__footer}>
            <div className={styles.cart__sum}>          
              <p>TOTAL</p>              
              <p>R$ {totalCart},00</p>
            </div>

            <button disabled={totalCart === 0 ? true : false} className={styles.cart__btn} onClick={props.buy}>Finalizar</button>
          </div>  
        </div>
      </div>
    </>
  )
}

export default ShippingCart;
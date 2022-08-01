import { useEffect, useState } from 'react';
import styles from './style.module.css'

const Body = (props) => {
  const [pokemonsNames, setPokemonsNames] = useState([])
  const [pokemonDetails, setPokemonDetails] = useState({})
  const [pokemonImage, setPokemonImage] = useState("")
  const [showDetails, setshowDetails] = useState(false)

  const fetchPokemonName = async () => {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    return response.json()
  }  

  const fetchPokemontypes = async (index) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)
    const data = await response.json()
    return data
  }

  const pokemons = async () => {
    const name = await fetchPokemonName();
    setPokemonsNames([...name.results]);   
  } 

  const showPokemonImg = (index) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
  }

  const getPokemonTypes = async (index) => {
    const types = await fetchPokemontypes(index);
    await setPokemonDetails({...types});
  }


  const mountCardDetails = (index, name) => {
    setshowDetails(true)
    let image = showPokemonImg(index)
    setPokemonDetails(getPokemonTypes(index), image)
    setPokemonImage(image)
  }

  useEffect(() => {
    fetchPokemonName() 
    pokemons()
    
  }, [])

    {if(props.successfulPurchase) {
      return (
      <div className={styles.msg__container}>
        <div className={styles.msg__square}>
          <h1 className={styles.msg__square__title}>PARABÉNS!!</h1>
          <p className={styles.msg__square__parag}>Compra realizada com sucesso!!</p>
        </div>
      </div> 
      )
    } else if(showDetails) {
      return (
        <div className={styles.detail__container}>
          <div className={styles.detail__bcontainer}>
            <button className={styles.detail__backBtn} onClick={() => setshowDetails(false)}>Voltar</button>
          </div>
          <div className={styles.detail__container__body}>
            <div className={styles.bigcard__container}>
              <div className={styles.card__upper}>
                <img src={pokemonImage} />
              </div>
              <div className={styles.bigcard__down}>
                <div className={styles.bigcard__title__container}>
                  <h2>#{pokemonDetails.order}</h2>
                  <h2 className={styles.bigcard__title}>{pokemonDetails.name} - R$ 10,00</h2>                
                </div>
                <div className={styles.bigcard__types__container}>
                  {(pokemonDetails.types)?.map((type, index) => (
                      <p className={styles.bigcard__type} key={index}>{type.type.name}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )
    } else {     
      return (     
        <div className={styles.cards__container}>
          {pokemonsNames.map((pokemon, index) => (
          
            <div key={index}className={styles.card__container}>
              <div className={styles.card__upper}>
                <img src={showPokemonImg(index+1)} /> 
                </div>
              <div className={styles.card__down}>
                <p>{pokemon.name} - R$ 10,00</p>
                <div className={styles.card__btns}>
                  <button className={styles.card__btndetail} onClick={() => mountCardDetails(index+1, pokemon.name)}>Detalhes</button>
                  <button className={styles.card__btnbuy} onClick={() => props.buyPokemon(pokemon.name, 1, 10, 10)}>Comprar</button>
                </div>
              </div>
            </div> 
          ))}             
        </div>
      )
    }  
  }      
}

export default Body;
import axios from "axios";
import React, {useState, useEffect} from 'react';

function Pokemoncard ({endpoint}) {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(()=>{
        console.log(endpoint)
        async function fetchPokeData () {

            try{
                const {data} = await axios.get(endpoint);
                setPokemonData(data);

            }
            catch(e){
                console.error(e)
            }
        }

        fetchPokeData()

    },[endpoint]);

    return (
        <section className="poke-info">
            {pokemonData &&
                <>
                    <h2>{pokemonData.name}</h2>
                    <img
                        src={pokemonData.sprites.front_default}
                        alt="pokemon pic"
                    />
                    <p><strong>Moves: </strong>{pokemonData.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemonData.weight}</p>
                    <p><strong>Abilities: </strong></p>
                    <ul>
                        {pokemonData.abilities.map((ability)=>{
                            return (
                                <li key={`${ability.ability.name}-${pokemonData.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
        </section>
    )}

export default Pokemoncard;
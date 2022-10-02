import React, {useState, useEffect} from 'react';
import './App.css';
import Pokemoncard from "./components/Pokemoncard/Pokemoncard";
import Button from "./components/Button/Button";
import logo from "./assets/pokemon-logo.png"
import axios from "axios";

function App () {
    const [pokemonData, setPokemonData] = useState([]);
    const[endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");
    const[loading, toggleLoading] = useState(false);
    const[error, setError] = useState(false);

    useEffect(()=> {

        async function fetchPokeData() {
            toggleLoading(true);
            setError(false)

            try {
                const {data} = await axios.get(endpoint);
                setPokemonData(data)

            } catch (e) {
                console.error(e)
                setError(true);
            }
            toggleLoading(false)
        }

        fetchPokeData();

    },[endpoint]);

    return (
        <div className="pokemon-card">
            {pokemonData &&
                <>
                    <img alt="logo" width="400ox" src={logo}/>
                    <section className="button-bar">
                        <Button
                            type="button"
                            disabled={!pokemonData.previous}
                            clickHandler={()=>setEndpoint(pokemonData.previous)}
                        >Previous
                        </Button>
                        <Button
                            type="button"
                            disabled={!pokemonData.next}
                            clickHandler={()=>setEndpoint(pokemonData.next)}
                        >Next
                        </Button>
                    </section>
                    {pokemonData.results && pokemonData.results.map((poke)=>{
                        return <Pokemoncard endpoint={poke.url} key={poke.name}/>
                    })}
                </>
            }
            {loading && <p>Loading....</p>}
            {error && <p>Server error</p>}
        </div>
    );
}

export default App;

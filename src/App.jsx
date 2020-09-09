import React from "react";
import "./App.css";
import Pokemon from "./Pokemon.jsx";
import {sortPokemon,nameHL,filterPokemon} from "./utils"

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const getPokemon = () => fetch(URL_PATH).then((raw) => raw.json());

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      pokemons: [],
      userInput: "",
      maxCP: false,
    };
    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.handlerCheckBoxChange = this.handlerCheckBoxChange.bind(this);
    this.pokemonToShow = this.pokemonToShow.bind(this);
  }

  componentDidMount() {
      getPokemon().then((response) => {
      this.setState({
        pokemons: response,
        loading: false,
      });
    });
  }
  handlerInputChange(e) {
    const userInput = e.target.value.toLowerCase();
    this.setState({ userInput });
  }

  pokemonToShow() {
    const { userInput, pokemons, maxCP } = this.state;
    if (userInput === "") return [];
    let toShow = [...pokemons];
    if (maxCP) {
      toShow = toShow.sort((p1, p2) => p2.MaxCP - p1.MaxCP);
    }
    toShow = toShow
      .filter((pokemon) => filterPokemon(pokemon, userInput))
      .map((pokemon) => {
        return {
          ...pokemon,
          hlName: nameHL(pokemon.Name, userInput),
        };
      })
      .sort((p1, p2) => sortPokemon(p1, p2, userInput));
    toShow = toShow.slice(0, 4);
    return toShow;
  }

  handlerCheckBoxChange(e) {
    const maxCP = e.currentTarget.checked;
    this.setState({ maxCP });
  }

  toggleToShow() {}

  render() {
    const { loading, maxCP, userInput } = this.state;
    const toShow = this.pokemonToShow();
    return (
      <>
        <label htmlFor="maxCP" className="max-cp">
          <input
            type="checkbox"
            id="maxCP"
            checked={maxCP}
            onChange={this.handlerCheckBoxChange}
          />
          <small>Maximum Combat Points</small>
        </label>
        <input
          type="text"
          className="input"
          placeholder="Pokemon or type"
          onChange={this.handlerInputChange}
        />
        {loading && <div className="loader"></div>}

        {userInput !== "" && (
          <ul className="suggestions">
            {toShow.length ? (
              toShow.map((pokemon, index) => <Pokemon {...pokemon} key={`${index}-${pokemon.Name}`}/>)
            ) : (
              <li>
                <img
                  src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
                  alt=""
                />
                <div className="info">
                  <h1 className="no-results">No results</h1>
                </div>
              </li>
            )}
          </ul>
        )}
      </>
    );
  }
}

export default App;

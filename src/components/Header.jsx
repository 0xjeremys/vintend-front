import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Header({ handleToken, userToken, search, setSearch }) {
  return (
    <header className="header-container">
      <div>
        <Link to="/">
          <img className="logo-vinted" src={logo} alt="logo-vinted" />
        </Link>
      </div>

      <div className="search-container">
        <input
          type="search"
          placeholder="Recherche des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <span></span>
      </div>

      <div>
        {!userToken ? (
          <>
            <Link to="/signup">
              <button className="header-button button-signup">
                S&apos;inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="header-button button-connexion">
                Se connecter
              </button>
            </Link>
          </>
        ) : (
          <button
            className="header-button"
            onClick={() => {
              handleToken();
            }}
          >
            Deconnexion
          </button>
        )}
      </div>
      <div>
        <Link to={userToken ? "/publish" : "/login"}>
          <button className="header-button-sold">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
}

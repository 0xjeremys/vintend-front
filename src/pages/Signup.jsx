import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup({ handleToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsLetter,
        }
      );

      //   console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>S&apos;inscrire</h1>
        <input
          className="signup-form-input"
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="signup-form-input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="signup-form-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              checked={newsLetter}
              onChange={() => {
                setNewsLetter(!newsLetter);
              }}
            />
            <span>S&apos;inscrire à notre newsletter</span>
          </div>
          <p>
            En m&apos;inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <input className="signup-button" type="submit" value="S'inscrire" />
        <Link className="link-style-signup" to={"/login"}>
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ handleToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
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
      <h2>Se connecter</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-form-input"
          type="mail"
          placeholder="mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="signup-form-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input className="signup-button" type="submit" value="Se connecter" />
        <Link className="link-style-signup" to={"/signup"}>
          Pas encore de compte ? inscris-toi!
        </Link>
      </form>
    </div>
  );
}

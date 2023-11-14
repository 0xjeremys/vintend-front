import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Publish({ userToken }) {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setplace] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return userToken ? (
    <div className="publish-container">
      <label htmlFor="picture-input">ajoute une photo</label>

      <input
        //   multiple
        style={{ display: "none" }}
        id="picture-input"
        type="file"
        onChange={(event) => {
          setPicture(event.target.files[0]);
        }}
      />
      {picture && (
        <img
          style={{ height: "100px" }}
          src={URL.createObjectURL(picture)}
          alt="test"
        />
      )}

      {/* l'api du reacteur ne doit pas prendre en charges l'upload de deux images sur une annonce essayer plus tard sur la mienne
       */}
      {/* <input
        type="file"
        style={{ display: "none" }}
        id="picture-input"
        onChange={(event) => {
          const files = Array.from(event.target.files);
          setPictures(files);
        }}
        multiple
      />
      {pictures && pictures.length > 0 && (
        <div>
          {pictures.map((picture, index) => (
            <img
              key={index}
              style={{ height: "120px", marginRight: "5px" }}
              src={URL.createObjectURL(picture)}
              alt={`picture-${index}`}
            />
          ))}
        </div>
      )} */}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <textarea
        cols="41"
        rows="12"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Marque"
        value={brand}
        onChange={(event) => {
          setBrand(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Taille"
        value={size}
        onChange={(event) => {
          setSize(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Couleur"
        value={color}
        onChange={(event) => {
          setColor(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Etat"
        value={condition}
        onChange={(event) => {
          setCondition(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Lieu"
        value={place}
        onChange={(event) => {
          setplace(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
      <button onClick={handleSubmit}> publier </button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

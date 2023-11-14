import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Offer() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="offer-body">
      <main className="offer-container">
        <div className="offer-pictures">
          <img
            className="offer-picture"
            src={data.product_image.secure_url}
            alt=""
          />
        </div>
        <div className="offer-infos">
          <div>
            <p className="offer-price">{data.product_price} €</p>
            {data.product_details.map((detail) => {
              const clefs = Object.keys(detail);
              const clef = clefs[0];
              return (
                <ul key={clef} className="offer-list">
                  <li>
                    <span className="offer-list-item">{clef}</span>
                    <span className="offer-list-item-result">
                      {detail[clef]}
                    </span>
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="offer-name">{data.product_name}</p>
            <p className="offer-description">{data.product_description}</p>
            <div className="offer-avatar-username">
              <img
                src={
                  data.owner.account.avatar?.secure_url ??
                  "https://imgs.search.brave.com/HiDb3EbsYxjhE-4jwqb1Kc4QXgZrKKl6kHFh0Fl8tYQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbWVzc2VuZ2Vy/LWFuZC1zb2NpZXR5/LzE2L3VzZXJfcGVy/c29uX2F2YXRhcl91/bmlzZXgtMTI4LnBu/Zw"
                }
                alt="avatar"
              />
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <Link to="/payment">
            <button className="offer-infos-button">Acheter</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

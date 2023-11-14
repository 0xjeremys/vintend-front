/*packages*/
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import banner from "../assets/images/banner.png";
/* components*/

export default function Home({ search }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <span> is Loading... </span>
  ) : (
    <div>
      <div className="home-hero">
        <img src={banner} alt="" className="home-hero-bg-img" />
        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <Link to={"/signup"}>
              <button>Commencer a vendre</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="home-wrapper">
        {data.offers.map((product, id) => {
          const avatarUrl =
            product.owner.account.avatar?.secure_url ??
            "https://imgs.search.brave.com/HiDb3EbsYxjhE-4jwqb1Kc4QXgZrKKl6kHFh0Fl8tYQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbWVzc2VuZ2Vy/LWFuZC1zb2NpZXR5/LzE2L3VzZXJfcGVy/c29uX2F2YXRhcl91/bmlzZXgtMTI4LnBu/Zw";

          return (
            <div className="card-container" key={id}>
              <div className="card-avatar-username">
                <img src={avatarUrl} alt="Avatar" />

                <span>{product.owner.account.username}</span>
              </div>
              <Link to={`/offers/${product._id}`} className="link-style-offers">
                <img
                  className="card-container-images"
                  src={product.product_pictures[0].url}
                  alt={product.product_name}
                />
                <div className="card-price-size-brand">
                  <span className="card-fz-price">
                    {product.product_price} €
                  </span>
                  <span className="card-font-size-grey">
                    {product.product_details[1].TAILLE ?? "N/A"}
                  </span>
                  <span className="card-font-size-grey">
                    {product.product_details[0].MARQUE ?? "N/A"}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

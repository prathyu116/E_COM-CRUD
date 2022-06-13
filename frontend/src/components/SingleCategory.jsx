import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Category from "./Category";
const Allproducts = () => {
  const [data, setdata] = useState([]);
  const {category} = useParams()
  useEffect(() => {
    getAllData();
  }, [category]);

  async function getAllData() {
    await axios
      .get(`http://localhost:5000/products/${category}`)
      .then(function (response) {
        // handle success
        setdata(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div>
      <Category />

      <div className="container mt-5">
        <div className="row">
          {data.map((itm) => {
            console.log(itm);
            return (
              <div className="col col-md-6 col-lg-4 py-3">
                <div class="card" style={{ width: "350px" }}>
                  <img src={itm.img} style={{ width: "150px" }} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h6 class="card-title text-secondary">{itm.brand.brand_name}</h6>
                    <p class="card-text">{itm.pdt_name}</p>
                    <h3 class="card-text">Rs.{itm.price}</h3>
                    <p>⭐{itm.reviews ? itm.reviews.reduce((a, b) => a + b.rating, 0) / itm.reviews.length : ""}</p>

                    <button class="btn btn-primary">Add To Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;

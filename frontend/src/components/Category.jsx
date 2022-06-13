import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, navi, Navigate } from "react-router-dom";
const Category = () => {
  const [catdata, setCatdata] = useState([]);
  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    await axios
      .get("http://localhost:5000/category/")
      .then(function (response) {
        // handle success
        setCatdata(response.data.data);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  return (
    <div className="d-flex flex-row justify-content-around">
      {catdata.map((itm) => {
                    console.log(itm);

        return (
          <Link to={`/${itm._id}`}>
            <div className="card d-flex flex-column justify-content-center align-items-center border-0" style={{ width: "5rem" }}>
              <img src={itm.category_img} className="card-img-top rounded-circle" alt="..." />
              <div className="card-body">
                <p className="card-text">{itm.category_name}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;

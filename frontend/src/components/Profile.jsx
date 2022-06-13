import React, { useState } from "react";
import { useEffect } from "react";
import "./Profile.css";
const Profile = () => {
  const [addrData, setaddrData] = useState({});
  const [showAddress, setShowAddress] = useState([]);
  const [currentId, setCurrId] = useState(0);
  let USERNAME = JSON.parse(localStorage.getItem("USERNAME"));
  let USERID = JSON.parse(localStorage.getItem("USERID"));
  const state = currentId ? showAddress.find((data) => data._id === currentId) : null;

  useEffect(() => {
    getAllAddress();
  }, []);

  useEffect(() => {
    if (state) setaddrData(state);
  }, [state]);

  console.log("state", state);
  const handleAddress = (e) => {
    setaddrData({
      ...addrData,
      [e.target.id]: e.target.value,
    });
  };
  const getAllAddress = async () => {
    let res = await fetch(`http://localhost:5000/users/${USERID}/addresses`).then((res) => res.json());
    setShowAddress(res.address);
  };

  const submitAddress = async () => {
    if (currentId !== 0) {
      let res = await fetch(`http://localhost:5000/users/${USERID}/addresses/${addrData._id}/edit`, {
        method: "PATCH",
        body: JSON.stringify(addrData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      alert("UPDATING");

      setShowAddress(res.data);
      setCurrId(0);
      setaddrData({ line_1: "", line_2: "", city: "", state: "", PIN: "" });
    } else {
      fetch(`http://localhost:5000/users/${USERID}/addresses/create`, {
        body: JSON.stringify(addrData),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(() => {
          alert("CREATED");

          getAllAddress();
        })
        .then(() => {
          setCurrId(0);
          setaddrData({ line_1: "", line_2: "", city: "", state: "", PIN: "" });
        });
    }
  };
  const deleteAddres = async (ida) => {
    if (window.confirm("You want to delette ?")) {
      var res = await fetch(`http://localhost:5000/users/${USERID}/addresses/${ida}/delete`, {
        method: "DELETE",
      }).then((res) => res.json());

      setShowAddress(res.addresses);
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="left-side">
          <div className="image">
            <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
          </div>
          <div className="left">
            <p>Hello,</p>
            <h3>{USERNAME}</h3>
          </div>
        </div>

        <div className="right-side">
          <div className="login-From">
            {currentId ? <h2>Edit Current Delivary Details</h2> : <h2>Add Delivary Details</h2>}
            <input onChange={handleAddress} type="text" placeholder="Enter line1" id="line_1" value={addrData.line_1} />
            <input onChange={handleAddress} type="text" placeholder="Enter line2" id="line_2" value={addrData.line_2} />
            <input onChange={handleAddress} type="text" placeholder="Enter city" id="city" value={addrData.city} />
            <input onChange={handleAddress} type="text" placeholder="Enter state" id="state" value={addrData.state} />
            <input onChange={handleAddress} type="number" placeholder="Enter PIN" id="PIN" value={addrData.PIN} />
            <button onClick={submitAddress}>{currentId ? "EDIT" : "ADD"}</button>
          </div>
        </div>
        <div className="extreme">
          <h3> All Address</h3>
          {showAddress.length !== 0
            ? showAddress.map((itm) => {
                return (
                  <>
                    <div className="eachAddres">
                      <div className="right-add">
                        <h6>Address-Line1:{itm.line_1}</h6>
                        <h6>Address-Line2:{itm.line_2}</h6>
                        <h6>City:{itm.city}</h6>
                        <h6>State:{itm.state}</h6>
                        <h6>PIN:{itm.PIN}</h6>
                      </div>
                      <div className="left-add">
                        <button
                          onClick={() => {
                            setCurrId(itm._id);
                          }}
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => {
                            deleteAddres(itm._id);
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Profile;

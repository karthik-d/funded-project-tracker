import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Header from "../header";
import React, { useState, useEffect, Component } from "react";
import user from "../../../FPTrack-backend/models/user";
import userStyles from "../guest/styles/view_user.module.css";
import UserCard from "../../components/UserCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProposalCard from "../../components/ProposalCard";
import useSWR from "swr";
// todo: represent multi-valued fields suitably
// todo: display member names suitably
// todo: rename tabe headers to user readables

const zip = (arr1, arr2) => {
  console.log("zip function==>");
  console.log(arr1, "hh", arr2);
  return arr1.map((elem, idx) => {
    return [elem, arr2[idx]];
  });
};

function Tabulate({ props }) {
  return (
    <div className={styles.tabulate}>
      <table>
        <thead>
          <tr id="header" key="header">
            {props.keys.map((key) => {
              return <th key={key}>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody id="objects">
          {props.values.map((proj_row) => {
            return (
              <tr key={proj_row[0][0]}>
                {proj_row[0].map((val, idx) => {
                  return <td key={idx}>{val}</td>;
                })}
                {
                  <td>
                    <a href={proj_row[1]}>View Project</a>
                  </td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function viewprojects() {
  const types = [
    { key: "funding_agency", name: "funding_agency" },
    { key: "title", name: "title" },
  ];
  const [values, setValues] = useState([]);
  const [keys, setKeys] = useState([]);
  const [uris, setUris] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(types[0]["key"]);
  const [counter, setCounter] = useState(0);
  // let Values,Keys,Uris;
  // let payload;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/proposal/",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const handleSubmit = (e) => {
    e.preventDefault();
    setCounter(counter + 1); // just to trigger reload
    var HREF = e.target.getAttribute("href");
    console.log("href", HREF);
    console.log(HREF.split("/"));
    var x = parseInt(prompt("Enter approved budget", "0"));
    var y = parseInt(prompt("Enter approved duration", "0"));
    if (data) {
      var data = {
        proposal: HREF.split("/")[4],
        approved_budget: x, //handle error
        approved_duration: y, // handle error
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:3000/api/project", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log("hi", data));
    }
  };
  // Todo: Make objects multiple array sets
  return (
    <div id="vieusers">
      <Header></Header>
      <div style={{ margin: "auto" }}>
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter Post Title"
        />
        <select
          id="search_key"
          onChange={(event) => setType(event.target.value)}
        >
          {types.map((obj) => {
            return <option value={obj.key}> {obj.name}</option>;
          })}
        </select>
      </div>
      <div className={userStyles.users_wrapper}>
        {data.map((obj) => {
          let temp = obj[type];

          if (
            String(temp).toLowerCase().includes(query.toLowerCase()) &&
            obj.reject_date == null &&
            obj.accept_date == null
          )
            return (
              <div>
                <ProposalCard props={obj} />
                <button onClick={handleSubmit}>
                  <a id={counter} href={"//localhost:3000/proposal/" + obj._id}>
                    Accept
                  </a>
                </button>
              </div>
            );
        })}
      </div>
      {/* <Tabulate props={payload} /> */}
    </div>
  );
}

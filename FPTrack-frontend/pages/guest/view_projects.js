import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Header from "../header";
import React, { useState, useEffect, Component } from "react";
import user from "../../../FPTrack-backend/models/user";
import userStyles from "./styles/view_user.module.css";
import UserCard from "../../components/UserCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard";

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
  const [values, setValues] = useState([]);
  const [keys, setKeys] = useState([]);
  const [uris, setUris] = useState([]);
  // let Values,Keys,Uris;
  // let payload;
  const [payload, setPayload] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/api/project")
      .then((response) => response.json())
      .then((jsondata) => {
        var all_data = JSON.parse(JSON.stringify(jsondata));
        var proposal_data = all_data.map(function (project) {
          return project.proposal;
        });

        var project_fields = [
          "_id", //0
          "approved_budget", //1
          "approved_duration", //2
          "completed_on", //3
          "status_updates", //4
          "outcomes", //5
        ];
        // TODO: add member names
        var proposal_fields = [
          "title", //6
          "domains", //7
          "leader", //8
          "funding_type", //9
          "funding_agency", //10
        ];

        var all_values = [];
        var uris_list = [];
        all_data.forEach(function (project) {
          let local_values = [];
          project_fields.forEach(function (key) {
            local_values.push(project[key]);
          });
          proposal_fields.forEach(function (key) {
            local_values.push(project.proposal[key]);
          });
          all_values.push(local_values);
          uris_list.push(project.url);
        });
        var all_fields = project_fields.concat(proposal_fields);

        //Karthik D : check the below code !
        // console.log("before setting states:keys====uris===values")
        // console.log(all_fields);
        // console.log(uris_list);
        // console.log(all_values);

        // setValues(all_values);
        // setKeys(all_fields);
        // setUris(uris_list); // ?doubt how is it working

        // console.log("after setting states:keys====uris===values")
        // console.log(keys);
        // console.log(uris);
        // console.log(values);
        let payload1 = {
          values: zip(all_values, uris_list),
          keys: all_fields,
          link_objects: 1,
        };
        // setPayload(zip(all_values, uris));
        setPayload(payload1["values"]);
        console.log("after setting payload,");
        console.log(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const types = [
    { key: 6, name: "name" },
    { key: 7, name: "funding" },
  ];
  const [query, setQuery] = useState("");
  const [type, setType] = useState(types[0]["key"]);
  useEffect(() => {
    fetchData();
  }, []);

  // Todo: Make objects multiple array sets

  console.log("Payload", payload);
  if (payload.length == 0) {
    return "laoding";
  }
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
        {payload.map((obj) => {
          let temp = obj[0][parseInt(type)];

          if (String(temp).includes(query)) return <ProjectCard {...obj} />;
        })}
      </div>
      {/* <Tabulate props={payload} /> */}
    </div>
  );
}

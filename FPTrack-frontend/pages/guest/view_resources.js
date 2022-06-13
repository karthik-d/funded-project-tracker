import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import styles1 from "../guest/styles/view_resources.module.css";
import Link from "next/link";
import Header from "../header";
import React, { useState, useEffect, Component } from "react";
import user from "../../../FPTrack-backend/models/user";
import ResourceCard from "../../components/ResourceCard";

function Tabulate({ props }) {
  return (
    <div className={styles.tabulate}>
      <table className={styles1.resourcetable}>
        <thead id="">
          <tr id="header" key="header">
            {props.keys.map((key) => {
              return <th className={styles1.tableHead} key={key}>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody className={styles1.tableBody} id="objects">
          {props.objects.map((obj) => {
            return (
              <tr key={obj._id}>
                {props.keys.map((key) => {
                  return <td key={key}>{obj[key]}</td>;
                })}
              </tr>
            );

          })}
        </tbody>
      </table>
    </div>
  );
}

export default function viewusers() {
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/api/resource-group")
      .then((response) => response.json())
      .then((jsondata) => {
        setUsers(JSON.parse(JSON.stringify(jsondata)));
        const arr = [];
        for (var key in jsondata[0]) {
          if (jsondata[0].hasOwnProperty(key)) {
            var val = jsondata[0][key];
            arr.push(key);
          }
        }
        console.log(arr);
        setKeys(arr);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let temp = { objects: users, keys: ["name", "description", "kind", "avl_qty"] };

  return (
    <div id="viewusers">
      <Header></Header>
      {/* {temp["objects"].map(obj=>{
        return <ResourceCard {...obj}/>
    })} */}
      <Tabulate props={temp} />
    </div>
  );
}

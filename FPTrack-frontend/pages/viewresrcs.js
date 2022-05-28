import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Header from './header';
import React, { useState, useEffect, Component } from 'react';
import user from '../../FPTrack-backend/models/user';


function Tabulate({props}){
    return (<div className = {styles.tabulate}>
    <table >
      <thead id ="">
        <tr id="header">
        <th>_id</th>
        <th>resource_group</th>
        <th>remarks</th>
        <th>scan_code</th>
        <th>expiry</th>
        <th>faulted_at</th>
        <th>deleted_at</th>
        <th>createdAt</th>
        <th>updatedAt</th>
        <th>__v</th>
        </tr>
      </thead>
      <tbody id="resources">
      {props.map(obj=>{ 
        return (<tr id={obj._id}>
        <th>{obj._id}</th>
        <th>{obj.resource_group}</th>
        <th>{obj.remarks}</th>
        <th>{obj.scan_code}</th>
        <th>{obj.expiry}</th>
        <th>{obj.faulted_at}</th>
        <th>{obj.deleted_at}</th>
        <th>{obj.createdAt}</th>
        <th>{obj.updatedAt}</th>
        <th>{obj.__v}</th>
        </tr>);
        })}
      </tbody>
    </table>
    </div>
     
    );
}

export default function viewusers()  {
    const [objarr, setObjarr] = useState([]);
    const [keys,setKeys] = useState([]);
        const fetchData = () => {
          fetch("http://localhost:3000/api/resource")
          .then(response => response.json())
          .then(jsondata => {setObjarr(JSON.parse(JSON.stringify(jsondata)));
            const arr = []
            for (var key in jsondata[0]) {
                if (jsondata[0].hasOwnProperty(key)) {
                  var val = jsondata[0][key];
                  arr.push(key);
            }
            }
            setKeys(arr);
        }
            );
        }
    

        useEffect(() => {
          fetchData()
        }, []);
        
        let temp = objarr;

return (
    <div id="vieusers">
    <Header></Header>
    <Tabulate props={temp}/>;
    </div>

);

}
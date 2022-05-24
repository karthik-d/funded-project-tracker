import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Header from './header';
import React, { useState, useEffect, Component } from 'react';
import user from '../../FPTrack-backend/models/user';


function obje(props){
    return (
    <tr>
        props.user .map(([key, value]) => {
                <td>{value}</td>
        });

        </tr>
    );
}

export default function viewusers()  {
    const [users, setUsers] = useState([]);
    const keys = null;
        const fetchData = () => {
          fetch("http://localhost:3000/api/user")
          .then(response => response.json())
          .then(jsondata => {setUsers(jsondata);console.log(jsondata);
            const arr = []
            for (var key in jsondata[0]) {
                if (jsondata[0].hasOwnProperty(key)) {
                  var val = jsondata[0][key];
                  arr.push(key);
            }
            }
            keys=arr;
        }
            );
        }
    

        useEffect(() => {
          fetchData()
        }, []);
        


return (
    <div>
    <Header></Header>
            <ul>
          {users.map(user => (
           <obje key={keys} val={user}/> 
          ))}
        </ul>
      
    </div>

);

}
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Header from '../header';
import React, { useState, useEffect, Component } from 'react';
import user from '../../../FPTrack-backend/models/user';


function Tabulate({props}){
    return (<div className = {styles.tabulate}>
    <table>
      <thead id ="">
        <tr id="header" key = "header">
        {props.keys.map(key=>{
          return (<th key = {key}>{key}</th>);
        })}
        </tr>
      </thead>
      <tbody id="objects">
      {props.objects.map(obj=>{ 
        return (<tr key={obj._id}>
          {props.keys.map(key=>{
            return (<td key = {key}>{obj[key]}</td>);
          })}
          </tr>);
        })}
      </tbody>
    </table>
    </div>
     
    );
}

export default function viewusers()  {
    const [users, setUsers] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [keys,setKeys] = useState([]);
    const [proposalKeys, setProposalKeys] = useState([]);
    const fetchData = () => {
    	fetch("http://localhost:3000/api/project")
		.then(response => response.json())
        .then(jsondata => {
        	console.log("Gold Jagz");
        	setUsers(JSON.parse(JSON.stringify(jsondata)));
        	var proposal_objs = jsondata.map(
    			function (project){
    				return project.proposal;
    			}
    		)
        	setProposals(proposal_objs);
        	const main_fields = [ 
		    	"_id", 
		    	"approved_budget",
		    	"approved_duration",
		    	"completed_on", 
				"status_updates",
				"outcomes"
			];
			// add member names
			const sub_fields = [
				"domains",
				"funding_type",
				"funding_agency",
			];
        	setKeys(main_fields);
        	setProposalKeys(sub_fields);
        	
        })
	}
    

        useEffect(() => {
          fetchData()
        }, []);
        
        console.log("hello 5");
        console.log(proposals);
        console.log(users);
        // Todo: Make objects multiple array sets
        let temp = {"objects":users,"keys":keys, "link_objects":1};

return (
    <div id="vieusers">
    <Header></Header>
    <Tabulate props={temp}/>;
    </div>

);

}

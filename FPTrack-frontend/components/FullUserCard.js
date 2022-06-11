import React,{ useState } from 'react';
import styles from '../components/styles/FullProjectCard.module.css'
import userStyles from '../components/styles/UserCard.module.css'
import useCollapse from 'react-collapsed';
import Usercard from '../components/UserCard';
import useSWR from 'swr'
import Popup from 'reactjs-popup';
import { Document, Page } from 'react-pdf';



function Usercard_byid(props){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR("http://localhost:3000/api/user/"+props.props, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    return (
        <Usercard {...data[0]}/>
    );
}
function Idlist_usercard(props){
    console.log("IDlist",props);
    return (props.props.map(obj=>{
        return <Usercard_byid props={obj}/>;})
        );

}
function Members(props){
 
    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
    
    return ( <div className="collapsible">
    <div className="header" {...getToggleProps()}>
        <h1>{isExpanded ? 'Collapse Members' : 'Expand Members'}</h1>
    </div>
    <div {...getCollapseProps()}>
    <div style={{display: "flex","flex-direction": "row"}}>
        <Idlist_usercard props={props.props}/>
    </div>
    </div>
    </div>);
}
function Leader(props){
 
    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
    
    return ( <div className="collapsible">
    <div className="header" {...getToggleProps()}>
        <h1>{isExpanded ? 'Collapse Leader' : 'Expand Leader'}</h1>
    </div>
    <div {...getCollapseProps()}>
    <div style={{display: "flex","flex-direction": "row"}}>
        <Idlist_usercard props={[props.props]}/>
    </div>
    </div>
    </div>);
}

////comment
function Supervisors(props){
 
    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
    
    return ( <div className="collapsible">
    <div className="header" {...getToggleProps()}>
        <h1>{isExpanded ? 'Collapse Supervisors' : 'Expand Supervisors'}</h1>
    </div>
    <div {...getCollapseProps()}>
    <div style={{display: "flex","flex-direction": "row"}}>
        <Idlist_usercard props={[props.props]}/>
    </div>
    </div>
    </div>);
}

export default function FullUser(props){
    console.log("porps",props); 
     return (
        <div>
            <div><span>Name: </span>{props.props.proposal.title}</div>
            <div>Access: {props.props.proposal.domains.map(obj=>{return obj+",";})}</div>
            <div>Project Roles</div>
            <div>Supervisor</div>
            <div>Leader</div>
            <div>Member<ib/div>
        </div>
    );

}
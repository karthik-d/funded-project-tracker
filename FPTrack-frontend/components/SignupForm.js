import styles from './styles/SignupForm.module.css';
import axios from 'axios';
import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Message from '../components/GeneralMessage';
import { Redirect } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.data = {
            rights: [
                { name: "Admin", id: "admin" },
                { name: "User", id: "user" },
                { name: "Resource Manager", id: "rsrc_mgr" }
            ],
            roles: [
                { value: 'student', label: 'Student' },
                { value: 'faculty', label: 'Faculty' }
            ]
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const req ={
        "first_name":document.getElementById("first_name").value,
        "last_name":document.getElementById("last_name").value,
        "role":document.getElementById("role").value,
        "access":document.getElementById("access").value,
        "date_of_birth":document.getElementById("date_of_birth").value,
        "email":document.getElementById("email").value,
        
        } 
        axios.post('http://localhost:3000/api/user', req)
          .then(res=>{
            console.log(res);
            console.log(res.data);
            <Redirect Component={() => <Message props = {res.data.message}/> }/>
        // render(){
        //         return <Message props = {res.data.message} />;
        //##HELP
        //       }
          })
          
      }

    render() {
        return (
            <div id ="signup" className={styles.content}>
                <h2 className={styles.h2}>Hey, {this.props.name}!<br />Just a few more details...</h2>
                <div className={styles.wrapper}>
                    <div className={styles.content} >
                        <form id = "FORM" action="http://localhost:3000/api/user" className={styles.form} method="post">
                            <div className={styles.user_details}>
                                {/* <div className={styles.input_box}>
                                    <span className={styles.details}>Username</span>
                                    <input type="text" placeholder="Enter your username" required />
                                </div> */}
                               <div style={{display: "flex","justify-content": "space-between"}} >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>First Name</span>
                                    <input id ="first_name"name ="first_name" type="text"></input>
                                </div >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>Last Name</span>
                                    <input id ="last_name" name ="last_name" type="text"></input>
                                </div >
                                </div>
                            <center>
                                <div className={styles.input_box}>
                                    < span className={styles.details}>Role</span>
                                    <select id = "role" style={{ width: "100%", height: "100%","font-size":"18px","font-weight": "500"}} name="role">
                                        {
                                        this.data.roles.map(obj => {
                                            return (<option value ={obj.value}>{obj.value}</option>);
                                        }) }
                                    </select>
                                </div >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>Access Rights</span>
                                    <Multiselect name = "access" id ="access"
                                        style={{
                                            searchBox: { // To change search box element look
                                                border: "none"
                                              },
                                            multiselectContainer: {
                                                width: 'fit-content',
                                                background: "white"
                                            },
                                            option: { // To change css for dropdown options
                                                color: "black",
                                              }
                                        }}
                                        options={this.data.rights}
                                        displayValue="name"
                                        
                                    />
                                </div >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>D.O.B</span>
                                    <input id = "date_of_birth" name ="date_of_birth" type="date"></input>
                            </div >
                            
                            <div className={styles.input_box}>
                                    < span className={styles.details}>Email</span>
                                    <input id ="email" name ="email" type="email" style={{display:"block",width:"100%"}}></input>
                            </div>
                            </center>
                            </div>
                            <div className={styles.button}>
                                < input type="submit" onClick={this.handleSubmit} value="Register" />
                            </div >
                        </form>
                    </div>
                </div >
            </div >
        );
    }
}




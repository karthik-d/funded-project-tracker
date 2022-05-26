
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import Link from 'next/link';
import { Multiselect } from 'multiselect-react-dropdown';
import { Component } from 'react';
// title = "IoT Driven Smart Trains",
//         decription = "blah blah blah...",
//         domains = ['iot', 'machine_learning'],
//         supervisors = ['admin@admin.com', 'test@admin.com'],
//         leader = 'ben@gmail.com',
//         members = ['claire@gmail.com', 'derek@gmail.com'],
//         funding_type = 'internal',
//         funding_agency = 'SSN Trust',
//         pdf_document = pdf_doc_b64_string,
//         budget = 10000
export default class onProposal extends Component{
  constructor(props) {
    super();
   this.data = {
    domains: [{name: 'ML', id: 1},{name: 'webdev', id: 2}]
};  
this.fileChangedHandler = (event) => {
  let file_size = event.target.files[0].size;
  console.log(file_size);
  if(file_size >8451576) // approx 8MB
  {  event.target.value = "";
    alert("File size should be less than 8Mb");
  }
  
 //do whatever operation you want to do here
};
  }
  render(){
  return(
    <div className={styles.onProposal}>
        <Header></Header>
        
      <center>        
        <form action="http://localhost:3000/api/proposal" className ={styles.proposalForm} method ="post">
          
          <legend>
            <h1> Project proposal </h1>
          </legend>
  
              <label>Title:<br/> <input type = "text" name = "title"/></label><br/>
              <label>Description<br/>
              <textarea name="description"></textarea> </label> <br/>
              <label>Domains: <Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
              style={{ // To change css for multiselect (Width,height,etc..)
                multiselectContainer: {
                  width : 'fit-content'
                }
                }}
              options={this.data.domains} // Options to display in the dropdown
              // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              // onSelect={this.onSelect} // Function will trigger on select event
              // onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              /> </label><br/>

              <label>Supervisors<br/>
              <textarea name ="supervisors"></textarea> </label><br/>
              <label>Leader<br/><input name ="leader" type="email"/></label><br/>
              <label>Members<br/>
              <textarea name = "members"></textarea> </label><br/>
              <label >Funding_type<br/>
                <select name="funding_type">
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </select></label>
              <label>Funding_agency<br/><input name="funding_agency" type="text"/></label><br/>
              <label>File upload<br/><input name="pdf_document" type="file" accept="application/pdf" onChange={this.fileChangedHandler}/></label><br/>
              <label>Budget<br/><input name="budget" type="number" min="1"/></label><br/>
              <input type="submit"/>
 
      </form></center>

      </div>
    );}
}

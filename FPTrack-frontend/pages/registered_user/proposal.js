import styles from './styles/proposal.module.css';
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../../styles/Home.module.css'
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
export default class onProposal extends Component {
  constructor(props) {
    super();
    this.data = {
      domains: [{ name: 'machine_learning', id: 1 }, { name: 'web_development', id: 2 }, { name: 'iot', id: 3 }, { name: 'computer_vision', }]
    };
    this.fileChangedHandler = (event) => {
      let file_size = event.target.files[0].size;
      console.log(file_size);
      if (file_size > 8451576) // approx 8MB
      {
        event.target.value = "";
        alert("File size should be less than 8Mb");
      }

      //do whatever operation you want to do here
    };
  }
  render() {
    return (
      <div className={styles.onProposal}>
        <Header></Header>

        <center className={styles.outermargin}>
          <div className={styles.formarea}>
          <form action="http://localhost:3000/api/proposal" className={styles.proposalForm} method="post">

<legend>
  <h1 className={styles.titleh1}> Project Proposal </h1>
</legend>

<label className={styles.titletag}>Title<br /></label>
<input className={styles.projtitle} type="text" name="title" /><br /><br />

<label className={styles.titletag}>Description<br /></label> 
<textarea name="description"></textarea><br /><br />

<label className={styles.titletag}>Domains: <br /></label>
<Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
  style={{ // To change css for multiselect (Width,height,etc..)
    multiselectContainer: {
      width: 'fit-content',
    }
  }}
  options={this.data.domains} // Options to display in the dropdown
  // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
  // onSelect={this.onSelect} // Function will trigger on select event
  // onRemove={this.onRemove} // Function will trigger on remove event
  displayValue="name" // Property name to display in the dropdown options
/> <br />

<label className={styles.titletag}>Supervisors<br /></label>
<textarea name="supervisors"></textarea> <br /><br />

<label className={styles.titletag}>Leader<br /></label>
<input name="leader" type="email" /><br /><br />

<label className={styles.titletag}>Members<br /></label>
<textarea name="members"></textarea><br /><br />

<label className={styles.titletag}>Funding Type<br /></label>
  <select className={styles.selectfundingtype} name="funding_type">
    <option value="internal">Internal</option>
    <option value="external">External</option>
  </select><br /><br />

<label className={styles.titletag}>Funding Agency<br /></label>
<input name="funding_agency" type="text" /><br /><br />

<label className={styles.titletag}>Proposal Document<br /></label>
<input name="pdf_document" type="file" accept="application/pdf" onChange={this.fileChangedHandler} /><br /><br />

<label className={styles.titletag}>Budget<br /></label>
<input name="budget" type="number" min="1" /><br /><br />

<input className={styles.buttonsubmit} type="submit"></input>
<br></br>
<br></br>
<button className={styles.buttonsubmit} role="button">Submit Details</button>

</form>
          </div>
          </center>

      </div>
    );
  }
}

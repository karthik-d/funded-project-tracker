import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Header from "../header";
import Link from "next/link";
import { Multiselect } from "multiselect-react-dropdown";
import { Component, useEffect, useState, useRef } from "react";
import loadingGif from "../../src/assets/loading.gif";
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
export default function onProposal(props) {
  const [emails, setMail] = useState([]);
  const [faculties, SetFaculties] = useState([]);
  const [isrendered, setRendered] = useState(false);
  const data = {
    domains: [
      { name: "machine_learning", id: 1 },
      { name: "web_development", id: 2 },
      { name: "iot", id: 3 },
      { name: "computer_vision", id: 4 },
    ],
    members: [],
    faculty: [],
  };
  const domainselectRef = useRef();
  const memberselectRef = useRef();
  const supervisorselectRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    let data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      domains: domainselectRef.current.getSelectedItems().map((obj) => {
        return obj.name;
      }),
      supervisors: supervisorselectRef.current.getSelectedItems().map((obj) => {
        return obj.name;
      }),
      // the user type of leader determines if project is Student project or Faculty project
      leader: document.getElementById("leader").value,
      members: memberselectRef.current.getSelectedItems().map((obj) => {
        return obj.name;
      }),

      funding_type: document.getElementById("funding_type").value,
      // TODO: Convert this to an enum type with possibility of adding new fuding agencies??
      funding_agency: document.getElementById("funding_agency").value,
      // Accepts file sizes upto 16MB -- Indicate limit as 8MB on Frontend
      // Transit as Base64 string on JSON
      pdf_document: document.getElementById("pdf_document").files,
      budget: document.getElementById("budget").value,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/api/proposal", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    new Promise((resolve, reject) => {
      fetch("http://localhost:3000/api/user?role=faculty")
        .then((response) => response.json())
        .then((jsondata) => {
          var all_data = JSON.parse(JSON.stringify(jsondata));
          // console.log(all_data);
          resolve(all_data);
        });
    }).then((data1) => {
      var arr = [];
      var i = 1,
        j = 1;
      data1.forEach((d) => {
        // console.log(this.data.supervisor);
        if (d.role == "faculty") {
          j++;
          data["faculty"].push({ name: d.email, id: j });
        }
        data.members.push({ name: d.email, id: i });
        arr.push({ name: d.email, id: i });
        // console.log(d.email);
        i++;
      });

      console.log(arr);
      //data.add({supervisor : arr});
      setMail(arr);
      SetFaculties(data.faculty);
      // return arr;
    });
  }, [isrendered]);
  const fileChangedHandler = (event) => {
    let file_size = event.target.files[0].size;
    console.log(file_size);
    if (file_size > 8451576) {
      // approx 8MB
      event.target.value = "";
      alert("File size should be less than 8Mb");
    }

    //do whatever operation you want to do here
  };
  if (isrendered == false) {
    setRendered(true);
    return (
      <div
        style={{
          position: "relative",
          width: "175px",
          margin: "auto",
          transform: "translateY(110%)" /* or try 50% */,
        }}
      >
        <div>
          <img
            src={loadingGif.src}
            alt="wait until the page loads"
            height="100%"
          />
          <center>loading...</center>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.onProposal}>
        <Header></Header>

        <center>
          <form
            action="http://localhost:3000/api/proposal"
            className={styles.proposalForm}
            method="post"
            encType="multipart/form-data"
          >
            <legend>
              <h1> Project proposal </h1>
            </legend>
            <label>
              Title:
              <br /> <input type="text" id="title" />
            </label>
            <br />
            <label>
              Description
              <br />
              <textarea id="description"></textarea>{" "}
            </label>{" "}
            <br />
            <label>
              Domains:{" "}
              <Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
                id="domains"
                ref={domainselectRef}
                style={{
                  // To change css for multiselect (Width,height,etc..)
                  multiselectContainer: {
                    width: "fit-content",
                  },
                }}
                options={data.domains} // Options to display in the dropdown
                // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />{" "}
            </label>
            <br />
            <label>
              Supervisors
              <br />
              {/* <textarea name ="supervisors"></textarea>  */}
              <Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
                id="supervisors"
                ref={supervisorselectRef}
                style={{
                  // To change css for multiselect (Width,height,etc..)
                  multiselectContainer: {
                    width: "fit-content",
                  },
                }}
                options={faculties} // Options to display in the dropdown
                // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </label>
            <br />
            <label>
              Leader
              <br />
              <input id="leader" type="email" />
            </label>
            <br />
            <label>
              Members
              <br />
              <Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
                id="members"
                ref={memberselectRef}
                style={{
                  // To change css for multiselect (Width,height,etc..)
                  multiselectContainer: {
                    width: "fit-content",
                  },
                }}
                options={emails} // Options to display in the dropdown
                // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </label>
            <br />
            <label>
              Funding_type
              <br />
              <select id="funding_type">
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </label>
            <label>
              Funding_agency
              <br />
              <input id="funding_agency" type="text" />
            </label>
            <br />
            <label>
              File upload
              <br />
              <input
                id="pdf_document"
                type="file"
                accept="application/pdf"
                onChange={fileChangedHandler}
              />
            </label>
            <br />
            <label>
              Budget
              <br />
              <input id="budget" type="number" min="1" />
            </label>
            <br />
            <input type="submit" onClick={handleSubmit} />
          </form>
        </center>
      </div>
    );
  }
}

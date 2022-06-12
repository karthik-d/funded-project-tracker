import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import Link from 'next/link';
import { Multiselect } from 'multiselect-react-dropdown';
import { Component,useState } from 'react';
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
	
    const [emails,setMail]=useState([]);
		const data = {
			domains: [{ name: 'machine_learning', id: 1 }, { name: 'web_development', id: 2 }, { name: 'iot', id: 3 }, { name: 'computer_vision', id: 4}],
		};

		const facultyPromise = new Promise((resolve, reject)=>{
				fetch("http://localhost:3000/api/user?role=faculty")
				.then(response => response.json())
				.then(jsondata => {
					var all_data = JSON.parse(
						JSON.stringify(jsondata)
					);
					// console.log(all_data);
					resolve(all_data);
				});
			}).then((data) => {
				var arr = [];
				var i=1;
				data.forEach((d) => {
					// console.log(this.data.supervisor);
          d.email.replace("@","jj");
					arr.push({'name' :"hi", 'id' : i})
					// console.log(d.email);
					i++;
				})
        
				console.log(arr);
			   //data.add({supervisor : arr});
        setMail(arr);
				// return arr;
			})
      console.log(data.domains);
      console.log(emails);
      
		
		const fileChangedHandler = (event) => {
			let file_size = event.target.files[0].size;
			console.log(file_size);
			if (file_size > 8451576) // approx 8MB
			{
				event.target.value = "";
				alert("File size should be less than 8Mb");
			}
    
			//do whatever operation you want to do here
		};

		return (
     
			<div className={styles.onProposal}>
				<Header></Header>

				<center>
					<form action="http://localhost:3000/api/proposal" className={styles.proposalForm} method="post">

						<legend>
							<h1> Project proposal </h1>
						</legend>

						<label>Title:<br /> <input type="text" name="title" /></label><br />
						<label>Description<br />
							<textarea name="description"></textarea> </label> <br />
						<label>Domains: <Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
							style={{ // To change css for multiselect (Width,height,etc..)
								multiselectContainer: {
									width: 'fit-content'
								}
							}}
							options={data.domains} // Options to display in the dropdown
							// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
							// onSelect={this.onSelect} // Function will trigger on select event
							// onRemove={this.onRemove} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
						/> </label><br />

						<label>Supervisors<br />
							{/* <textarea name ="supervisors"></textarea>  */}
							<Multiselect //https://reactjsexample.com/react-multiselect-dropdown-with-search-and-various-options/
                id ="supervisors"
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
								options={emails==[]?None:emails}

								displayValue="supervisor"
							/>
						</label><br />
						<label>Leader<br /><input name="leader" type="email" /></label><br />
						<label>Members<br />
							<textarea name="members"></textarea> </label><br />
						<label >Funding_type<br />
							<select name="funding_type">
								<option value="internal">Internal</option>
								<option value="external">External</option>
							</select></label>
						<label>Funding_agency<br /><input name="funding_agency" type="text" /></label><br />
						<label>File upload<br /><input name="pdf_document" type="file" accept="application/pdf" onChange={fileChangedHandler} /></label><br />
						<label>Budget<br /><input name="budget" type="number" min="1" /></label><br />
						<input type="submit" />

					</form></center>

			</div>
		);
	
}
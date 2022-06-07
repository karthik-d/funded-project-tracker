import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Header from '../header';
import React, { useState, useEffect, Component } from 'react';
import user from '../../../FPTrack-backend/models/user';

import UserCard from '../../components/UserCard';

// todo: represent multi-valued fields suitably
// todo: display member names suitably
// todo: rename tabe headers to user readables

const zip = ((arr1, arr2) => {
	return arr1.map((elem, idx) => {
		return [elem, arr2[idx]];
	});
});

function Tabulate({ props }) {
	return (
		<div className={styles.tabulate}>
			<table>
				<thead>
					<tr id="header" key="header">
						{props.keys.map(key => {
							return (<th key={key}>{key}</th>);
						})}
					</tr>
				</thead>
				<tbody id="objects">
					{
						props.values.map((proj_row) => {
							return (
								<tr key={proj_row[0][0]}>
									{
										proj_row[0].map((val, idx) => {
											return (<td key={idx}>{val}</td>);
										})
									}
									{
										<td><a href={proj_row[1]}>View Project</a></td>
									}
								</tr>
							);
						})
					}
				</tbody>
			</table>
			<UserCard />
		</div>
	);
}

export default function viewusers() {
	const [values, setValues] = useState([]);
	const [keys, setKeys] = useState([]);
	const [uris, setUris] = useState([]);
	const fetchData = () => {
		fetch("http://localhost:3000/api/project")
			.then(response => response.json())
			.then(jsondata => {

				var all_data = JSON.parse(
					JSON.stringify(jsondata)
				);
				var proposal_data = all_data.map(
					function (project) {
						return project.proposal;
					}
				);

				var project_fields = [
					"_id",
					"approved_budget",
					"approved_duration",
					"completed_on",
					"status_updates",
					"outcomes"
				];
				// TODO: add member names
				var proposal_fields = [
					"domains",
					"leader",
					"funding_type",
					"funding_agency",
				];

				var all_values = [];
				var uris = [];
				all_data.forEach(
					function (project) {
						let local_values = [];
						project_fields.forEach(
							function (key) {
								local_values.push(project[key]);
							}
						);
						proposal_fields.forEach(
							function (key) {
								local_values.push(project.proposal[key])
							}
						);
						all_values.push(local_values);
						uris.push(project.url);
					}
				);
				var all_fields = project_fields.concat(proposal_fields);

				setValues(all_values);
				setKeys(all_fields);
				setUris(uris);
			})
	}

	useEffect(() => {
		fetchData()
	}, []);

	// Todo: Make objects multiple array sets
	let payload = { "values": zip(values, uris), "keys": keys, "link_objects": 1 };
	return (
		<div id="vieusers">
			<Header></Header>
			<Tabulate props={payload} />;
		</div>

	);

}

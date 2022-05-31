import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Header from '../header';
import React, { useState, useEffect, Component } from 'react';
import user from '../../../FPTrack-backend/models/user';


function Tabulate({ props }) {
	console.log(props.projects);
	return (<div className={styles.tabulate}>
		<table>
			<thead id="">
				<tr id="header" key="header">
					{props.keys[0].map(key => {
						return (<th key={key}>{key}</th>);
					})}
				</tr>
			</thead>
			<tbody id="objects">
				{
					[...props.objects.keys()].map(idx => {
						return props.objects[idx].map(obj => {
							return (
								<tr key={obj._id}>
									{
										props.keys[idx].map(key => {
											return (<td key={key}>{obj[key]}</td>);
										})
									}
								</tr>
							);
						});
					})
				}
				{
					// Process all ith elems together
					[...props.objects[0].keys()].map(proj_idx => {
						return (
							<tr key={obj_set[proj_idx]._id}>
								{
									[...props.objects.keys()].map(obj_idx => {
										console.log(props.keys);
										return (
											props.keys[obj_idx][proj_idx].map(key => {
												<td key={key}>
													{props.objects[obj_idx][proj_idx][key]}
												</td>
											})
										);
									})
								}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	</div>
	);
}

export default function viewusers() {

	const [projects, setProjects] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [projectKeys, setProjectKeys] = useState([]);
	const [proposalKeys, setProposalKeys] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:3000/api/project")
			.then(response => response.json())
			.then(jsondata => {
				var proposal_objs = jsondata.map(
					function (project) {
						return project.proposal;
					}
				)
				setProjects(JSON.parse(JSON.stringify(jsondata)));
				setProposals(proposal_objs);
				// set keys
				const main_fields = [
					"_id",
					"approved_budget",
					"approved_duration",
					"completed_on",
					"status_updates",
					"outcomes"
				];
				// TODO: add member names
				const sub_fields = [
					"domains",
					"funding_type",
					"funding_agency",
				];
				setProjectKeys(main_fields);
				setProposalKeys(sub_fields);

			})
	}


	useEffect(() => {
		fetchData()
	}, [
		projects,
		projectKeys,
		proposals,
		proposalKeys
	]);

	// Todo: Make objects multiple array sets
	let temp = { "objects": [projects, proposals], "keys": [projectKeys, proposalKeys], "link_objects": 1 };
	return (
		<div id="vieusers">
			<Header></Header>
			<Tabulate props={temp} />;
		</div>

	);

}

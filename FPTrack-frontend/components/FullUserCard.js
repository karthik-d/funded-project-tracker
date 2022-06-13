import React, { useState } from "react";
import styles from "../components/styles/FullProjectCard.module.css";
import userStyles from "../components/styles/UserCard.module.css";
import useCollapse from "react-collapsed";
import Proposalcard from "../components/ProposalCard";
import useSWR from "swr";
import Popup from "reactjs-popup";
import { Document, Page } from "react-pdf";
import loadingGif from "../src/assets/loading.gif";

function Proposalcard_byid(props) {
  console.log("lion", props);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/proposal/" + props.props,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
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

  return <Proposalcard props={data} />;
}
function Idlist_proposalcard(props) {
  console.log("IDlist", props);
  return props.props.map((obj) => {
    return <Proposalcard_byid props={obj._id} />;
  });
}

function Members(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>{isExpanded ? "Collapse Members" : "Expand Members"}</h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_proposalcard props={props.props} />
        </div>
      </div>
    </div>
  );
}
function Leader(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>{isExpanded ? "Collapse Leader" : "Expand Leader"}</h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_proposalcard props={[props.props]} />
        </div>
      </div>
    </div>
  );
}

////comment
function Supervisors(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? "Collapse As Supervisors" : "Expand As Supervisors"}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_proposalcard props={[props.props]} />
        </div>
      </div>
    </div>
  );
}

function Tripletproposal(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/proposal/user/" + props.props.props._id,
    fetcher
  );
  console.log("data", data);

  if (error) return <div>failed to load</div>;
  if (!data)
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
  return (
    <div>
      <Supervisors props={data["as_supervisor"]} />
      <Leader props={data["as_supervisor"]} />
      <Members props={data["as_supervisor"]} />
    </div>
  );
}
function Tripletproject(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/project/user/" + props.props.props._id,
    fetcher
  );
  console.log("data", data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <Supervisors props={data["as_supervisor"]} />
      <Leader props={data["as_supervisor"]} />
      <Members props={data["as_supervisor"]} />
    </div>
  );
}

export default function FullUser(props) {
  console.log("porps", props);

  return (
    <div>
      <div>
        <span>Name: </span>
        {props.props.first_name + " " + props.props.last_name}
      </div>
      <div>Role: {props.props.role}</div>
      <div>Proposal Roles:</div>
      <Tripletproposal props={props} />
      <div>Project Roles:</div>
      <Tripletproject props={props} />
    </div>
  );
}

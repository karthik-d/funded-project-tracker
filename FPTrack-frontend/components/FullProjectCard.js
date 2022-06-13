import React, { useState } from "react";
import styles from "../components/styles/FullProjectCard.module.css";
import userStyles from "../components/styles/UserCard.module.css";
import useCollapse from "react-collapsed";
import Usercard from "../components/UserCard";
import ResourceAllocationcard from "../components/ResourceAllocationCard";
import Resourcecard from "../components/ResourceCard";
import useSWR from "swr";
import Popup from "reactjs-popup";
import { Document, Page } from "react-pdf";
import loadingGif from "../src/assets/loading.gif";

function Usercard_byid(props) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/user/" + props.props,
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

  return <Usercard {...data[0]} />;
}
function Idlist_usercard(props) {
  console.log("IDlist", props);
  return props.props.map((obj) => {
    return <Usercard_byid props={obj} />;
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
        {isExpanded ? (
          <div className={styles.collapse}>Members</div>
        ) : (
          <div className={styles.expand}>Members</div>
        )}
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_usercard props={props.props} />
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
        {isExpanded ? (
          <div className={styles.collapse}> Principal Investigator</div>
        ) : (
          <div className={styles.expand}>Principal Investigator</div>
        )}
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_usercard props={[props.props]} />
        </div>
      </div>
    </div>
  );
}

function Supervisors(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? (
            <div className={styles.collapse}>Supervisors</div>
          ) : (
            <div className={styles.expand}>Supervisors</div>
          )}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <Idlist_usercard props={[props.props]} />
        </div>
      </div>
    </div>
  );
}

function Resource(props) {
  const types = [
    { key: "name", name: "name" },
    { key: "kind", name: "kind" },
  ];
  const [query, setQuery] = useState("");
  const [type, setType] = useState(types[0]["key"]);
  const [counter, setCounter] = useState(0);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/resource-assignment/project/" + props.props._id, // gives project id
    fetcher
  );
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const config = {
    duration: 200,
  };

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? (
            <div className={styles.collapse}>Resource assigned</div>
          ) : (
            <div className={styles.expand}>Resource assigned(collaped)</div>
          )}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <div style={{ margin: "auto" }}>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter Post Title"
            />
            <select
              id="search_key"
              onChange={(event) => setType(event.target.value)}
            >
              {types.map((obj) => {
                return <option value={obj.key}> {obj.name}</option>;
              })}
            </select>
          </div>
          {data.map((obj) => {
            let temp = obj[type];
            obj.avl_qty = obj.qty;
            if (String(temp).toLowerCase().includes(query.toLowerCase()))
              return <Resourcecard {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
}

function ResourceAllocation(props) {
  const types = [
    { key: "name", name: "name" },
    { key: "kind", name: "kind" },
  ];
  const [query, setQuery] = useState("");
  const [type, setType] = useState(types[0]["key"]);
  const [counter, setCounter] = useState(0);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:3000/api/resource-group",
    fetcher
  );
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const config = {
    duration: 200,
  };

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? (
            <div className={styles.collapse}>Resource assignable</div>
          ) : (
            <div className={styles.expand}>Resource assignable(collaped)</div>
          )}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <div style={{ margin: "auto" }}>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter Post Title"
            />
            <select
              id="search_key"
              onChange={(event) => setType(event.target.value)}
            >
              {types.map((obj) => {
                return <option value={obj.key}> {obj.name}</option>;
              })}
            </select>
          </div>
          {data.map((obj) => {
            obj.project_id = props.props._id;
            let temp = obj[type];
            if (String(temp).toLowerCase().includes(query.toLowerCase()))
              return <ResourceAllocationcard {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
}
function Outcomecard(props) {
  console.log("outs", props);
  return (
    <h1>
      {props.props.title} {props.props.description}
    </h1>
  );
}
function Statuscard(props) {
  return (
    <h1>
      {props.props.title} {props.props.description}
    </h1>
  );
}
function UpdateStatus() {
  return <h1>props.title props.description</h1>;
}
function ViewStatus(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? (
            <div className={styles.collapse}>Status</div>
          ) : (
            <div className={styles.expand}>Status</div>
          )}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          {props.props.map((obj) => {
            return <Statuscard props={obj} />;
          })}
        </div>
      </div>
    </div>
  );
}
function ViewOutcomes(props) {
  const config = {
    duration: 200,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <h1>
          {isExpanded ? (
            <div className={styles.collapse}>Outcomes</div>
          ) : (
            <div className={styles.expand}>Outcomes</div>
          )}
        </h1>
      </div>
      <div {...getCollapseProps()}>
        <div style={{ display: "flex", "flex-direction": "row" }}>
          {props.props.map((obj) => {
            return <Outcomecard props={obj} />;
          })}
        </div>
      </div>
    </div>
  );
}
function UpdateOutcomes() {}

export default function FullProject(props) {
  console.log("porps", props);

  // convert array to base64 string (given pdf_document data)
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  var res = arrayBufferToBase64(
    props.props.proposal.pdf_document != null
      ? props.props.proposal.pdf_document.data
      : "Nothing"
  );

  return (
    <div className={styles.main_container}>
      <h1 className={styles.title}>{props.props.proposal.title}</h1>
      <div className={styles.domain}>
        <span className={styles.domain_tag}>Domain:</span>{" "}
        {props.props.proposal.domains.map((obj) => {
          return <span className={styles.domain_sub}>{obj}</span>;
        })}
      </div>
      <div className={styles.table_container}>
        <div className={styles.sub_table}>
          Budget requested: Rs
          <span className={styles.budget}>{props.props.proposal.budget}</span>
        </div>
        <div className={styles.sub_table}>
          Budget approved: Rs
          <span className={styles.budget}>{props.props.approved_budget}</span>
        </div>
        <div className={styles.sub_table}>
          Duration: <span>{props.props.approved_duration} </span>months
        </div>
        <div className={styles.sub_table}>
          Proposal.pdf:
          <a
            style={{ color: "blue", "text-decoration": "underline" }}
            href={`data:application/pdf;base64,${res}`}
            download
          >
            {" "}
            link
          </a>
        </div>
      </div>
      <ViewOutcomes props={props.props.outcomes} />
      <ViewStatus props={props.props.status_updates} />
      <Leader props={props.props.proposal.leader} />
      <Members props={props.props.proposal.members} />
      <Supervisors props={props.props.proposal.supervisors} />
      <Resource props={props.props} />
      <ResourceAllocation props={props.props} />
    </div>
  );
}

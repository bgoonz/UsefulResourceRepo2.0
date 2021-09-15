import React from "react";
import { withRouter } from "react-router-dom";
import Manager from "./Manager";
import Tree from "./Tree";

const Tags = ({ history }) => {
  const ButtonDone = ({ className = "btn bg-white shadow" }) => (
    <button className={className} onClick={() => history.push("/tags")}>
      Done
    </button>
  );

  const tab = history.location.query.tab
    ? history.location.query.tab
    : "default";

  return (
    <>
      {tab === "manage" && <Manager ButtonDone={ButtonDone} />}

      {tab === "default" && (
        <div className="text-right">
          <button
            className="btn bg-white mb-4 shadow mr-4 md:mr-0"
            onClick={() => history.push("/tags?tab=manage")}
          >
            Manage
          </button>
        </div>
      )}

      {["default", "form"].includes(tab) && (
        <section className="card">
          <Tree />
        </section>
      )}
    </>
  );
};

export default withRouter(Tags);

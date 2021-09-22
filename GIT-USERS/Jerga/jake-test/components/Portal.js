import React, { useState } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

export default function Portal() {
  const [open, setOpen] = useState();

  return (
    <React.Fragment>
      <button type="button" onClick={(event) => setOpen(true)}>
        Open Modal
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop">
            <div className="modal">
              <button type="button" onClick={(event) => setOpen(false)}>
                Close
              </button>
            </div>
            <style jsx>{`
              :global(body) {
                overflow: hidden;
              }

              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }

              .modal {
                background-color: white;
                position: absolute;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 1em;
              }
            `}</style>
          </div>
        </ClientOnlyPortal>
      )}
    </React.Fragment>
  );
}

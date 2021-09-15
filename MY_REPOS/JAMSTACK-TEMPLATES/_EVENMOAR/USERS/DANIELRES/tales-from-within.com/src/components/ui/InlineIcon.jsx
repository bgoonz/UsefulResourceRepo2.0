import classnames from "classnames";

export const InlineIcon = ({ children, size = 20, debug = false }) => {
  return (
    <>
      <span
        className={classnames("relative inline-block", {
          "bg-green-200": debug,
        })}
      >
        <div className="centered outer">
          <div className="centered" style={{ width: size, height: size }}>
            {children}
          </div>
        </div>

        <div style={{ width: size }}>&nbsp;</div>
      </span>

      <style jsx>{`
        .centered {
          position: absolute;
          margin: auto;
          display: block;
          bottom: 0px;
          top: 0px;
          left: 50%;
          transform: translate(-50%, 0);
        }

        .outer {
          ${debug && `background: red;`}
          width: 5px;
          height: 5px;
        }
      `}</style>
    </>
  );
};

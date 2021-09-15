export function Spiral() {
  return (
    <div className="relative z-50">
      <div className="rotate"></div>
      {/* <div className="rotate2"></div> */}
      <style jsx>
        {`
          .rotate {
            position: fixed;
            z-index: 0;
            width: 150vw;
            height: 150vw;
            left: -25vw;
            top: -75vw;
            animation: spin 200s linear infinite;
            background-image: url("/spiral.png");
            background-repeat: no-repeat;

            background-size: contain;
            background-position: center;
          }
          .rotate2 {
            transform: rotate(90deg);
            position: fixed;
            z-index: 0;
            width: 100vw;
            height: 100vw;
            left: 0vw;
            top: -40vw;
            animation: spin 150s linear infinite;
            background-image: url("/spiral.png");
            background-repeat: no-repeat;
            animation-fill-mode: backwards;

            background-size: contain;
            background-position: center;
          }

          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

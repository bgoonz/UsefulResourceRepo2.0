export function Flicker() {
  return (
    <>
      <div className="outerX" id="text">
        <h1>
          <div className="text-3xl">Tales from Within</div>
        </h1>
        <h2 className="text-xl" id="offset1">
          <span id="offset3">Inner</span> <span id="offset2">&amp;</span>{" "}
          <span id="offset4">outer</span>{" "}
          <span div="offset5">space travels</span>
        </h2>
      </div>
      <style jsx>{`
        div.outer {
          text-align: center;
          border: 5px solid #1086e8;
          width: 300px;
          top: 150px;
          border-radius: 20px;
          animation: border-flicker 200s linear infinite;
        }

        h1 {
          color: #ff00e6;
          color: #fff;
          animation: text-flicker 150s linear infinite;
        }
        h2 {
          color: #ff00e6;
          color: #fff;
          animation: text-flicker 50s linear infinite;
        }

        #offset1 {
          animation: offset-flicker 60s linear infinite;
        }
        #offset2 {
          animation: offset-flicker 50s linear infinite;
        }
        #offset3 {
          animation: offset-flicker 40s linear infinite;
        }
        #offset4 {
          animation: offset-flicker 60s linear infinite;
        }
        #offset5 {
          animation: offset-flicker 30s linear infinite;
        }

        @keyframes text-flicker {
          0% {
            opacity: 0.5;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }

          2% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          8% {
            opacity: 0.5;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          9% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          12% {
            opacity: 0.5;
            text-shadow: 0px 0px rgba(255, 255, 255, 1);
          }
          20% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          25% {
            opacity: 0.3;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          30% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }

          70% {
            opacity: 0.7;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }

          72% {
            opacity: 0.2;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }

          77% {
            opacity: 0.9;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          100% {
            opacity: 0.9;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
        }

        @keyframes border-flicker {
          0% {
            opacity: 0.5;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }
          2% {
            opacity: 1;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }
          4% {
            opacity: 0.5;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }

          8% {
            opacity: 1;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }
          70% {
            opacity: 0.7;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }
          100% {
            opacity: 1;
            -webkit-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            -moz-box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
            box-shadow: 0px 0px 78px 4px rgba(16, 134, 232, 0.73);
          }
        }

        @keyframes offset-flicker {
          0% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }

          19% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          21% {
            opacity: 0.75;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          23% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          23.1% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 0.1);
          }

          23.2% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 0.8);
          }
          23.3% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 0.1);
          }
          23.4% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 0.8);
          }

          80.5% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          81% {
            opacity: 0.6;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
          82% {
            opacity: 1;
            text-shadow: 0px 0px 29px rgba(255, 255, 255, 1);
          }
        }
      `}</style>
    </>
  );
}

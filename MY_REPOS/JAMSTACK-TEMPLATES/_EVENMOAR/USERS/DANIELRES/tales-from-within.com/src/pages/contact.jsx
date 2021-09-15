import React from "react";
import { Layout } from "../components/Layout";
import { Card } from "../components/ui/Card";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const initialState = { name: "", email: "", message: "" };

export default function Contact() {
  const form = React.useRef(null);

  const [vars, setVars] = React.useState(initialState);
  const [encoded, setEncoded] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const reset = () => {
    setVars(initialState);
    setIsSuccess(false);
  };

  React.useEffect(() => {
    const data = new FormData(form.current);
    setEncoded(new URLSearchParams(data).toString());
  }, [vars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const body = encode({ "form-name": "contact", vars });
    // console.log({ body });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encoded,
    })
      .then(() => setIsSuccess(true))
      .catch((error) => alert(error));
  };

  if (isSuccess) {
    return (
      <Layout>
        <Card>
          <div className="text-white">
            <p>Form successfully submitted</p>
            <p>
              <button onClick={reset}>reset</button>
            </p>
          </div>
        </Card>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Card>
          <form
            ref={form}
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="Contact!" />

            <p>
              <label>
                <LabelText>Your Name</LabelText>

                <input
                  type="text"
                  name="name"
                  onChange={(e) => setVars({ ...vars, name: e.target.value })}
                  value={vars.name}
                />
              </label>
            </p>
            <p>
              <label>
                <LabelText>Your Email</LabelText>{" "}
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setVars({ ...vars, email: e.target.value })}
                  value={vars.email}
                />
              </label>
            </p>

            <p>
              <label>
                <LabelText>Message</LabelText>{" "}
                <textarea
                  name="message"
                  onChange={(e) =>
                    setVars({ ...vars, message: e.target.value })
                  }
                  value={vars.message}
                ></textarea>
              </label>
            </p>
            <p>
              <button type="submit" className="text-white">
                Send
              </button>
            </p>
          </form>
        </Card>
      </Layout>
    </>
  );
}

function LabelText({ children }) {
  return <span className="text-white">{children}</span>;
}

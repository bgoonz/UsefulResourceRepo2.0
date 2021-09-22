import axios from "axios";

export default async function (req, res) {
  if (req.method === "GET") {
    const dataRes = await fetch(`${process.env.API_URL}/resources`);
    const data = await dataRes.json();

    return res.send(data);
  }

  if (req.method === "POST" || req.method === "PATCH") {
    const { id, title, description, link, timeToFinish, priority } = req.body;
    let url = `${process.env.API_URL}/resources`;

    if (!title || !description || !link || !timeToFinish || !priority) {
      return res.status(422).send("Data are missing!");
    }

    if (req.method === "PATCH") {
      url += `/${id}`;
    }

    try {
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes.data);
    } catch {
      return res.status(422).send("Data cannot be stored!");
    }
  }
}

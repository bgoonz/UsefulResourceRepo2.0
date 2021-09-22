import axios from "axios";
import ServerActions from "../actions/ServerActions";

let API = {
  fetchLinks() {
    console.log("1. in API");
    // Ajax request to read data/links
    axios
      .post("/graphql", {
        query: `{
        links {
        _id,
        title,
        url
        }
        }`,
      })
      .then((resp) => {
        ServerActions.recieveLinks(resp.data.data.links);
      });
  },
};

export default API;

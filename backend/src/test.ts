import axios from "axios";

axios
  .get("http://adminer:8080")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

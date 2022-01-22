const axios = require("axios");
const assembly = axios.create({

  baseURL: "https://api.assemblyai.com/v2",
  headers: {
      authorization: 'e1436fdf9c1346e18b5104ac96980290',
      "content-type": "application/json",
  },
});
assembly
  .get(`/transcript/orpgrittes-a229-4521-a43c-1a8d4221015b`)
  .then((res) => console.log(res.data.text))
  .catch((err) => console.error(err));
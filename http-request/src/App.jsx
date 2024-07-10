import { useEffect } from "react";
import "./App.css";

function App() {
  //USING ASYNC AWAIT
  useEffect(function () {
    async function getData() {
      const request = await fetch(
        "https://api.spaceflightnewsapi.net/v4/blogs/"
      );
      const response = await request.json();
      console.log(response);
    }
    getData();
  }),
    [];

  //USING THEN
  useEffect(function () {
    const getData = fetch("https://api.spaceflightnewsapi.net/v4/blogs/")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
      });
    console.log(getData);
  }),
    [];

  return <>Data Fetch</>;
}

export default App;

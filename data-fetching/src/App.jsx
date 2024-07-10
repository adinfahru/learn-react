import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      const request = await fetch(
        "https://api.spaceflightnewsapi.net/v4/blogs/"
      );
      const response = await request.json();
      setLoading(false);

      // Ensure response is an array
      if (Array.isArray(response.results)) {
        setNews(response.results);
      } else {
        console.error("Unexpected response format:", response);
      }
    }
    getData();
  }, []);

  return (
    <>
      <h1>Data Fetch</h1>
      {loading ? (
        <p>Loading data ...</p>
      ) : (
        <ul>
          {news.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

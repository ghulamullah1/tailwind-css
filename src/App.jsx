import { useEffect } from "react";
import "./App.css";
import { Services } from "./services/keycloak";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <div className="">
        <h1 className="">hello</h1>
        <button onClick={() => Services.logout("http://localhost:3000/")}>
          sign out
        </button>
        <div
          onClick={() =>
            axios.get("http://localhost:8080").catch((err) => console.log(err))
          }
        >
          call api
        </div>
      </div>
    </div>
  );
}

export default App;

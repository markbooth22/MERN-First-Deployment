import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import "./App.css";
import PetList from "./views/PetList";
import PetAdd from "./views/PetAdd";
import PetDisplay from "./views/PetDisplay"
import PetEdit from "./views/PetEdit"
import axios from "axios";

function App() {
  const [pets, setPets] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <div className="App">
      <Router>
        <PetList
          path="/"
          pets={pets}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <PetAdd path="/pet/add" refresh={refresh} setRefresh={setRefresh} />
        <PetDisplay path="/pet/:id" refresh={refresh} setRefresh={setRefresh}/>
        <PetEdit path="/:id/edit" refresh={refresh} setRefresh={setRefresh} />
      </Router>
    </div>
  );
}

export default App;

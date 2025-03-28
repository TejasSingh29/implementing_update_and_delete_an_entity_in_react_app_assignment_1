import { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [doors, setDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all doors on component mount
  useEffect(() => {
    fetch(API_URI)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch doors");
        return response.json();
      })
      .then((data) => setDoors(data))
      .catch((error) => setError(error.message));
  }, []);

  // Fetch a specific door when selected
  const handleSelectDoor = (id) => {
    if (!id) {
      setSelectedDoor(null);
      return;
    }

    fetch(`${API_URI}/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch door");
        return response.json();
      })
      .then((data) => setSelectedDoor(data))
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h1>Door Management</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Dropdown to select a door */}
      <label htmlFor="doorSelect">Select a Door:</label>
      <select id="doorSelect" onChange={(e) => handleSelectDoor(e.target.value)}>
        <option value="">-- Choose a Door --</option>
        {doors.map((door) => (
          <option key={door.id} value={door.id}>
            {door.name}
          </option>
        ))}
      </select>

      {/* Display selected door details */}
      {selectedDoor && (
        <div>
          <h2>{selectedDoor.name}</h2>
          <p>Status: {selectedDoor.status}</p>
          <UpdateItem item={selectedDoor} />
        </div>
      )}
    </div>
  );
}

export default App;

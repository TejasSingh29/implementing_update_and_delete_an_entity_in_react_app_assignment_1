import { useEffect, useState } from "react";

const UpdateItem = ({ item }) => {
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!item || !item.id) {
            setError("Invalid Item ID");
            return;
        }

        fetch(`https://your-api-endpoint.com/items/${item.id}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then(data => setFormData(data))
            .catch(error => setError(error.message));
    }, [item]);

    // if (error) return <p>Error: {error}</p>;
    if (!formData) return <p>Loading...</p>;

    return (
        <div>
            <h2>Update Item</h2>
            <p>Name: {formData.name}</p>
        </div>
    );
};

export default UpdateItem;

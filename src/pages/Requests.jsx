import React from "react";

const Requests = () => {
  // Sample data (this can be replaced with real data from Firebase later)
  const requests = [
    { id: 1, item: "Blankets", quantity: 2, requestedBy: "Alice" },
    { id: 2, item: "Books", quantity: 5, requestedBy: "Bob" },
  ];

  return (
    <div>
      <h1>Item Requests</h1>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.quantity} x {req.item} requested by {req.requestedBy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;

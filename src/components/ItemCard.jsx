import React from "react";

const ItemCard = ({ item, quantity, description }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{item}</h3>
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

export default ItemCard;

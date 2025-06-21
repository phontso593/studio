import React, { useState } from "react";

const DonateForm = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Clothes");
  const categories = [
    "Clothes",
    "Books",
    "Toys",
    "Electronics",
    "Furniture",
    "Food",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Donated ${quantity} x ${item}`);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "32px",
        border: "2px solid #e0e0e0",
        borderRadius: "12px",
        background: "#fafbfc",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <label style={{ fontWeight: "bold" }}>Item Name:</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <label style={{ fontWeight: "bold" }}>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            width: "100px",
          }}
        />

        <label style={{ fontWeight: "bold" }}>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label style={{ fontWeight: "bold" }}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            minHeight: "60px",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default DonateForm;

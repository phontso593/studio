import React from "react";

const Profile = () => {
  // In a real app, fetch and show user info here
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "Donor",
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p>
        <strong>Name:</strong> {mockUser.name}
      </p>
      <p>
        <strong>Email:</strong> {mockUser.email}
      </p>
      <p>
        <strong>Role:</strong> {mockUser.role}
      </p>
    </div>
  );
};

export default Profile;

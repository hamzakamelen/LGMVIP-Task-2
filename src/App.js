import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const UserCard = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
`;

const UserCardGrid = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <span>Brand Name</span>
        <Button onClick={fetchUsers}>Get Users</Button>
      </Navbar>

      {!isLoading && users.length > 0 ? (
        <CardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </CardGrid>
      ) : (
        <Loader>
          {isLoading ? "Loading..." : 'Click "Get Users" to load data'}
        </Loader>
      )}
    </div>
  );
};

export default UserCardGrid;

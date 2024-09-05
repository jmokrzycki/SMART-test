import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setFilter } from "../store/userSlice";
import { RootState } from "../store";
import "../styles/table.scss";

// Reusable FilterInput Component
const FilterInput: React.FC<{
  label: string;
  field: string;
  placeholder: string;
  handleFilterChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, field, placeholder, handleFilterChange }) => (
  <div className="filter-input">
    <label htmlFor={`${field}-filter`}>{label}</label>
    <input type="text" id={`${field}-filter`} placeholder={placeholder} onChange={handleFilterChange(field)} />
  </div>
);

// UserRow Component to render each row of user data
const UserRow: React.FC<{ user: { id: number; name: string; username: string; email: string; phone: string } }> = ({
  user,
}) => (
  <tr>
    <td data-label="Name">{user.name}</td>
    <td data-label="Username">{user.username}</td>
    <td data-label="Email">
      <a href={`mailto:${user.email}`} aria-label={`Email ${user.name}`}>
        {user.email}
      </a>
    </td>
    <td data-label="Phone">
      <a href={`tel:${user.phone}`} aria-label={`Call ${user.name}`}>
        {user.phone}
      </a>
    </td>
  </tr>
);

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ field: field as keyof RootState["users"]["filters"], value: event.target.value }));
  };

  if (loading)
    return (
      <p className="message" aria-live="polite">
        Loading users...
      </p>
    );
  if (error)
    return (
      <p className="message" aria-live="assertive">
        Error: {error}
      </p>
    );

  return (
    <div className="user-table-container">
      <h1 className="title">User Management</h1>
      <div className="search-section" role="search">
        <FilterInput
          label="Filter by name"
          field="name"
          placeholder="Enter name"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Filter by username"
          field="username"
          placeholder="Enter username"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Filter by email"
          field="email"
          placeholder="Enter email"
          handleFilterChange={handleFilterChange}
        />
        <FilterInput
          label="Filter by phone"
          field="phone"
          placeholder="Enter phone"
          handleFilterChange={handleFilterChange}
        />
      </div>
      <table className="user-table" aria-label="User Information">
        <caption className="sr-only">List of Users</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      {filteredUsers.length === 0 && (
        <p className="message" aria-live="polite">
          No users found matching the current filters.
        </p>
      )}
    </div>
  );
};

export default UserTable;

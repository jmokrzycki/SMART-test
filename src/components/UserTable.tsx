import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setFilter } from "../store/userSlice";
import { RootState } from "../store";

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ field: field as keyof RootState["users"]["filters"], value: event.target.value }));
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>
              Name
              <input type="text" placeholder="Search by name" onChange={handleFilterChange("name")} />
            </th>
            <th>
              Username
              <input type="text" placeholder="Search by username" onChange={handleFilterChange("username")} />
            </th>
            <th>
              Email
              <input type="text" placeholder="Search by email" onChange={handleFilterChange("email")} />
            </th>
            <th>
              Phone
              <input type="text" placeholder="Search by phone" onChange={handleFilterChange("phone")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

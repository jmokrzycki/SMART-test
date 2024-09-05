import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface Filters {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  loading: false,
  error: null,
};

// Fetch users from the API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ field: keyof Filters; value: string }>) => {
      const { field, value } = action.payload;
      state.filters[field] = value.toLowerCase();

      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(state.filters.name) &&
          user.username.toLowerCase().includes(state.filters.username) &&
          user.email.toLowerCase().includes(state.filters.email) &&
          user.phone.includes(state.filters.phone)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
        state.loading = false;
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;

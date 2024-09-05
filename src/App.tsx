import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import UserTable from "./components/UserTable";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>User Management</h1>
        <UserTable />
      </div>
    </Provider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import UserTable from "./components/UserTable";
import "./styles/app.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserTable />
      </div>
    </Provider>
  );
};

export default App;

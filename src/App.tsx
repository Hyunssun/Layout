import { Route, Routes } from "react-router-dom";
import { Main } from "./contents";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;

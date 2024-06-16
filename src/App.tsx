import { Routes } from "react-router-dom";
import { routes, renderRoutes } from "./routes/routes";
const App = () => {
  return (
    <>
      <Routes>{renderRoutes(routes)}</Routes>
    </>
  );
};

export default App;

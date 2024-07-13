import { Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { renderRoutes } from "./routes/renderRoutes";

const App = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default App;

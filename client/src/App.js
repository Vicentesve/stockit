import "./css/App.css";
import routes from "./routes/indexRoutes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;

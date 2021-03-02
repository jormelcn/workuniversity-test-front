import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import OrderByDay from "./pages/OrderByDay";
import NavBar from "./components/NavBar";
import NewOrder from "./pages/NewOrder";

function App() {
  return (
    <Router>
      <div className=" h-full w-full">
        <NavBar />
        <section className="container mx-auto px-4">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/marcas">
              <Brands />
            </Route>
            <Route exact path="/pedidos">
              <OrderByDay />
            </Route>
            <Route exact path="/nuevo-pedido">
              <NewOrder />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;

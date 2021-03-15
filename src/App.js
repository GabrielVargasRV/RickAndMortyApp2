import Header from "./components/Header.jsx";
import Characters from "./components/Characters.jsx";
import {Switch, BrowserRouter, Route} from "react-router-dom"
import CharacterPage from "./components/CharacterPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header/>
    <div className="container">
      <Switch>
        <Route exact path="/" component={Characters} />
        <Route exact path="/:id" component={CharacterPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

import PostListComponent from "./features/post/PostListComponent";
import MenuComponent from "./features/menu/MenuComponent";
import { Route, Switch } from "react-router";
import PostPageComponent from "./features/post/PostPageComponent";

function App() {
  return (
    <div className="ui container">
      <MenuComponent />
      <Switch>
        <Route exact path="/" component={PostListComponent} />
        <Route path="/posts/:id" component={PostPageComponent} />
      </Switch>
    </div>
  );
}

export default App;

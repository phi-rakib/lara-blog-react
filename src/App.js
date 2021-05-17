import PostListComponent from "./features/post/PostListComponent";
import MenuComponent from "./features/menu/MenuComponent";
import { Route, Switch } from "react-router";
import PostPageComponent from "./features/post/PostPageComponent";
import AddPostComponent from "./features/post/AddPostComponent";
import FooterComponent from "./features/shared/FooterComponent";
import HeaderComponent from "./features/shared/HeaderComponent";
import LoginComponent from "./features/auth/LoginComponent";
import EditPostComponent from './features/post/EditPostComponent';

function App() {
  return (
    <>
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment">
          <MenuComponent />
          <HeaderComponent />
        </div>
      </div>
      <div className="pusher">
        <div className="ui vertical stripe segment">
          <Switch>
            <Route exact path="/" component={PostListComponent} />
            <Route path="/posts/:id" component={PostPageComponent} />
            <Route path="/post/add" component={AddPostComponent} />
            <Route path="/post/edit/:id" component={EditPostComponent} />
            <Route path="/login" component={LoginComponent} />
          </Switch>
        </div>
      </div>
      <div className="ui divider"></div>
      <FooterComponent />
    </>
  );
}

export default App;

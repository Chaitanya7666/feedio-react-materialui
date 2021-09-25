import React, { useState, useEffect } from "react";
import {
  Login,
  Home,
  Signup,
  ForgotPassword,
  MyPosts,
  AllPosts,
  Profile,
  Footer
} from "./components";
import "./index.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import PrivateRoute from "./components/PrivateRoute";
import { CurrentUserDetailsProvider } from "./contexts/CurrentUserDetailsContext";
import { AllUserDetailsProvider } from "./contexts/AllUserDetailsContext";
import { ThemeProvider, createTheme } from "@material-ui/core";
import {useLocation} from "react-router-dom";

const App = () => {
  const [docs, setDocs] = useState([]);
  const [like, setLike] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [dummy, setDummy] = useState(true);

  const theme = createTheme({
    palette: {
      // primary: {
      //   main: "rgb(140,233,23,0.2)",
      //   dark: "#1db954",
      // },
      // secondary : {
      //   // main : "#808000",
      //   main: "#1db954",
      //   dark : "rgb(135,23,43)"
      // }
      primary: {
        main: "rgb(107,187,117)",
        dark: "rgb(18,16,14)",
      },
      secondary : {
        // main : "#808000",
        main: "rgb(232, 243, 236)",
        dark : "rgb(0, 171, 107)"
      }
    },
  });

  const handleDummy = () => {
    setDummy((prevState) => !prevState);
  };

  useEffect(async () => {
    
    let allPosts = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
    setAllPosts(allPosts);
    
  }, []);

  const handleLike = (e) => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const handleAllPostsUpdateDeleteOptimistically = (input, email) => {
    console.log("handleAllPostsUpdateDeleteOptimistically", input, email);
    let localPosts = [...allPosts];
    let refPost = localPosts.find((post) => {
      return post.email === email;
    });
    refPost.posts = input;
    setAllPosts(localPosts);
    console.log("updater => ", localPosts);
  };

  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ThemeProvider theme={theme}>
        <AuthProvider>
          <CurrentUserDetailsProvider>
            <AllUserDetailsProvider>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/forgot-password">
                  <ForgotPassword />
                </Route>
                {/* <Route path="/my-posts" >
              <MyPosts handleLike={handleLike} like={like} allPosts={allPosts}/>
            </Route> */}
                <Route path="/my-posts">
                  <MyPosts
                    handleLike={handleLike}
                    like={like}
                    allPosts={allPosts}
                    handleAllPostsUpdateDeleteOptimistically={
                      handleAllPostsUpdateDeleteOptimistically
                    }
                  />
                </Route>
                <Route path="/all-posts">
                  <AllPosts
                    handleLike={handleLike}
                    like={like}
                    allPosts={allPosts}
                    handleAllPostsUpdateDeleteOptimistically={
                      handleAllPostsUpdateDeleteOptimistically
                    }
                  />
                </Route>
                <Route
                  path="/profile/:username"
                  render={(props) => <Profile {...props} />}
                />
                {/* <Route path="/" exact>
              <Home />
            </Route> */}
                <PrivateRoute
                  component={Home}
                  allPosts={allPosts}
                  handleAllPostsUpdateDeleteOptimistically={
                    handleAllPostsUpdateDeleteOptimistically
                  }
                  handleDummy={handleDummy}
                  path="/"
                  exact
                />
              </Switch>
              <Footer />
            </AllUserDetailsProvider>
          </CurrentUserDetailsProvider>
        </AuthProvider>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;

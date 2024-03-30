import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Loader from "./pages/Loader";
import { Toaster } from "react-hot-toast";
import Post from "./pages/Post";

function App() {
  const [show_loading, set_show_loading] = useState(true);
  setInterval(() => {
    set_show_loading(false);
  }, 3000);
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            padding: '10px 20px',
            color: '#713200',
            fontWeight:'600',
            fontSize:'.9rem',
            textTransform:'uppercase'
          },
          success: {
            style: {
              color: 'green'
            },
          },
          error: {
            style: {
              color: 'red',
            },
          },
        }}
        containerStyle={{ top: 20, left: 20, bottom: 200, right: 20 }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={show_loading ? <Loader /> : <Home />}
          ></Route>
          <Route path="/post/:post_id" element={<Post />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

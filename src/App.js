import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./moviepage/Home";
import Movies from "./moviepage/Movies";
import MovieDetail from "./moviepage/MovieDetail";
import Navigation from "./component/Navigation";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <div className="appcontainer">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;

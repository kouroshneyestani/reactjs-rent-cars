import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// Import the configured store
import { store } from "./app/store";

// Components
import { Layout } from "./components";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Cars from "./pages/Cars";
import CarsDetails from "./pages/CarsDetails";
import Error404 from "./pages/404";

export default function App(props) {
    return (
        <div {...props}>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="cars" element={<Cars />} />
                        <Route path="cars/:id" element={<CarsDetails />} />
                        <Route path="search" element={<Search />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="*" element={<Error404 />} />
                    </Route>
                </Routes>
            </Provider>
        </div>
    );
}

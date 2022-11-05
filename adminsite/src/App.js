import { useState, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
// layout
import Layout from "./Layout";
import MinimalLayout from "./Layout/MinimalLayout";
import MainLayout from "./Layout/MainLayout";
// component
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import AddProductForm from "./scenes/forms/addProduct";
import Login from "./scenes/login/Login";
import Users from "./scenes/users";
import Categories from "./scenes/categories";
function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="manage-products" element={<Products />} />
                        <Route
                            path="manage-products/add"
                            element={<AddProductForm />}
                        />
                        <Route path="Users" element={<Users />} />
                        <Route
                            path="manage-categories"
                            element={<Categories />}
                        />
                    </Route>
                    <Route element={<MinimalLayout />}>
                        <Route path="login" element={<Login />} />
                    </Route>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App;

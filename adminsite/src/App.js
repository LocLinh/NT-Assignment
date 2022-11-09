import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
// layout
import Layout from "./layout";
import MinimalLayout from "./layout/MinimalLayout";
import MainLayout from "./layout/MainLayout";
// component
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import AddProductForm from "./scenes/forms/addProduct";
import AddCategoryForm from "./scenes/forms/addCategory";
import Login from "./scenes/login/Login";
import Register from "./scenes/login/Register";
import Users from "./scenes/users";
import Categories from "./scenes/categories";
import NotFoundPage from "./scenes/notFound";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<MainLayout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route index element={<Dashboard />} />
                            <Route
                                path="manage-products"
                                element={<Products />}
                            />
                            <Route
                                path="manage-products/add"
                                element={<AddProductForm />}
                            />
                            <Route
                                path="manage-categories/add"
                                element={<AddCategoryForm />}
                            />
                            <Route path="Users" element={<Users />} />
                            <Route
                                path="manage-categories"
                                element={<Categories />}
                            />
                        </Route>
                    </Route>
                    <Route element={<MinimalLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App;

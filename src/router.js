import React, { useEffect } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Produtos from "./pages/produtos";
import Perfil from "./pages/perfil";

import Menu from "./components/menu";

import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
export default function Router() {

    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    )
};
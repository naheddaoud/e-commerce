import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute(props) {
     if (localStorage.getItem('userToken')) {
        return props.children
     }else {
         return <Navigate to ={'/login'}/>
        }
}

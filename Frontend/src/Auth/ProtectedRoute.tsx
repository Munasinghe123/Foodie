import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import React from "react";

export default function ProtectedRoute({ children, requiredRole }:
    {
        children: React.ReactNode;
        requiredRole?: string;
    }) {

    const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.user);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/get-started" replace />;
    }

    if (requiredRole && requiredRole !== user?.role) {
        return <Navigate to="/unauthorized" replace />;
    }



    return <>{children}</>;
}

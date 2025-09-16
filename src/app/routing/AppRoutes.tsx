import { FC } from "react"
import { AuthPage, Logout, useAuth } from "../modules/auth"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { ErrorsPage } from "../modules/errors/ErrorsPage"
import { PrivateRoutes } from "./PrivateRoutes"
import { App } from "../App"

const { BASE_URL } = import.meta.env

const AppRoutes: FC = () => {
    const { currentUser } = useAuth()

    console.log(currentUser , "userdata");

    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route element={<App />}>
                    <Route path="error/*" element={<ErrorsPage />} />
                    <Route path="logout" element={<Logout />} />

                    {currentUser ? (
                        <>
                            <Route path="/*" element={<PrivateRoutes />} />
                            <Route index element={<Navigate to="/dashboard" />} />
                        </>
                    ) : (
                        <>
                            <Route path="auth/*" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    )}

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
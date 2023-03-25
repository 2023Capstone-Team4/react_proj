import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}/`,
        element: <App />,
        children: [
            {
                path: "",
                element: <LoginPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "join",
                element: <JoinPage />
            },
        ]
    }
])

export default router;

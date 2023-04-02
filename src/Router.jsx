import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import StudiesPage from "./pages/StudiesPage";
import StudyFormPage from "./pages/StudyFormPage";
import StudyPage from "./pages/StudyPage";

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}/`,
        element: <App />,
        children: [
            {
                path: "",
                element: <StudiesPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "join",
                element: <JoinPage />
            },
            {
                path: "community",
                children:[
                    {
                        path: "",
                        element: <StudiesPage />,
                    },
                    {
                        path: "studies",
                        element: <StudiesPage />
                    },
                    {
                        path: "studies/add",
                        element: <StudyFormPage />
                    },
                    {
                        path: "studies/:studyId",
                        element: <StudyPage />
                    }
                ]
            },
        ]
    }
])

export default router;

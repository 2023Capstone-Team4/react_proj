import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import StudiesPage from "./pages/StudiesPage";
//<<<<<<< Updated upstream
import StudyFormPage from "./pages/StudyFormPage";
import StudyPage from "./pages/StudyPage";
import StudyRankingPage from "./pages/StudyRankingPage";
import StudyMemberPage from "./pages/StudyMemeberPage";
import StudyBoardPage from "./pages/StudyBoardPage";
import StudyBoardFormPage from "./pages/StudyBoardFormPage";
//=======
import HomePage from "./pages/HomePage";
import MyStudyPage from "./pages/MyStudyPage";
//>>>>>>> Stashed changes

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}/`,
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path:"home",
                element:<HomePage/>
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
                    },
                    {
                        path: "studies/:sutdyId/ranking",
                        element: <StudyRankingPage />
                    },
                    {
                        path: "studies/:sutdyId/members",
                        element: <StudyMemberPage />
                    },
                    {
                        path: "studies/:sutdyId/board",
                        element: <StudyBoardPage />
                    },
                    {
                        path: "studies/:sutdyId/board/add",
                        element: <StudyBoardFormPage />
                    }
                ]
            },
            {
                path: "mystudy",
                element: <MyStudyPage/>
            }
        ]
    }
])

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
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
import CommunityPage from "./pages/CommunityPage";
import RealtimeFacecamPage from "./pages/RealtimeFacecamPage";
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
//<<<<<<< HEAD
                path: "myCommunity",
                element: <CommunityPage/>
//=======
            },
            {
                path: "realtimeFacecam",
                element:<RealtimeFacecamPage/>
            },
            {
                path: "mypage",
                element: <MyPage />
// >>>>>>> 545a96a349c5e184c232b8d02effc679d31384ae
            },
            {
                path: "community",
                children:[
                    {
                        path: "",
                        element: <CommunityPage />
                    },
                    {
                        path: "studies/*",
                        element: <StudiesPage />
                    },
                    {
                        path: "study/add",
                        element: <StudyFormPage />
                    },
                    {
                        path: "study/:studyId",
                        element: <StudyPage />
                    },
                    {
                        path: "study/:sutdyId/ranking",
                        element: <StudyRankingPage />
                    },
                    {
                        path: "study/:sutdyId/members",
                        element: <StudyMemberPage />
                    },
                    {
                        path: "study/:sutdyId/board",
                        element: <StudyBoardPage />
                    },
                    {
                        path: "study/:sutdyId/board/add",
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

import { useState, useEffect } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import styles from "./StudyBoardPage.module.css";

function StudyBoard() {
    const params = useParams();
    const [posts, setPosts] = useState();
    const getPosts = async (studyId) => {
        const response = await fetch(`http://localhost:8080/posting/${params.studyId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        if (!response.ok) throw new Error('bad server condition');
        return response.json();
    }
    useEffect(() => {
        getPosts(params.studyId).then(res => {
            setPosts(res.content);
        });
    }, []);

    console.log(posts);

    return posts && <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}`}><button className={styles.banner__btn}><TiChevronLeft /> 스터디 홈으로</button></Link>
                <div className={styles.banner__title}>
                    스터디 게시판
                </div>
            </div>
            <div className={styles.btn__add__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}/board/add`}>
                    <button className={styles.btn__add}>
                        <div className={styles.btn__back} />
                        게시물 작성
                    </button>
                </Link>
            </div>
            <div className={styles.board__wrapper}>
                {posts.map((post) =>
                    <div
                        key={post.id}
                        className={styles.board__item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}/board/${post.id}`}>
                            {post.title}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </>
}

export default StudyBoard;

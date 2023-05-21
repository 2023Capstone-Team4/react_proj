import { useState, useEffect } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./StudyBoardPage.module.css";

function StudyBoard() {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let startValue = Math.floor(curPage / 10) * 10 + 1;
    let endValue = Math.floor(curPage / 10 + 1) * 10 <= totalPages ? (curPage / 10 + 1) * 10 : totalPages;
    const changePage = (page) => {
        setCurPage(page);
    }
    const onBack = () => {
        setCurPage((cur) => cur - 1);
    }
    const onNext = () => {
        setCurPage((cur) => cur + 1);
    }
    const getPosts = async (studyId) => {
        const response = await fetch(`http://localhost:8080/posting/${params.studyId}?page=${curPage - 1}`, {
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
                    <div key={post.id}>
                        <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}/board/${post.id}`} state={{post: post}}>
                            <div
                                className={styles.board__item}>
                                {post.title}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles.pagination__wrapper}>
                {startValue && endValue && <div className={styles.pagination__wrapper}>
                    {startValue !== 1 && <button
                        onClick={onBack}
                        className={styles.pagination__button}><IoIosArrowBack /></button>}
                    {[...Array(endValue - startValue + 1).fill().map((_, index) => index + startValue).values()].map((value) =>
                        curPage === value ?
                            <button
                                onClick={() => { changePage(value) }}
                                key={value} className={styles.pagination__button__focus}>{value}</button> :
                            <button
                                onClick={() => { changePage(value) }}
                                key={value} className={styles.pagination__button}>{value}</button>
                    )}
                    {endValue !== totalPages && <button
                        onClick={onNext}
                        className={styles.pagination__button}><IoIosArrowForward /></button>}
                </div>}
            </div>
        </div>
    </>
}

export default StudyBoard;

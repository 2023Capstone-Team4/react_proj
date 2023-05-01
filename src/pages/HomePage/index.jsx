import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";

function HomePage() {
    const [recruits, setRecruits] = useState([]);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();
    
    const getRecruitment = async () => {
        const response = await fetch(`http://localhost:8080/study/recruitment`, {
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
        getRecruitment().then((res) => {
            // console.log(res);
            setRecruits(res.content);
        });
        getBoards().then((res) => {
            // console.log(res);
            setBoards(res.content);
        })
    }, []);

    const getBoards = async () => {
        const response = await fetch(`http://localhost:8080/posting/show`, {
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

    const onStudyJoin = async(studyId) => {
        if (window.confirm("스터디에 가입하시겠습니까?")) {
            const response = await fetch(`http://localhost:8080/study/join/${studyId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });
            if (!response.ok) throw new Error('bad server condition');
            navigate(`${process.env.PUBLIC_URL}/community/study/${studyId}`);
        } else {
            //onCancel();
        }
    }

    return <>
        <div className={styles.container}>
            <div className={styles.container_title}>
                홈
            </div>
            {/*내 학습*/}
            <div className={styles.wrapper_style1}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/mystudy`}>
                        <p>내 학습 ></p>
                    </Link>
                </div>
                <div className={styles.items}>
                    <div className={styles.item_style1}>
                        <div className={styles.item_mylog}>
                            <div className={styles.item_mylog_title}>나의 기록</div>
                            <div className={styles.item_mylog_cnt}>
                                <div className={styles.item_mylog_content}>오늘 학습 시간</div>
                                <div className={styles.item_mylog_content}>0시간 32분</div>
                            </div>
                            <div className={styles.item_mylog_cnt}>
                                <div className={styles.item_mylog_content}>오늘 자세교정 횟수</div>
                                <div className={styles.item_mylog_content}>4회</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item_style1}>
                        <div className={styles.item_mylog}>
                            <div className={styles.item_studylog_title}>최근 학습기록</div>
                            <div className={styles.item_studylog_cnt}>
                                <div className={styles.item_studylog_content}>학습 고유 id</div>
                                <div className={styles.item_studylog_content}>0시간 32분</div>
                                <div className={styles.item_studylog_content}>2023년 4월 7일</div>
                                <div className={styles.item_studylog_content}>4회</div>
                            </div>
                            <div className={styles.item_studylog_cnt}>
                                <div className={styles.item_studylog_content}>학습 고유 id</div>
                                <div className={styles.item_studylog_content}>0시간 32분</div>
                                <div className={styles.item_studylog_content}>2023년 4월 7일</div>
                                <div className={styles.item_studylog_content}>4회</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*내 스터디 div*/}
            <div className={styles.wrapper_style2}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/myCommunity`}>
                        <p>내 스터디 ></p>
                    </Link>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 최근 소식</p>
                    {boards.map((board) =>
                        <div
                            key={board.id}
                            className={styles.item_style2}>
                            <p className={styles.item_title}>{board.title}</p>
                            {/* <p>스터디 소식</p>
                            <p>스터디 이벤트 개최</p> */}
                            <p>{board.content}</p>
                        </div>)}
                </div>
            </div>

            {/*스터디 모집*/}
            <div className={styles.wrapper_style1}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/community`}>
                        <p>스터디 모집 ></p>
                    </Link>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}>최근 스터디 모집글</p>
                    {recruits.map((recruit) =>
                        <div
                            key={recruit.id} 
                            className={styles.item_style1}
                            onClick={()=>onStudyJoin(recruit.id)}>
                            <p className={styles.item_title}>{recruit.studyName}</p>
                            {/* <p>스터디 모집글</p>
                            <p>대학생 대상</p>
                            <p>기간: 5월-10월</p> */}
                            <p>{recruit.introduce}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}
export default HomePage;
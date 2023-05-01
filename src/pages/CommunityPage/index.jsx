import styles from "./CommunityPage.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CommunityPage(){
    const [recruits, setRecruits] = useState([]);
    const [studyLists, setStudyLists] = useState([]);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    const getStudyList = async() => {
        const response = await fetch(`http://localhost:8080/study/my`, {
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

    const getRecruitment = async() => {
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

    const getBoards = async() => {
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

    const onStudy = async(studyId) => {
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

    useEffect(()=>{
        getStudyList().then((res)=>{
            // console.log(res);
            setStudyLists(res.content);
        });
        getRecruitment().then((res)=>{
            // console.log(res);
            setRecruits(res.content);
        });
        getBoards().then((res)=>{
            // console.log(res);
            setBoards(res.content);
        })
    },[]);

    return recruits && studyLists && boards && <>
        <div className={styles.container}>
            <div className={styles.container_title}>
                커뮤니티
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/community/studies`}>
                        <p>스터디 ></p>
                    </Link>
                </div>
                <div>
                    <Link to={`${process.env.PUBLIC_URL}/community/study/add`}>
                        <button className={styles.wrapper_button}>스터디 개설</button>
                    </Link>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 내 스터디</p>
                    {studyLists.map(study =>
                        <Link to={`${process.env.PUBLIC_URL}/community/study/${study.id}`}>
                        <div key={study.id} className={styles.item_style1}>
                            <div className={styles.item_content_category}>
                                <div>#{study.category}</div>
                            </div>
                            <div className={styles.item_content_title}>
                                <div>{study.studyName}</div>
                            </div>
                            <div className={styles.item_content}>
                                <div><pre> 스터디 소개</pre></div>
                                <p>{study.introduce}</p>
                            </div>
                            <div className={styles.item_content}>
                                <div><pre> 제한인원</pre></div>
                                <p><pre> {study.maxPeople}명</pre></p>
                            </div>
                        </div>
                        </Link>
                    )}
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 모집글</p>
                    {recruits.map((recruit)=>
                        <div
                            key={recruit.id}
                            className={styles.item_style1}
                            onClick={()=>onStudy(recruit.id)}>
                            <p className={styles.item_title}>{recruit.studyName}</p>
                            <p>{recruit.introduce}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/start`}>
                        <p>게시판 ></p>
                    </Link>
                </div>
                <div>
                    <button className={styles.wrapper_button}>게시글 작성</button>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 게시글 목록</p>
                    {boards.map((board)=>
                        <div
                            key={board.id} 
                            className={styles.item_style1}>
                            <p className={styles.item_title}>{board.title}</p>
                            {/* <p>스터디 소식</p>
                            <p>스터디 이벤트 개최</p> */}
                            <p>{board.content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>;
}
export default CommunityPage;

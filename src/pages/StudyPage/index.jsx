import { TiArrowRightThick, TiChevronLeft } from "react-icons/ti";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { category_BackToFront } from "../../utils/getCategory";
import styles from "./StudyPage.module.css";
import Calender from "../../components/Calender";

function StudyPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const onMenuOpen = () => {
        setMenuOpen(cur => !cur);
    }
    const [study, setStudy] = useState();
    const [members, setMembers] = useState();
    const params = useParams();
    const getStudy = async(studyId) => {
        const response = await fetch(`http://localhost:8080/study/${studyId}`, {
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
    const getMembers = async(studyId) => {
        const response = await fetch(`http://localhost:8080/study/${studyId}/members`, {
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
    useEffect(()=>{
        getStudy(params.studyId).then(res=>{
            console.log(res);
            setStudy(res);
        });
        getMembers(params.studyId).then(res=>{
            setMembers(res.content.length > 5 ? res.content.slice(0,5) : res.content);
        });
    },[]);

    return study&&members ? <>
    <div className={styles.container}>
        <div className={styles.banner__wrapper}>
            <Link to={`${process.env.PUBLIC_URL}/community/studies`}><button className={styles.banner__btn__back}><TiChevronLeft /> 전체 스터디 목록으로</button></Link>
            <div className={styles.banner__title}>
                <div>
                    <span>{study.studyName}</span>
                    <span className={styles.banner__title__category}># {category_BackToFront(study.category)}</span>
                </div>
                <div className={styles.banner__title__icon} onClick={onMenuOpen}><IoIosArrowDown />
                    {menuOpen ? <div>
                        <div className={styles.back} />
                            <ul className={styles.subbar}>
                                <li><Link to={`${process.env.PUBLIC_URL}/community/studies/1/setting`}>스터디 설정</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/community/studies/1/setting`}>스터디 탈퇴</Link></li>
                            </ul>
                        </div> : null}
                </div>
            </div>
            <button className={styles.banner__btn}>
                <div className={styles.btn__back} />
                <div className="btn__text">학습 시작 <TiArrowRightThick /></div>
            </button>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.items__wrapper}>
                <div className={styles.items__wrapper__row}>
                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/study/1/calender`}>
                            <span className={styles.item__title}>스터디 일정 <IoIosArrowForward /></span>
                        </Link>
                        <Calender />
                    </div>
                    <div className={styles.items__wrapper__col}>
                        <div className={styles.item}>
                            <Link to={`${process.env.PUBLIC_URL}/community/study/1/ranking`}>
                                <span className={styles.item__title}>스터디 랭킹 <IoIosArrowForward /></span>
                            </Link>
                            <div className={styles.ranking__wrapper}>
                                <div className={styles.ranking__item}>조서영</div>
                                <div className={styles.ranking__item}>조서영</div>
                                <div className={styles.ranking__item}>조서영</div>
                                <div className={styles.ranking__item}>조서영</div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <Link to={`${process.env.PUBLIC_URL}/community/study/1/members`}>
                                <span className={styles.item__title}>스터디 멤버 <IoIosArrowForward /></span>
                            </Link>
                            <div className={styles.member__wrapper}>
                                {members.map((member)=>
                                    <div className={styles.member__item}>{member.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <Link to={`${process.env.PUBLIC_URL}/community/study/1/board`}>
                        <span className={styles.item__title}>스터디 게시판 <IoIosArrowForward /></span>
                    </Link>
                    <div className={styles.board__wrapper}>
                        <div className={styles.board__item}>1주차 공지</div>
                        <div className={styles.board__item}>2주차 공지</div>
                        <div className={styles.board__item}>3주차 공지</div>
                        <div className={styles.board__item}>4주차 공지</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</> : null;
}

export default StudyPage;

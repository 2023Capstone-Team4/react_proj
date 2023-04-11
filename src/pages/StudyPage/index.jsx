import { TiArrowRightThick, TiChevronLeft } from "react-icons/ti";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./StudyPage.module.css";
import Calender from "../../components/Calender";

function StudyPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const onMenuOpen = () => {
        setMenuOpen(cur => !cur);
    }

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/studies`}><button className={styles.banner__btn__back}><TiChevronLeft /> 전체 스터디 목록으로</button></Link>
                <div className={styles.banner__title}>
                    <div>
                        <span>스터디 이름</span>
                        <span className={styles.banner__title__category}># 어학</span>
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
                                    <div className={styles.member__item}>조서영</div>
                                    <div className={styles.member__item}>조서영</div>
                                    <div className={styles.member__item}>조서영</div>
                                    <div className={styles.member__item}>조서영</div>
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
    </>
}

export default StudyPage;

import { TiChevronLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import styles from "./StudyBoardPage.module.css";

function StudyBoard() {
    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/1`}><button className={styles.banner__btn}><TiChevronLeft /> 스터디 홈으로</button></Link>
                <div className={styles.banner__title}>
                    스터디 게시판
                </div>
            </div>
            <div className={styles.btn__add__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/1/board/add`}>
                    <button className={styles.btn__add}>
                        <div className={styles.btn__back} />
                        게시물 작성
                    </button>
                </Link>
            </div>
            <div className={styles.board__wrapper}>
                <div className={styles.board__item}>1주차 공지</div>
                <div className={styles.board__item}>2주차 공지</div>
                <div className={styles.board__item}>3주차 공지</div>
                <div className={styles.board__item}>4주차 공지</div>
            </div>
        </div>
    </>
}

export default StudyBoard;

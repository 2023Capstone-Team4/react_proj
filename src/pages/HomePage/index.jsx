import styles from "./HomePage.module.css";
import {Link} from "react-router-dom";

function HomePage(){
    return <>
        <div className={styles.container}>
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
                    <Link to={`${process.env.PUBLIC_URL}/mylog`}>
                        <p>내 스터디 ></p>
                    </Link>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 최근 소식</p>
                    <div className={styles.item_style2}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
                    <div className={styles.item_style2}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
                    <div className={styles.item_style2}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
                    <div className={styles.item_style2}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
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
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 모집글</p>
                        <p>대학생 대상</p>
                        <p>기간: 5월-10월</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 모집글</p>
                        <p>대학생 대상</p>
                        <p>기간: 5월-10월</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 모집글</p>
                        <p>대학생 대상</p>
                        <p>기간: 5월-10월</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 모집글</p>
                        <p>대학생 대상</p>
                        <p>기간: 5월-10월</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 모집글</p>
                        <p>대학생 대상</p>
                        <p>기간: 5월-10월</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default HomePage;
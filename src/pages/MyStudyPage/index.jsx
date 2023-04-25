import styles from "./MyStudyPage.module.css";
import {Link} from "react-router-dom";

function MyStudyPage(){

    return <>
        <div className={styles.container}>
            <div className={styles.container_title}>
                내 학습
            </div>
            {/*학습 시작*/}
            <div className={styles.wrapper_style1}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/start`}>
                        <p>학습 시작 ></p>
                    </Link>
                </div>
                <div>
                    <button className={styles.wrapper_button}>학습 레포트</button>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 학습 목록</p>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>개인 학습</p>
                        <p>오늘 학습 시간</p>
                        <p>0시간 24분</p>
                        <div>
                            <button className={styles.item_button} >
                                <Link to={`${process.env.PUBLIC_URL}/realtimeFacecam`}>학습 시작</Link>
                            </button>
                        </div>
                        {/*<Link to={`${process.env.PUBLIC_URL}/start_personal`} className={styles.item_button}>학습 시작</Link>*/}
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>스터디</p>
                        <p>오늘 학습 시간</p>
                        <p>0시간 12분</p>
                        <div>
                            <button className={styles.item_button} >학습 시작</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*나의 스터디*/}
            <div className={styles.wrapper_style2}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/start`}>
                        <p>나의 스터디 ></p>
                    </Link>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 스터디 목록</p>
                    <div className={styles.item_style2}>
                        <p className={styles.item_title}>스터디1</p>
                        <p>오늘 학습 시간</p>
                        <p>0시간 12분</p>
                        <br/>
                        <p>오늘 스터디 소식</p>
                        <p>8시 팀1 미팅</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default MyStudyPage;
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
                        <table className={styles.item_table}>
                            <th>나의 기록</th>
                            <tr><td> </td></tr>
                            <tr>
                                <td>오늘 학습 시간</td>
                                <td>오늘 자세 교정 횟수</td>
                            </tr>
                            <tr>
                                <td>0시간 32분</td>
                                <td>4회</td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.item_style1}>
                        <table className={styles.item_table}>
                            <th>최근 학습 기록</th>
                            <tr><td> </td></tr>
                            <tr>
                                <td>학습 고유 id</td>
                                <td>2023년 3월 28일</td>
                                <td>0시간 32분</td>
                                <td>4회</td>
                            </tr>
                            <tr>
                                <td>학습 고유 id</td>
                                <td>2023년 3월 28일</td>
                                <td>0시간 32분</td>
                                <td>4회</td>
                            </tr>
                        </table>
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
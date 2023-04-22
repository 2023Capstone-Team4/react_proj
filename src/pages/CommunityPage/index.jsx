import styles from "./CommunityPage.module.css";
import {Link} from "react-router-dom";

function CommunityPage(){
    return <>
        <div className={styles.container}>
            <div className={styles.conatiner_title}>
                커뮤니티
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapper_title}>
                    <Link to={`${process.env.PUBLIC_URL}/community/studies`}>
                        <p>스터디 ></p>
                    </Link>
                </div>
                <div>
                    <button className={styles.wrapper_button}>스터디 개설</button>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 내 스터디</p>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
                </div>
                <div className={styles.items}>
                    <p className={styles.item_subTitle}> 모집글</p>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>스터디 이름</p>
                        <p>기간</p>
                        <p>인원</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>스터디 이름</p>
                        <p>기간</p>
                        <p>인원</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>스터디 이름</p>
                        <p>기간</p>
                        <p>인원</p>
                    </div>
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>스터디 이름</p>
                        <p>기간</p>
                        <p>인원</p>
                    </div>
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
                    <div className={styles.item_style1}>
                        <p className={styles.item_title}>제목</p>
                        <p>스터디 소식</p>
                        <p>스터디 이벤트 개최</p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
export default CommunityPage;
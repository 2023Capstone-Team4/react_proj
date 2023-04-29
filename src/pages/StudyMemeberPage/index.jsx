import { TiChevronLeft } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import styles from "./StudyMemberPage.module.css";

function StudyMemberPage() {
    const params = useParams();

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}`}><button className={styles.banner__btn}><TiChevronLeft /> 스터디 홈으로</button></Link>
                <div className={styles.banner__title}>
                    스터디 멤버
                </div>
            </div>
            <div className={styles.member__wrapper}>
                <div className={styles.member__item}>조서영</div>
                <div className={styles.member__item}>조서영</div>
                <div className={styles.member__item}>조서영</div>
                <div className={styles.member__item}>조서영</div>
            </div>
        </div>
    </>
}

export default StudyMemberPage;

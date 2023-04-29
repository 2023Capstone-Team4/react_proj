import { useState, useEffect } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import styles from "./StudyMemberPage.module.css";

function StudyMemberPage() {
    const params = useParams();
    const [members, setMembers] = useState([]);
    const getMembers = async (studyId) => {
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
    useEffect(() => {
        getMembers(params.studyId).then(res => {
            setMembers(res.content.length > 5 ? res.content.slice(0, 5) : res.content);
        });
    }, []);

    return members && <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/study/${params.studyId}`}><button className={styles.banner__btn}><TiChevronLeft /> 스터디 홈으로</button></Link>
                <div className={styles.banner__title}>
                    스터디 멤버
                </div>
            </div>
            <div className={styles.member__wrapper}>
                {members.map((member) =>
                    <div
                        key={member.id}
                        className={styles.member__item}>{member.name}</div>
                )}
            </div>
        </div>
    </>
}

export default StudyMemberPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { category_BackToFront } from "../../utils/getCategory";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./StudiesPage.module.css";

function StudiesPage() {
    // pagination ///////////////////////////////////////////////////////////////////////
    const [studies, setStudies] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let startValue = Math.floor(curPage / 10) * 10 + 1;
    let endValue = Math.floor(curPage / 10 + 1) * 10 <= totalPages ? (curPage / 10 + 1) * 10 : totalPages;
    const changePage = (page) => {
        setCurPage(page);
    }
    const onBack = () => {
        setCurPage((cur) => cur - 1);
    }
    const onNext = () => {
        setCurPage((cur) => cur + 1);
    }
    // totalPage가 14이고 현재 1페이지라면
    // 시작 페이지: 현재페이지/10 = 몫, 나머지, (몫)*10+1이 시작페이지, 예: 0/10+1
    // 마지막 페이지: 현재페이지/10 = 몫, 나머지, (몫+1)*10이 마지막 페이지, 예: (0+1)*10 = k
    // 단, 마지막 페이지는 totalPages를 고려해야 한다.
    // k<=totalPage라면 상관없지만, k>totalPages라면 페이지는 존재하지 않는다.  
    ////////////////////////////////////////////////////////////////////////////////////
    // test text ////////////////////////////////////////////////////////////////////////
    // const medium_text = "같이 캡스톤 나갈 스터디원 모집하고 있습니다!많은 관심 부탁드려요";
    // const long_text = "토익 900점을 목표로 같이 공부하실 분 모집합니다!! 출석 중요 매주 수요일 건대입구역에서 스터디합니다! 필참! 회비 7000원입니다. 친목 좋아요!!! 다같이 영어마스터마스터!!!! 굳굳굳";

    useEffect(() => {
        const getStudies = async () => {
            try {
                const response = await fetch(`http://localhost:8080/study/recruit?page=${curPage - 1}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                });
                if (!response.ok) throw new Error('bad server condition');
                return response.json();
            } catch (e) {
                console.error('getStudies Error: ', e.message);
                return false;
            }
        }
        getStudies().then((res) => {
            setStudies(res.content);
            setTotalPages(res.totalPages);
        })
    }, [curPage]);

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <p className={styles.banner__title}>스터디 모집</p>
                <Link to={`${process.env.PUBLIC_URL}/community/studies/add`}>
                    <button className={styles.banner__btn}>
                        <div className={styles.btn__back}>스터디 개설</div>
                        스터디 개설
                    </button>
                </Link>
            </div>
            <div className={styles.wrapper}>
                <div>
                    <ul className={styles.sidebar}>
                        <li>전체 스터디</li>
                        <li>개발/프로그래밍</li>
                        <li>IT</li>
                        <li>게임 개발</li>
                        <li>크리에이티브</li>
                        <li>학문/외국어</li>
                        <li>커리어</li>
                        <li>자기계발</li>
                    </ul>
                </div>
                <div className={styles.items__wrapper}>
                    <div className={styles.items}>
                        {studies.map((study) =>
                            <div className={styles.item} key={study.id}>
                                <Link to={`${process.env.PUBLIC_URL}/community/studies/${study.id}`}>
                                    <div className={styles.item__title}>
                                        {/* <span className={styles.item__title__open}>모집중</span> */}
                                        <span className={styles.item__title__text}>{study.studyName}</span>
                                    </div>
                                    <div className={styles.item__category}>
                                        <span className={styles.item__category__text}># {category_BackToFront(study.category)}</span>
                                    </div>
                                    <div className={styles.item__content}>
                                        <p className={styles.item__content__limit}>제한인원: 현재인원/{study.maxPeople}</p>
                                        <p className={styles.item__content__text}>
                                            {study.introduce.length > 80 ? study.introduce.slice(0, 80) + "..." : study.introduce}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.pagination__wrapper}>
                        {startValue && endValue && <div className={styles.pagination__wrapper}>
                            {startValue !== 1 && <button
                                onClick={onBack}
                                className={styles.pagination__button}><IoIosArrowBack /></button>}
                            {[...Array(endValue - startValue + 1).fill().map((_, index) => index + startValue).values()].map((value) =>
                                curPage === value ?
                                    <button
                                        onClick={() => { changePage(value) }}
                                        key={value} className={styles.pagination__button__focus}>{value}</button> :
                                    <button
                                        onClick={() => { changePage(value) }}
                                        key={value} className={styles.pagination__button}>{value}</button>
                            )}
                            {endValue !== totalPages && <button
                                onClick={onNext}
                                className={styles.pagination__button}><IoIosArrowForward /></button>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default StudiesPage;

import { useState, useEffect } from "react";
import { Link, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { category_BackToFront, category_BackToFront_URL, category_FrontToBack_URL } from "../../utils/getCategory";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
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

    const navigate = useNavigate();
    const categoryNames = ["it-programming", "it", "game-dev", "creative", "academics", "career", "life"];
    const match = useMatch("community/studies");
    const programmingMatch = useMatch("community/studies/it-programming");
    const itMatch = useMatch("community/studies/it");
    const gameMatch = useMatch("community/studies/game-dev");
    const creativeMatch = useMatch("community/studies/creative");
    const academicsMatch = useMatch("community/studies/academics");
    const careerMatch = useMatch("community/studies/career");
    const lifeMatch = useMatch("community/studies/life");
    //const searchMatch = useMatch("community/studies/search");
    const [curCategory, setCurCategory] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams();
    const getCurrentCategory = () => {
        if (match) return "all";
        else if (programmingMatch) return "it-programming";
        else if (itMatch) return "it";
        else if (gameMatch) return "game-dev";
        else if (creativeMatch) return "creative";
        else if (academicsMatch) return "academics";
        else if (careerMatch) return "career";
        else if (lifeMatch) return "life";
        else return "search";
    }
    const onCategoryMove = (categoryName) => {
        if(categoryName === "all"){
            setCurCategory("all");
            navigate(`${process.env.PUBLIC_URL}/community/studies`);
        }else{
            setCurCategory(categoryName);
            navigate(`${process.env.PUBLIC_URL}/community/studies/${categoryName}`);
        }
    }

    //searchbar
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onValid = (data) => {
        setCurCategory("search");
        navigate(`${process.env.PUBLIC_URL}/community/studies/search?keyword=${data.keyword}`);
    }

    useEffect(() => {
        const curCategory = getCurrentCategory();
        const keyword = searchParams.get("keyword");
        const API_URI = curCategory === "all" ? "http://localhost:8080/study/recruit" : 
        keyword ?  `http://localhost:8080/study/recruit/search/${keyword}` :
        `http://localhost:8080/study/recruit/${category_FrontToBack_URL(curCategory)}`;
        
        const getStudies = async () => {
            try {
                const response = await fetch(`${API_URI}?page=${curPage - 1}`, {
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
                return {"content":[]};
            }
        }
        getStudies().then((res) => {
            if(res.content){
                setStudies(res.content);
            }else{
                setStudies(res);
            }
            setTotalPages(res.totalPages);
        })
    }, [curPage, curCategory]);

    //join study function 
    const onStudy = async(studyId) => {
        const response = await fetch(`http://localhost:8080/study/join/${studyId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        if (!response.ok) throw new Error('bad server condition');
        navigate(`${process.env.PUBLIC_URL}/community/study/${studyId}`);
    }

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <p className={styles.banner__title}>스터디 모집</p>
                <Link to={`${process.env.PUBLIC_URL}/community/study/add`}>
                    <button className={styles.banner__btn}>
                        <div className={styles.btn__back}>스터디 개설</div>
                        스터디 개설
                    </button>
                </Link>
            </div>
            <div className={styles.searchbar__wrapper}>
                <form className={styles.searchbar} onSubmit={handleSubmit(onValid)}>
                    <input 
                        {...register("keyword", { required: "검색어 입력은 필수입니다." })}
                        placeholder="keyword를 입력해주세요."/>
                    <button type="submit"><IoIosSearch /></button>
                </form>
                <div className={styles.error_message}>
                    {errors?.keyword?.message}
                </div>
            </div>
            <div className={styles.wrapper}>
                <div>
                    <ul className={styles.sidebar}>
                        {getCurrentCategory() === "all" ?
                            <li onClick={()=>onCategoryMove("all")} id={styles.li__focus}>전체 스터디</li> :
                            <li onClick={()=>onCategoryMove("all")}>전체 스터디</li>}
                        {categoryNames.map((categoryName, index) =>
                            getCurrentCategory() === categoryName ?
                            <li key={index} onClick={()=>onCategoryMove(categoryName)} id={styles.li__focus}>{category_BackToFront_URL(categoryName)}</li> :
                            <li key={index} onClick={()=>onCategoryMove(categoryName)}>{category_BackToFront_URL(categoryName)}</li>
                        )}
                    </ul>
                </div>
                <div className={styles.items__wrapper}>
                    <div className={styles.items}>
                        {studies.map((study) =>
                            <div className={styles.item} key={study.id} onClick={()=>onStudy(study.id)}>
                                {/* <Link to={`${process.env.PUBLIC_URL}/community/study/${study.id}`}> */}
                                    <div className={styles.item__title}>
                                        {/* <span className={styles.item__title__open}>모집중</span> */}
                                        <span className={styles.item__title__text}>{study.studyName}</span>
                                    </div>
                                    <div className={styles.item__category}>
                                        <span className={styles.item__category__text}># {category_BackToFront(study.category)}</span>
                                    </div>
                                    <div className={styles.item__content}>
                                        {/* <p className={styles.item__content__limit}>제한인원: 현재인원/{study.maxPeople}</p> */}
                                        <p className={styles.item__content__text}>
                                            {study.introduce.length > 80 ? study.introduce.slice(0, 80) + "..." : study.introduce}
                                        </p>
                                    </div>
                                {/* </Link> */}
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

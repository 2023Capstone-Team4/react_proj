import { Link } from "react-router-dom";
import styles from "./StudiesPage.module.css";

function StudiesPage() {
    const medium_text = "같이 캡스톤 나갈 스터디원 모집하고 있습니다!많은 관심 부탁드려요";
    const long_text = "토익 900점을 목표로 같이 공부하실 분 모집합니다!! 출석 중요 매주 수요일 건대입구역에서 스터디합니다! 필참! 회비 7000원입니다. 친목 좋아요!!! 다같이 영어마스터마스터!!!! 굳굳굳";

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
                <div className={styles.items}>
                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>


                    <div className={styles.item}>
                        <div className={styles.item__title}>
                            <span className={styles.item__title__open}>모집중</span>
                            <span className={styles.item__title__text}>토익 900점...!</span>
                        </div>
                        <div className={styles.item__category}>
                            <span className={styles.item__category__text}># 어학</span>
                        </div>
                        <div className={styles.item__content}>
                            <p className={styles.item__content__limit}>제한인원: 3/5</p>
                            <p className={styles.item__content__text}>
                                {long_text.length > 80 ? long_text.slice(0, 80) + "..." : long_text}
                            </p>
                        </div>
                    </div>


                    <div className={styles.item}>
                        <Link to={`${process.env.PUBLIC_URL}/community/studies/1`}>
                            <div className={styles.item__title}>
                                <span className={styles.item__title__open}>모집중</span>
                                <span className={styles.item__title__text}>2023년 1학기 캡스톤 뿌셔!</span>
                            </div>
                            <div className={styles.item__category}>
                                <span className={styles.item__category__text}># 개발</span>
                            </div>
                            <div className={styles.item__content}>
                                <p className={styles.item__content__limit}>제한인원: 3/5</p>
                                <p className={styles.item__content__text}>
                                    {medium_text.length > 80 ? medium_text.slice(0, 80) + "..." : medium_text}
                                </p>
                            </div>
                        </Link>
                    </div>


                    <div className={styles.item}>
                        <div className={styles.item__title}>
                            <span className={styles.item__title__open}>모집중</span>
                            <span className={styles.item__title__text}>토익 900점...!</span>
                        </div>
                        <div className={styles.item__category}>
                            <span className={styles.item__category__text}># 어학</span>
                        </div>
                        <div className={styles.item__content}>
                            <p className={styles.item__content__limit}>제한인원: 3/5</p>
                            <p className={styles.item__content__text}>
                                {long_text.length > 80 ? long_text.slice(0, 80) + "..." : long_text}
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default StudiesPage;

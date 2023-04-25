import { Link, useNavigate } from "react-router-dom";
import { TiChevronLeft } from "react-icons/ti";
import { useForm } from "react-hook-form";
import styles from "./StudyFormPage.module.css";

function StudyFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onValid = (data) => {
        fetch('http://localhost:8080/study/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": data.name,
                "category": data.category === "개발/프로그래밍" ? "IT_PROGRAMMING" : 
                data.category === "IT" ? "IT" :
                data.category === "게임 개발" ? "GAME_DEV" : 
                data.category === "크리에이티브" ? "CREATIVE" :
                data.category === "학문/외국어" ? "ACADEMICS" :
                data.category === "커리어" ? "CAREER" :
                "LIFE",  
                "maxPeople": data.maxPeople,
                "introduce": data.introduce,
            }),
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                alert("스터디 등록이 완료되었습니다.");
                navigate(`${process.env.PUBLIC_URL}/community/studies`);
                //navigate(-1); // back
            }
        }).catch(error => {
            console.log(error);
        });

    }
    const onCancel = () => {
        // navigate(`${process.env.PUBLIC_URL}/community/studies`);
        navigate(-1); // back
    }

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={-1}>
                    <button className={styles.banner__btn}><TiChevronLeft /> 뒤로</button>
                </Link>
                <p className={styles.banner__title}>스터디 개설</p>
            </div>
            <div className={styles.form__wrapper}>
                <form onSubmit={handleSubmit(onValid)}>
                    <label className={styles.input__title}>
                        스터디 이름
                    </label>
                    <input
                        {...register("name", { required: "스터디 이름 입력은 필수입니다." })}
                        className={styles.input} type="text" />
                    <div className={styles.error_message}>
                        {errors?.name?.message}
                    </div>
                    <label className={styles.input__title}>
                        스터디 카테고리
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className={styles.select}>
                        <option>개발/프로그래밍</option>
                        <option>IT</option>
                        <option>게임 개발</option>
                        <option>크리에이티브</option>
                        <option>학문/외국어</option>
                        <option>커리어</option>
                        <option>자기계발</option>
                    </select>
                    <div className={styles.error_message}>
                        {errors?.category?.message}
                    </div>
                    <label className={styles.input__title}>
                        스터디 제한인원
                    </label>
                    <input
                        {...register("maxPeople", {
                            required: "스터디 제한인원 입력은 필수입니다.",
                            min: {
                                value: 1,
                                message: "스터디 제한인원은 1명 이상이여야 합니다."
                            },
                            valueAsNumber: true,
                        })}
                        className={styles.input} type="number" />
                    <div className={styles.error_message}>
                        {errors?.limit?.message}
                    </div>
                    <label className={styles.input__title}>
                        스터디 소개
                    </label>
                    <textarea
                        {...register("introduce", { required: false })}
                        className={styles.textarea} />
                    <div className={styles.error_message}>
                        {errors?.text?.message}
                    </div>

                    <button className={styles.button__submit} type="submit">
                        <div className={styles.button__back}></div>
                        등록
                    </button>
                    <button className={styles.button__cancel} onClick={onCancel}>
                        <div className={styles.button__back}></div>
                        취소
                    </button>
                </form>
            </div>
        </div>
    </>
}

export default StudyFormPage;


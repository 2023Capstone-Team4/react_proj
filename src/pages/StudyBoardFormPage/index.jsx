import { useForm } from "react-hook-form";
import { TiChevronLeft } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import styles from "./StudyBoardFormPage.module.css";

function StudyBoardFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onValid = (data) => {
        console.log(data);
        console.log(errors);
    }
    const onCancel = () => {
        navigate(`${process.env.PUBLIC_URL}/community/studies/1/board`);
    }

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={`${process.env.PUBLIC_URL}/community/studies/1/board`}><button className={styles.banner__btn}><TiChevronLeft /> 전체 게시판 목록으로</button></Link>
                <p className={styles.banner__title}>스터디 게시물 작성</p>
            </div>
            <div className={styles.form__wrapper}>
                <form onSubmit={handleSubmit(onValid)}>
                    <label className={styles.input__title}>
                        제목
                    </label>
                    <input
                        {...register("title", { required: "제목 입력은 필수입니다." })}
                        className={styles.input} type="text" />
                    <div className={styles.error_message}>
                        {errors?.title?.message}
                    </div>
                    <label className={styles.input__title}>
                        내용
                    </label>
                    <textarea
                        {...register("content", { required: true })}
                        className={styles.textarea} />
                    <div className={styles.error_message}>
                        {errors?.content?.message}
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

export default StudyBoardFormPage;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TiChevronLeft } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./StudyBoardModifyFormPage.module.css";

function StudyBoardModifyFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const onValid = (data) => {
        //console.log(data);
        //console.log(errors);
        // fetch(`http://localhost:8080/posting/write/${params.studyId}`, {
        //         method: 'POST',
        //         credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "title": data.title,
        //             "content": data.content,
        //         }),
        //     }).then(res => {
        //         if(res.ok){
        //             alert("게시글 수정이 완료되었습니다.");
        //             navigate(-1);
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         alert(error);
        //     });
    }
    const onDelete = () => {
        if (window.confirm("게시물을 삭제할 경우 복구할 수 없습니다. 삭제하시겠습니까?")) {
            // 게시물 삭제
            // fetch('http://localhost:8080/posting/delete', {
            //     method: 'DELETE',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            // }).then(res => {
            //     if (res.ok) {
            //         alert("회원 탈퇴가 완료되었습니다.");
            //         navigate(`${process.env.PUBLIC_URL}/`);
            //     }
            // }).catch(error => {
            //     console.log(error);
            // });
        } else {
            onCancel();
        }
    }
    const onCancel = () => {
        navigate(-1);
    }
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/posting/`, {
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
                console.error('getPost Error: ', e.message);
                return "false";
            }
        }
        // getPost().then((res) => {
        //     //console.log(res);
        //     setValue("title", res.title);
        //     setValue("content", res.content);
        // });
    }, []);

    return <>
        <div className={styles.container}>
            <div className={styles.banner__wrapper}>
                <Link to={-1}><button className={styles.banner__btn}><TiChevronLeft /> 전체 게시판 목록으로</button></Link>
                <p className={styles.banner__title}>스터디 게시물 수정</p>
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
                        수정
                    </button>
                    <button className={styles.button__delete} onClick={onDelete}>
                        <div className={styles.button__back}></div>
                        삭제
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

export default StudyBoardModifyFormPage;

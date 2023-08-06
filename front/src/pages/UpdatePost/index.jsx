import styles from "./index.module.css";
import selectIcon from "../../assets/btn_select_photo.png";
import CreatePostText from "../../components/CreatePostText";
import SelectImg from "../../components/SelectImg";

import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

//상태관리 라이브러리
import { nextPostid,recentPosts } from "../../atom";
import { useRecoilValue, useRecoilState } from "recoil";

const UpdatePost =(props)=>{
    const nav=useNavigate();
    const {state:{post}}=useLocation();

   const [content,setContent]=useState(post.content);
    const [nextpostid,setNextpostid]=useRecoilState(nextPostid);
    const [data,setData] = useRecoilState(recentPosts);
    const idx = data.findIndex((d)=>d.postId === post.postId);


    const handleSubmit= async(e)=>{
        
        // Patch실행

        //더미데이터로 추가하기
        const newPost={
            postId : post.postId,
            writer : "융입니다",
            profileImg : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20131216_2%2Fxtjbx42795_1387160042980nSXHw_JPEG%2F2012-02-14_22%253B19%253B59.jpg&type=a340",
            content : content,
            imgs : post.imgs,
            createdAt : post.createdAt,
            loved : post.loved
        }
        let newposts=[...data];
        newposts[idx]=newPost;
        setData(newposts);
        

        // state값 전달하며 페이지 이동
         nav("/Main/postlist");

    }

    return(
        <div className={styles.wrapper}>
            
            <div className={styles.title}>글 업로드</div>
            <div className={styles.imgbox}>
                {post.imgs.map((img)=>(
                    <img className={styles.imgSize} src={img}></img>
                ))}
                

            </div>
            
            {/* <SelectImg></SelectImg> */}
            
   
            <div className={styles.subtitle}>글 작성</div>
           

            <CreatePostText setContent={setContent} handleSubmit={handleSubmit} content={post.content} btntitle="수정하기"></CreatePostText>
                
            
        </div>
     )

};

export default UpdatePost;
/**게시글 하나 컴포넌트입니다 */
import styles from "./index.module.css";
import PostUserHeader from "../PostUserHeader";
import PostContent from "../PostContent";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";
import {token,postid,userImg,header} from "../../atom";
import { useRecoilState,useRecoilValue } from "recoil";



const Post = ({it}) => {
    const authToken=useRecoilValue(token);
    // const [postId,setPostId] = useRecoilState(postid);
    const headers = useRecoilValue(header);
    
    const [heart, setHeart] = useState();

    const pushHeart = (id) => {
        console.log(id + "하트누름");
        heart ? setHeart(false) : setHeart(true);
    };

    const nav = useNavigate();


    // useEffect(()=>{
    //     console.log("it",it);
        
    // },[]);

    return (
        <div>
            <div key={it.postId} className={styles.wrapper}>
                    <PostUserHeader
                        userImg={it.profileImg}
                        username={it.writer}
                        postdate={it.createdAt}
                    ></PostUserHeader>
                    <div className={styles.postContent}>
                        <div className={styles.postimg}>
                            <Swiper
                                className={styles.swiper}
                                // install Swiper modules
                                modules={[Pagination]}
                                spaceBetween={120}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                style={{
                                    "--swiper-pagination-color": "#9378FF",
                                    "--swiper-pagination-bullet-inactive-color":
                                        "#FFF",
                                    "--swiper-pagination-bullet-inactive-opacity":
                                        "1",
                                }}
                            >
                                {it.imgs.map((photo, idx) => {
                                    return (
                                        <SwiperSlide key={idx}>
                                            <div className={styles.swiperimg}>
                                                <img className={styles.img} src={photo} />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        <PostContent
                            postlist={it}
                            pushHeart={(e) => {
                                pushHeart(it.postId);
                            }}
                            
                        ></PostContent>
                    </div>
                </div>
            
        </div>
    );
};

// Post.defaultProps = {
//     postlist: [],
// };

export default Post;

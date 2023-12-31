import styles from "./index.module.css";

import ClickDots from "../ClickDots";

import {BiDotsHorizontalRounded} from "react-icons/bi";
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";

import { useCallback, useEffect, useState } from "react";
import axios  from "axios";

import {token,postid,header} from "../../atom";
import { useRecoilValue } from "recoil";

const PostContentSide=({post})=>{
    //토큰 헤더에 넣기
    
    useEffect(()=>{
        console.log("side",post);
    },[]);
    const headers = useRecoilValue(header);
    // const postId=post.postId;
    const [toggle,setToggle]=useState(false);
    const [loved,setLoved]=useState();

    // console.log(post,post.postId);

    
    

    //하트 누르면 변경
    const pushHeart=(e)=>{
        e.preventDefault();
        console.log(loved);
        if(loved===false){
            axios.post(`${process.env.REACT_APP_SERVER_URL}/postloves`,{postId: post.postId},{headers})
            .then(res=>{
                setLoved(true);
                //props.pushHeart(loved);
                console.log(post.postId,loved,"하트채우기");
            })
            .catch(err=>console.log(err))
        }
        // if(loved===true){
        //     axios.delete(`${process.env.REACT_APP_SERVER_URL}/postloves`,{"postId": postId},{headers})
        //     .then(res=>{
        //         setLoved(false);
        //         //props.pushHeart(loved);
        //         console.log(postId,loved,"하트비우기");
        //     })
        //     .catch()
        // }
        
        
    }

    return (
        <span className={styles.wrapper}>
            <BiDotsHorizontalRounded className={styles.icon} onClick={
                    (e)=>{
                        e.preventDefault();
                        setToggle(!toggle);
                }}>
            </BiDotsHorizontalRounded>
            {toggle&&<ClickDots post={post} onClickOutside={()=>{toggle(false)}}></ClickDots>}
            {/* 하트 */}
            <div onClick={pushHeart}>{loved===true ? (<AiFillHeart className={styles.iconFill} ></AiFillHeart>) : (<AiOutlineHeart className={styles.icon} ></AiOutlineHeart>)}</div>
            {/* {props.createTime && <div className={styles.createTime}>{props.createTime}</div>} */}
        </span>
    )
};
export default PostContentSide;
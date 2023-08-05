import { useState } from "react";
import PostUserHeader from "../../../components/PostUserHeader";
import classes from "./Detail.module.css";
import { useLocation } from "react-router-dom";

const Detail = () => {
    const {state} = useLocation();

    console.log(state)

    const [data, setData] = useState(
        {
            postId: 123456,
            writer: "딸내미",
            profileImg: "",
            content: "엄마아빠랑 간곳 !!",
            imgs: [
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjlfMTI0%2FMDAxNjYxNzYzMTE4MzQw.BDE2sMPhX7xYVad_eo6IL4EjuxUjojQgNHc70XWvbR8g.m9Z4ZYEmP6R2NZYUwTft9-nAuaR4-D6z9Clga7VthxUg.JPEG.poomgoango%2F%25C0%25BB%25BF%25D5%25B8%25AE.jpg&type=a340",
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDdfMTE3%2FMDAxNjU3MTc3MzE2Nzgz.leQda73NGeUkGP03s8fJBwhcpSRIJSLA7UoIuhTS5jsg.aMeYugUXQeirdpOOYbVHQhR3mtu9SMoWs8vz24pjaLAg.JPEG.love_wlgo%2F20190622%25A3%25DF144713.jpg&type=sc960_832",
            ],
            createdAt: "2023-03-25",
            loved: false,
        });

    return (
        <div className={classes.wrapper}>
            <hr className={classes.hr} />
            <div className={classes.dotWrapper}>
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
            </div>
            <div className={classes.content}>
                <PostUserHeader
                    userImg={data.profileImg}
                    username={data.writer}
                    postdate={data.createdAt}
                />
                
            </div>
        </div>
    );
};

export default Detail;
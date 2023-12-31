import React, { Children, useEffect, useReducer, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import classes from "./MyCalendar.module.css";
import "./Calendar.css";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/useAsync";
import { header } from "../../atom";
import { useRecoilState } from "recoil";

import holidayData from "./2023-2024-holiday.json"

const FECalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [mark, setMark] = useState([]);
    const [holiday, setHoliday] = useState([]);
    const [familyID, setFamilyID] = useState(localStorage.getItem("familyID"));
    const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const SERVER = process.env.REACT_APP_SERVER_URL;
    const [headers, setHeaders] = useRecoilState(header);

    const nav = useNavigate();

    // let dateLst = data?.result;
    const [dateLst, setDateLst] = useState();


    const getUsers = async () => {
        const response = await axios.get(
            `${SERVER}/posts/calendar?familyId=${familyID}&year=${year}&month=${month}`,
            { headers }
        );
        console.log(response.data.result);
        setDateLst(response.data.result);
        return response.data;
    };

    const [state, refetch] = useAsync(getUsers, []);

    const { loading, data, error } = state;


    useEffect(() => {
        if (Array.isArray(dateLst)) {
            setMark([...dateLst]);
        }
    }, [dateLst]);

    useEffect(() => {
        getUsers()
        // dateLst = data.result
        console.log(dateLst)
    }, [month])

    // useEffect(() => {
    //     d
    // }, [data?.result])

    const dateChangeHandler = (date) => {
        setSelectedDate(date);

        // mark가 없는, 즉 게시물이 해당 달에 아무것도 없는경우 mark안의 property가 undefined인데
        if (mark?.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            nav("./detail", { state: date });
        }
    };

    // navigationLabel에 보일 내용 format 하는 함수
    const formatLongDate = ({ date, label, locale, view }) => {
        const year = date.getFullYear();
        const m = date.getMonth();
        const month = m < 9 ? `0${m + 1}` : m + 1;
        return `${year}.${month}`;
    };

    // weekday 연결하는 함수
    const formatWeekDay = (locale, date) => {
        const dayIndex = date.getDay();
        return customWeekdays[dayIndex];
    };

    // 주말인지 확인하는 함수
    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0; // 0: 일요일
    };

    // 공휴일인지 확인하는 함수
    const isHoliday = (date) => {
        const holidayList = holidayData.all;
        
        // api 가져와서 연동해야함
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return holidayList.includes(formattedDate);
    };

    // 각 날짜에 대한 클래스 이름을 반환하는 함수
    const tileClassName = ({ date }) => {
        if (isHoliday(date) || isWeekend(date)) {
            return "redText";
        }
        return null;
    };

    // prev, next버튼 action시 년, 월 재설정해주는 함수
    const ymChangeHandler = ({ activeStartDate: date }) => {
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
    };

    // loading을 이렇게 처리하지말고 원형으로 빙글 돌아가는 거로 처리하기!!!!!!!!!!!!!!!!!
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    // if (!dateLst) return <div>No exist data...</div>;
    return (
        <div className={classes.wrapper}>
            <Calendar
                onChange={dateChangeHandler} // Callback function when date is selected
                value={selectedDate} // Selected date (controlled component)
                formatDay={(locale, date) => moment(date).format("DD")}
                className={classes.myCalendar}
                next2Label={null}
                prev2Label={null}
                onActiveStartDateChange={ymChangeHandler}
                showNeighboringMonth={null}
                navigationLabel={formatLongDate}
                formatShortWeekday={formatWeekDay}
                tileClassName={tileClassName}
                tileContent={({ date, view }) => {
                    // mark가 없을경우 옵셔널체이닝으로 에러 처리
                    if (
                        mark?.find(
                            (x) => x === moment(date).format("YYYY-MM-DD")
                        )
                    ) {
                        return (
                            <div className={classes.wrapper}>
                                <div className={classes.dot}></div>
                            </div>
                        );
                    }
                }}
            />
        </div>
    );
};

export default FECalendar;

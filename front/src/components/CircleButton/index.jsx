/** 원형 버튼 컴포넌트  
 * props {
 *  title : string
 *  type : string => 사용 가능한 값 "pink" or "purple"
 *  layout : css class => 사용하는 부분에서 레이아웃 배치한 css 연결
 *           (만약, props drilling이 일어나면 상태관리 하기)
 * }
*/

import { useState } from 'react';
import classes from "./CircleButton.module.css";

const CircleButton = (props) => {
    const [isActive, setActive] = useState(false);

    const handleOnActive = () => {
        setActive(true)
    }

    const handleOffActive = () => {
        setActive(false)
    }

    return (
        <div
            className={`${classes.circle}
                ${props.layout}
                ${props.type === "pink" ? classes.circle1 : ''}
                ${props.type === "purple" ? classes.circle2 : ''}
                ${isActive ? (props.type === "pink" ? classes.activeCircle1 : '') : ''}
                ${isActive ? (props.type === "purple" ? classes.activeCircle2 : '') : ''}
            `}
            // onClick={() => {
            //     alert("CircleButton Click");
            // }}
            onMouseEnter={handleOnActive} // 마우스가 올라갈 때 이벤트 핸들러 추가
            onMouseLeave={handleOffActive} 
            onTouchStart={handleOnActive}
            onTouchEnd={handleOffActive}
        >
            <p className={`
                ${props.type === "pink" ? classes.title1 : ''}
                ${props.type === "purple" ? classes.title2 : ''}
            `}>{props.title}</p>
        </div>
    );
};

export default CircleButton;

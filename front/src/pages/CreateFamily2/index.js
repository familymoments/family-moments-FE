import React from 'react';
import MyText from "../../components/MyText";
import MakeFamilyBar from "../../components/MakeFamilyBar";
import Button from "../../components/Button";
import FileUploadButton from "../../components/FileUpload";
import classes from "../CreateFamily/CreateFamily.module.css";
import FamilySelect from "../../components/FamilySelect";
import styles from "../../components/FamilySelect/SelectImage.module.css";

const CreateFamily2 = () => {
    return (
        <div className={classes.createFamily2}>
            <MyText text="우리 가족 생성하기" />
            <FamilySelect buttonText="가족 이름 정하기" customClass={styles.familySelect} />
            <MakeFamilyBar />
            <FamilySelect buttonText="가족 이미지 선택" customClass={styles.selectImage} />
            <FileUploadButton />
            <div className="imgUpload"></div> 
            <Button btn={classes.btn} title="다음 (2/3)"/>
        </div>
    );
}

export default CreateFamily2;

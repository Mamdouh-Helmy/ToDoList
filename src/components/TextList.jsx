import { useState, useEffect } from "react";
import { Deleate } from "../utils/icons.util";

function TextList({ texts, onCountChange, onUpdateTexts }) {
  const [doneList, setDoneList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedDoneList = JSON.parse(localStorage.getItem("doneList")) || Array(texts.length).fill(false);
    setDoneList(storedDoneList);
    onCountChange(storedDoneList.filter(Boolean).length);
  }, [texts.length, onCountChange]);

  const check = (index) => {
    const newDoneList = [...doneList];
    newDoneList[index] = !newDoneList[index];
    setDoneList(newDoneList);
    
    localStorage.setItem("doneList", JSON.stringify(newDoneList));

    if (newDoneList[index]) {
      setCount((prevCount) => prevCount + 1);
    } else {
      setCount((prevCount) => prevCount - 1);
    }
    onCountChange(newDoneList.filter(Boolean).length);
  };

  const handleDelete = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    localStorage.setItem("submittedTexts", JSON.stringify(newTexts));
    onUpdateTexts(newTexts);
    
    const newDoneList = new Array(newTexts.length).fill(false);
    localStorage.setItem("doneList", JSON.stringify(newDoneList));
    setDoneList(newDoneList);
    setCount(newDoneList.filter(Boolean).length);
  };

  return (
    <div className="text-input-value">
      {texts.map((item, index) => (
        <div
          key={index}
          className={`box ${doneList[index] && "active"}`}
          onClick={() => check(index)}
        >
          <div className="iteam">{item}</div>
          <div className="icon" onClick={(e) => {
            e.stopPropagation(); 
            handleDelete(index);
          }}>
            <Deleate />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TextList;

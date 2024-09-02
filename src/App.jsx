import { useState, useEffect } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import TextList from "./components/TextList";
import Logo from "./images/Logo.png";

function App() {
  const [submittedTexts, setSubmittedTexts] = useState([]);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const storedTexts = localStorage.getItem("submittedTexts");
    if (storedTexts) {
      setSubmittedTexts(JSON.parse(storedTexts));
    }
  }, []);

  useEffect(() => {
    if (submittedTexts.length > 0) {
      localStorage.setItem("submittedTexts", JSON.stringify(submittedTexts));
    }
  }, [submittedTexts]);

  const handleAddText = (text) => {
    setSubmittedTexts([...submittedTexts, text]);
  };

  const handleUpdateTexts = (newTexts) => {
    setSubmittedTexts(newTexts);
  };

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <div className="image">
          <img src={Logo} alt="" />
        </div>
        <div>
          <TextInput onAddText={handleAddText} />
          <div className="text-list">
            <div className="text-taskes">
              <div className="box">
                Tasks <div>{submittedTexts.length}</div>
              </div>
              <div className="box">
                Done <div>{doneCount} of {submittedTexts.length}</div>
              </div>
            </div>
            <TextList 
              texts={submittedTexts} 
              onCountChange={setDoneCount} 
              onUpdateTexts={handleUpdateTexts} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

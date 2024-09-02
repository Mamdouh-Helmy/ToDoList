import { useState } from "react";
import {Plus} from '../utils/icons.util'
function TextInput({ onAddText }) {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.trim() !== "") {
      onAddText(text);
      setText("");
    }
  };

  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="Write your note and press “Enter” ..."
        value={text}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>
        Add
        <div className="icon">
          <Plus/>
        </div>
      </button>
    </div>
  );
}

export default TextInput;

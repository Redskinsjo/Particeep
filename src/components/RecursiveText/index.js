import React, { useState, useEffect } from "react";

export default function RecursiveText() {
  const list1 = [
    "M",
    "O",
    "N",
    " ",
    "R",
    "E",
    "N",
    "D",
    "U",
    " ",
    "D",
    "E",
    " ",
    "T",
    "E",
    "S",
    "T",
    ".",
  ];
  const list2 = [
    "F",
    "A",
    "I",
    "T",
    " ",
    "E",
    "N",
    " ",
    "R",
    "E",
    "A",
    "C",
    "T",
    ".",
  ];
  const list3 = [
    "E",
    "N",
    "C",
    "O",
    "R",
    "E",
    " ",
    "A",
    "M",
    "E",
    "L",
    "I",
    "O",
    "R",
    "A",
    "B",
    "L",
    "E",
    ".",
  ];
  const [text, setText] = useState("");
  const [lists, setLists] = useState([list1, list2, list3]);
  const [textObject, setTextObject] = useState({
    list: 1,
    index: 0,
  });

  // Add letter to the string text to be displayed
  const changeText = ({ list, index }) => {
    if (list === 1) {
      newText += list1.join("").substring(0, index);
    }
    if (list === 2) {
      newText += list2.join("").substring(0, index);
    }
    if (list === 3) {
      newText += list3.join("").substring(0, index);
    }
  };
  let newText = " ";

  useEffect(() => {
    changeText(textObject);
    const timer = setTimeout(() => {
      setText(newText);
    }, 180);
  });

  useEffect(() => {
    // Pass to the next list when passed through the previous
    if (textObject.index >= lists[textObject.list - 1].length) {
      const copyState = { ...textObject };
      if (copyState.list === lists.length) {
        copyState.list = 1;
      } else {
        copyState.list = copyState.list + 1;
      }
      copyState.index = 0;
      const timer = setTimeout(() => {
        setTextObject(copyState);
      }, 1500);
    } else {
      // Pass to the next letter within one list
      const copyState = { ...textObject };
      copyState.index = copyState.index + 1;
      setTextObject(copyState);
    }
  }, [text]);

  return (
    <div>
      <span style={{ color: "white", fontSize: 14 }}>CE SITE EST</span>
      <span style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
        {text}
      </span>
    </div>
  );
}

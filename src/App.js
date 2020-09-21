import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);

  const highlightTag = (id) => {
    setTags(
      tags.map((tag, idx) => {
        if (idx === id) {
          tag.active = true;
        } else {
          tag.active = false;
        }
        return tag;
      })
    );
  };

  const unHighlightTag = (id) => {
    setTags(
      tags.map((tag, idx) => {
        if (idx === id) {
          tag.active = false;
        }
        return tag;
      })
    );
  };

  const pickRandomTag = () => {
    return Math.floor(Math.random() * tags.length);
  };

  const randomSelect = () => {
    const times = 30;

    const interval = setInterval(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);

      // remove the highlight after a while
      setTimeout(() => {
        unHighlightTag(randomTag);
      }, 100);
    }, 100);

    // allow times * 100 ms for the tags to randomly "highlight" themselves
    // then pick another tag
    setTimeout(() => {
      clearInterval(interval);

      setTimeout(() => {
        const randomTag = pickRandomTag();

        highlightTag(randomTag);
      }, 100);
      console.log("called");
    }, times * 100);
  };

  const createTags = (input) => {
    const tags = input
      .split(",")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => ({ active: false, tagEl: tag.trim() }));

    setTags(tags);
  };

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const keyHandler = (e) => {
    e.persist();
    // create a tag for all the inputs separated by a comma
    createTags(text);
    // check if the enter key is pressed
    if (e.key === "Enter") {
      // empty textarea
      console.log({ e });
      setText("");
      // start randomizer
      randomSelect();
    }
  };

  return (
    <div className="container">
      <h3>
        Enter all of the choices seperated by comma (','). <br />
        Please enter when you're done.
      </h3>
      <textarea
        onKeyUp={keyHandler}
        onChange={changeHandler}
        value={text}
        placeholder="Enter choices here..."
      ></textarea>
      <div>
        {tags.map((tag, idx) => (
          <span
            className={tag.active === true ? "tag highlight" : "tag"}
            key={idx}
          >
            {tag.tagEl}
          </span>
        ))}
      </div>
    </div>
  );
}

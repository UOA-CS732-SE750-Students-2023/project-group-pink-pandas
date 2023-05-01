import React from "react";
import { SharedStringHelper } from "@fluid-experimental/react-inputs";
import { TextareaAutosize } from "@mui/material";

export const CollaborativeTextArea = (props) => {
  // TODO 1: Setup React state and references.
  const sharedStringHelper = props.sharedStringHelper;

  const textareaRef = React.useRef(null);
  const selectionStartRef = React.useRef(0);
  const selectionEndRef = React.useRef(0);

  const [text, setText] = React.useState(sharedStringHelper.getText());
  // TODO 2: Handle a change event in the textarea.
  const handleChange = (ev) => {
    // First get and stash the new textarea state
    if (!textareaRef.current) {
      throw new Error("Handling change without current textarea ref?");
    }
    const textareaElement = textareaRef.current;
    const newText = textareaElement.value;
    // After a change to the textarea content we assume the selection is gone (just a caret)
    const newCaretPosition = textareaElement.selectionStart;

    // Next get and stash the old React state
    const oldText = text;
    const oldSelectionStart = selectionStartRef.current;
    const oldSelectionEnd = selectionEndRef.current;

    // Next update the React state with the values from the textarea
    storeSelectionInReact();
    setText(newText);

    // Finally update the SharedString with the values after deducing what type of change it was.
    const isTextInserted = newCaretPosition - oldSelectionStart > 0;
    if (isTextInserted) {
      const insertedText = newText.substring(oldSelectionStart, newCaretPosition);
      const isTextReplaced = oldSelectionEnd - oldSelectionStart > 0;
      if (!isTextReplaced) {
        sharedStringHelper.insertText(insertedText, oldSelectionStart);
      } else {
        sharedStringHelper.replaceText(insertedText, oldSelectionStart, oldSelectionEnd);
      }
    } else {
      // Text was removed
      const charactersDeleted = oldText.length - newText.length;
      sharedStringHelper.removeText(newCaretPosition, newCaretPosition + charactersDeleted);
    }
  };
  // TODO 3: Set the selection in textarea element (update the UI).
  const setTextareaSelection = (newStart, newEnd) => {
    if (!textareaRef.current) {
      throw new Error("Trying to set selection without current textarea ref?");
    }
    const textareaElement = textareaRef.current;

    textareaElement.selectionStart = newStart;
    textareaElement.selectionEnd = newEnd;
  };
  // TODO 4: Store current selection from the textarea element in the React ref.
  const storeSelectionInReact = () => {
    if (!textareaRef.current) {
      throw new Error("Trying to remember selection without current textarea ref?");
    }
    const textareaElement = textareaRef.current;

    const textareaSelectionStart = textareaElement.selectionStart;
    const textareaSelectionEnd = textareaElement.selectionEnd;
    selectionStartRef.current = textareaSelectionStart;
    selectionEndRef.current = textareaSelectionEnd;
  };
  // TODO 5: Detect changes in sharedStringHelper and update React/UI as necessary.
  React.useEffect(() => {
    const handleTextChanged = (event) => {
      const newText = sharedStringHelper.getText();
      setText(newText);
      if (!event.isLocal) {
        const newSelectionStart = event.transformPosition(selectionStartRef.current);
        const newSelectionEnd = event.transformPosition(selectionEndRef.current);
        setTextareaSelection(newSelectionStart, newSelectionEnd);
        storeSelectionInReact();
      }
    };

    sharedStringHelper.on("textChanged", handleTextChanged);
    return () => {
      sharedStringHelper.off("textChanged", handleTextChanged);
    };
  }, [sharedStringHelper]);
  // TODO 6: Create and configure a textarea element that will be used in App.tsx.
  return (
    <TextareaAutosize 
      ref={textareaRef}
      onBeforeInput={storeSelectionInReact}
      onKeyDown={storeSelectionInReact}
      onClick={storeSelectionInReact}
      onContextMenu={storeSelectionInReact}
      onChange={handleChange}
      value={text} />
      
  );
}
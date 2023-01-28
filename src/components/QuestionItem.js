import React from "react";
import QuestionList from './QuestionList';

function QuestionItem({ question, handleSelectChange, handleDelete}) {
  const { id, prompt, answers, correctIndex } = question;

  
    
  

  return (
    <li>
      {question.text}
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={question.correctIndex} onChange={e =>
        handleSelectChange(question.id, e.target.value)}>
          {answers.map((answer, index) => (
                <option key={index} value={index}>{answers}</option>
            ))} {answers}</select>
      </label>
      <button onClick={()=>
      handleDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

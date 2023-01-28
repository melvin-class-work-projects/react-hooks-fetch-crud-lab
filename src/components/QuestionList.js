import React from "react";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionList from './QuestionList';

function QuestionList({ handleSelectChange, handleDelete}) {

  const [ questions, setQuestions ] = useState([]);
  useEffect(() => {
    //fetch data
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data=>setQuestions(data));
},[]);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        
        

        
        {questions.map((question, index) => (
          <QuestionItem key={index} question={question}  handleSelectChange={handleSelectChange}handleDelete={handleDelete} />
        ))}
      </ul>

        
    </section>
  );
}

export default QuestionList;

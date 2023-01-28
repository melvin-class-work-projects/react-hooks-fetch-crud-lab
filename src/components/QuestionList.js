import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
      });
  };

  const handleAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      });
  };

  const questionItems = questions.map((q) => (
    <QuestionItem key={q.id} question={q} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange} />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
};

export default QuestionList;
import React from "react";
import  { useState, useEffect } from "react";
import axios from "axios";
import QuestionList from './QuestionList';
function AdminNavBar({ onChangePage }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:4000/questions")
    .then(res => setQuestions(res.data))
    .catch(err => console.log(err));
    }, []);
    
    const handleDelete = id => {
    axios
    .delete("http://localhost:4000/questions/"+{id})
    .then(res => {
    setQuestions(questions.filter(question => question.id !== id));
    })
    .catch(err => console.log(err));

    const handleSelectChange = (id, value) => {
      axios
          .patch(`http://localhost:4000/questions/${id}`, {
              correctIndex: value
          }, {headers: { "Content-Type": "application/json" }})
          .then(res => {
              //update the state with the new question data
              const updatedQuestions = questions.map(question => {
                  if (question.id === id) {
                      return res.data;
                  } else {
                      return question;
                  }
              });
              setQuestions(updatedQuestions);
          })
          .catch(err => console.log(err));
  }
  

    };

  return (
    <>
    <nav>
      <button onClick={() => onChangePage("Form")}>New Question</button>
      <button onClick={() => onChangePage("List")}>View Questions</button>
    </nav>
    {onChangePage === "List" && (
<ul>
{questions.map(question => (
<li key={question.id}>
{question.text}
<button onClick={() => handleDelete(question.id)}>Delete</button>
</li>
))}
</ul>
)}
</>
    
  );
}

export default AdminNavBar;

import React, { useState, useEffect } from "react";
import "./Educationplanner.css";

const EducationPlanner = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [studyHours, setStudyHours] = useState(0);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (subjectName && studyHours >= 0) {
      setSubjects([...subjects, { name: subjectName, hours: studyHours }]);
      setSubjectName("");
      setStudyHours(0);
    }
  };

  const adjustHours = (index, amount) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += amount;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="education-planner">
      <h1>Geekster Education Planner</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Study hours"
          value={studyHours}
          onChange={(e) => setStudyHours(parseInt(e.target.value))}
        />
        <button onClick={addSubject}>Add</button>
      </div>

      <ul className="subject-list">
        {subjects.map((subject, index) => (
          <li key={index} className="subject-item">
            <div className="subject-details">
              <span className="subject-name">{subject.name}</span>
              <span className="study-hours">{subject.hours} hours</span>
            </div>
            <div className="adjust-buttons">
              <button onClick={() => adjustHours(index, 1)}>+</button>
              <button onClick={() => adjustHours(index, -1)}>-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationPlanner;

import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((result) => {
      console.log(result);
      setCourses(result);
    });
  }, []);

  return (
    <>
      <h2>Available Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursePage;

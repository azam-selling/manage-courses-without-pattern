import React, { useState, useEffect } from "react";
//import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    title: "",
    slug: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseApi.getCourseBySlug(slug).then((result) => setCourse(result));
    }
  }, [props.match.params.slug]);

  function isFormValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author Id is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    courseApi.saveCourse(course);
    props.history.push("/courses");
    toast.success("Course saved.");
  }
  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt
        when={true}
        message="Do you want to leave without save changes?"
      ></Prompt> */}
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageCoursePage;

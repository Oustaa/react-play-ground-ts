import { ErrorMessage, useFormik } from "formik";
import React from "react";

const BadForm = () => {
  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={formik.getFieldProps("name").value}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
          {/* <ErrorMessage name="name" /> */}
        </div>
      </form>
    </div>
  );
};

export default BadForm;


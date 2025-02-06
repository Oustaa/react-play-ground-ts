import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const BadForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        <Form>
          <Field name="name" />
          <ErrorMessage name="name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BadForm;


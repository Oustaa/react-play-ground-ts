import { ChangeEvent, FormEvent, useState } from "react";

const BadForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
  });

  const ChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="fname">first Name:</label>
          <input type="text" name="fname" id="fname" onChange={ChangeValue} />
        </div>
        <div>
          <label htmlFor="lname">Last name:</label>
          <input type="text" name="lname" id="lname" onChange={ChangeValue} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BadForm;


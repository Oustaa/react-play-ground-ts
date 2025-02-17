// const GoodForm = () => {
//   const submitHandler = (formData) => {
//     console.log({ fname: formData.get("fname"), lname: formData.get("lname") });
//   };

//   return (
//     <div>
//       <form action={submitHandler}>
//         <div>
//           <label htmlFor="fname">first Name:</label>
//           <input type="text" name="fname" id="fname" />
//         </div>
//         <div>
//           <label htmlFor="lname">Last name:</label>
//           <input type="text" name="lname" id="lname" />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default GoodForm;

import React from "react";

const GoodForm: React.FC = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page reload

    const formData = new FormData(event.currentTarget);
    console.log({
      fname: formData.get("fname"),
      lname: formData.get("lname"),
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input type="text" name="fname" id="fname" required />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input type="text" name="lname" id="lname" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GoodForm;


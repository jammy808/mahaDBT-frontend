import React, { useState , useEffect } from "react";
import axios from "axios";

const Form = ({ studentId }) => {

  const [formData, setFormData] = useState({
    id: "#id",
    firstName: "",
    lastName: "",
    birthDate: "",
    mobileNo: "",
    address: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation logic
    if (name === "mobileNo" && (value.length !== 10 || isNaN(value))) {
      setErrors({ ...errors, mobileNo: "Mobile number must be 10 digits" });
    } else {
      setErrors({ ...errors, mobileNo: "" });
    }

    // Enable submit button only if all fields are filled and there are no errors
    const allFieldsFilled = Object.values(formData).every((field) => field !== "");
    const noErrors = Object.values(errors).every((error) => error === "");

    setIsSubmitDisabled(!(allFieldsFilled && noErrors));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = await axios.get('http://localhost:8080/profile', {
        withCredentials: true,
      });
      const userId = id.data.user._id;
      const updatedFormData = { ...formData, id: userId };
      setFormData(updatedFormData);
      //console.log(formData.id)

      const response = await axios.post('http://localhost:8080/update', updatedFormData ,{
        withCredentials: true,
      });
      alert(response.data.message);
    } catch (error) {
      alert("An error occurred: " + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
      <input type="date" name="birthDate" onChange={handleChange} value={formData.birthDate} />
      <input type="text" name="mobileNo" placeholder="Mobile Number" onChange={handleChange} value={formData.mobileNo} />
      {errors.mobileNo && <span style={{ color: "red" }}>{errors.mobileNo}</span>}
      <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
      <button type="submit" disabled={isSubmitDisabled} >Update Information</button>
    </form>
  );
};

export default Form;

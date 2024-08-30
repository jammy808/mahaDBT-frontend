import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  Grid,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";

function Form() {
  const [form, setForm] = useState({
    _id: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    guardianMobileNo: "",
    birthDate: "",
    address: "",
    gender: "",
    age: "",
    isIncomeCertificateAvailable: true,
    annualIncome: "",
    issuedDate: "",
    totalMarks: "",
    percentage: "",
    college: "",
    course: "",
    bankAccountNo: "",
    incomeCertificate: null,
    marksheet: null,
    userImage: null,
  });

  const [error, setError] = useState(null);

  const [previews, setPreviews] = useState({
    incomeCertificate: null,
    marksheet: null,
    userImage: null,
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      setForm(response.data.user);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    // Update the form state
    setForm((prevForm) => ({
      ...prevForm,
      [name]: file,
    }));

    // Create a preview URL for the file
    setPreviews((prevPreviews) => ({
      ...prevPreviews,
      [name]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    try {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post('http://localhost:8000/updateStudentProfile', formData ,{
        withCredentials: true,
      });
      alert(response.data.message);
    } catch (error) {
      alert("An error occurred: " + error.response.data.error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <Box>
        <Box component={"div"} className="experiences" sx={{ marginY: 1.5 }} style={{ marginLeft: "3em" }}>

          <Typography variant="h5" component={"h5"}>
            Student's Details
          </Typography>

          <Grid item xs={12} sm={6}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload User Image
              <input
                type="file"
                name="userImage"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {/* Show Preview if file exists */}
            {previews.userImage && (
              <img
                src={previews.userImage}
                alt="User Image Preview"
                style={{ marginTop: "10px", maxHeight: "100px" }}
              />
            )}
          </Grid>

          <Grid container spacing={2} sx={{ marginY: 0.05 }}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.firstName}
                autoComplete="off"
                name="firstName"
                type="string"
                onChange={handleChange}
                label="First Name"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Middle Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.middleName}
                autoComplete="off"
                name="middleName"
                type="string"
                onChange={handleChange}
                label="Middle Name"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.lastName}
                autoComplete="off"
                name="lastName"
                type="string"
                onChange={handleChange}
                label="Last Name"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Mobile No */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.mobileNo}
                autoComplete="off"
                name="mobileNo"
                type="string"
                onChange={handleChange}
                label="Mobile No"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Guardian Mobile No */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={form.guardianMobileNo}
                autoComplete="off"
                name="guardianMobileNo"
                type="string"
                onChange={handleChange}
                label="Guardian Mobile No"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Birth Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.birthDate}
                autoComplete="off"
                name="birthDate"
                type="date"
                onChange={handleChange}
                label="Birth Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={form.address}
                autoComplete="off"
                name="address"
                type="string"
                onChange={handleChange}
                label="Address"
                multiline
                rows={2}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.gender}
                autoComplete="off"
                name="gender"
                type="string"
                onChange={handleChange}
                label="Gender"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.age}
                autoComplete="off"
                name="age"
                type="number"
                onChange={handleChange}
                label="Age"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Income Certificate
                <input
                  type="file"
                  name="incomeCertificate"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              {/* Show Preview if file exists */}
              {previews.incomeCertificate && (
                <img
                  src={previews.incomeCertificate}
                  alt="Income Certificate Preview"
                  style={{ marginTop: "10px", maxHeight: "100px" }}
                />
              )}
            </Grid>

            {/* Income Certificate Available */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isIncomeCertificateAvailable}
                    onChange={handleChange}
                    name="isIncomeCertificateAvailable"
                    color="primary"
                  />
                }
                label="Income Certificate Available"
              />
            </Grid>

            {/* Annual Income */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.annualIncome}
                autoComplete="off"
                name="annualIncome"
                type="string"
                onChange={handleChange}
                label="Annual Income"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Issued Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.issuedDate}
                autoComplete="off"
                name="issuedDate"
                type="date"
                onChange={handleChange}
                label="Issued Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Marksheet
                <input
                  type="file"
                  name="marksheet"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              {/* Show Preview if file exists */}
              {previews.marksheet && (
                <img
                  src={previews.marksheet}
                  alt="Marksheet Preview"
                  style={{ marginTop: "10px", maxHeight: "100px" }}
                />
              )}
            </Grid>

            {/* Total Marks */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.totalMarks}
                autoComplete="off"
                name="totalMarks"
                type="number"
                onChange={handleChange}
                label="Total Marks"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Percentage */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.percentage}
                autoComplete="off"
                name="percentage"
                type="string"
                onChange={handleChange}
                label="Percentage"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* College */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.college}
                autoComplete="off"
                name="college"
                type="string"
                onChange={handleChange}
                label="College"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Course */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.course}
                autoComplete="off"
                name="course"
                type="string"
                onChange={handleChange}
                label="Course"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>

            {/* Bank Account No */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={form.bankAccountNo}
                autoComplete="off"
                name="bankAccountNo"
                type="string"
                onChange={handleChange}
                label="Bank Account No"
                InputProps={{
                  sx: {
                    height: "2.4em",
                  },
                }}
              />
            </Grid>
          </Grid>
          <br />

          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Form;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  const [error, setError] = useState(null);
  const [previews, setPreviews] = useState({
    incomeCertificate: null,
    marksheet: null,
    userImage: null,
  });


  // Define Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    middleName: Yup.string().required('Middle name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    guardianMobileNo: Yup.string().matches(/^[0-9]{10}$/, 'Guardian mobile number must be exactly 10 digits'),
    birthDate: Yup.date().required('Birth date is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    annualIncome: Yup.string().required('Annual income is required'),
    issuedDate: Yup.date().required('Issued date is required'),
    totalMarks: Yup.number().required('Total marks are required'),
    percentage: Yup.number().required('Percentage is required').min(0, 'Percentage cannot be negative').max(100, 'Percentage cannot exceed 100'),
    college: Yup.string().required('College is required'),
    course: Yup.string().required('Course is required'),
    bankAccountNo: Yup.string().required('Bank account number is required'),
  });

  const formik = useFormik({
    initialValues: {
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
      isIncomeCertificateAvailable: false,
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
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      try {
        const response = await axios.post('http://localhost:8000/updateStudentProfile', formData, {
          withCredentials: true,
        });
        alert(response.data.message);
      } catch (error) {
        alert("An error occurred: " + error.response.data.error);
      }
    },
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });

      formik.setValues(response.data.user);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };


  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    // Update the form state with Formik
    formik.setFieldValue(name, file);

    // Create a preview URL for the file
    setPreviews((prevPreviews) => ({
      ...prevPreviews,
      [name]: URL.createObjectURL(file),
    }));
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

          <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.firstName}
                  autoComplete="off"
                  name="firstName"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="First Name"
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
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
                  value={formik.values.middleName}
                  autoComplete="off"
                  name="middleName"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Middle Name"
                  error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                  helperText={formik.touched.middleName && formik.errors.middleName}
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
                  value={formik.values.lastName}
                  autoComplete="off"
                  name="lastName"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Last Name"
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
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
                  value={formik.values.mobileNo}
                  autoComplete="off"
                  name="mobileNo"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Mobile No"
                  error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                  helperText={formik.touched.mobileNo && formik.errors.mobileNo}
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
                  value={formik.values.guardianMobileNo}
                  autoComplete="off"
                  name="guardianMobileNo"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Guardian Mobile No"
                  error={formik.touched.guardianMobileNo && Boolean(formik.errors.guardianMobileNo)}
                  helperText={formik.touched.guardianMobileNo && formik.errors.guardianMobileNo}
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
                  value={formik.values.birthDate}
                  autoComplete="off"
                  name="birthDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Birth Date"
                  error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                  helperText={formik.touched.birthDate && formik.errors.birthDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.address}
                  autoComplete="off"
                  name="address"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Address"
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  multiline
                  rows={2}
                  
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.gender}
                  autoComplete="off"
                  name="gender"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Gender"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
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
                  value={formik.values.age}
                  autoComplete="off"
                  name="age"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Age"
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>

              {/* Income Certificate Available */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isIncomeCertificateAvailable}
                      onChange={(e) => {
                        formik.setFieldValue("isIncomeCertificateAvailable", e.target.checked);
                      }}
                      name="isIncomeCertificateAvailable"
                      color="primary"
                    />
                  }
                  label="Income Certificate Available"
                />
              </Grid>



              <Grid item xs={12}>
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

              {/* Annual Income */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.annualIncome}
                  autoComplete="off"
                  name="annualIncome"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Annual Income"
                  error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)}
                  helperText={formik.touched.annualIncome && formik.errors.annualIncome}
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
                  value={formik.values.issuedDate}
                  autoComplete="off"
                  name="issuedDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Issued Date"
                  error={formik.touched.issuedDate && Boolean(formik.errors.issuedDate)}
                  helperText={formik.touched.issuedDate && formik.errors.issuedDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
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
                  value={formik.values.totalMarks}
                  autoComplete="off"
                  name="totalMarks"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Total Marks"
                  error={formik.touched.totalMarks && Boolean(formik.errors.totalMarks)}
                  helperText={formik.touched.totalMarks && formik.errors.totalMarks}
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
                  value={formik.values.percentage}
                  autoComplete="off"
                  name="percentage"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Percentage"
                  error={formik.touched.percentage && Boolean(formik.errors.percentage)}
                  helperText={formik.touched.percentage && formik.errors.percentage}
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
                  value={formik.values.college}
                  autoComplete="off"
                  name="college"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="College"
                  error={formik.touched.college && Boolean(formik.errors.college)}
                  helperText={formik.touched.college && formik.errors.college}
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
                  value={formik.values.course}
                  autoComplete="off"
                  name="course"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Course"
                  error={formik.touched.course && Boolean(formik.errors.course)}
                  helperText={formik.touched.course && formik.errors.course}
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
                  value={formik.values.bankAccountNo}
                  autoComplete="off"
                  name="bankAccountNo"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Bank Account No"
                  error={formik.touched.bankAccountNo && Boolean(formik.errors.bankAccountNo)}
                  helperText={formik.touched.bankAccountNo && formik.errors.bankAccountNo}
                  InputProps={{
                    sx: {
                      height: "2.4em",
                    },
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginY: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Form;

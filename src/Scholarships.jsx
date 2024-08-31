import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

function Scholarships() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to fetch the user profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    }
  };

  // Function to handle the "Apply" button click
  const handleApplyClick = () => {
    setOpen(true); // Open the confirmation dialog
  };

  // Function to handle the "Yes" button in the dialog
  const handleConfirmApply = async () => {
    setOpen(false); // Close the dialog
    if (user && user._id) {
      try {
        const response = await axios.get(`http://localhost:8000/applyForScholarship/${user._id}`, {
          withCredentials: true,
        });
        console.log(response.data.message);
      } catch (err) {
        console.log(err.response ? err.response.data.message : 'Failed to apply');
      }
    }
  };

  // Function to handle the "No" button in the dialog
  const handleCancelApply = () => {
    setOpen(false); // Close the dialog
    navigate('/profile/dash'); // Navigate to /profile/dash
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div className='my-4' style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center',
      }}>
        <h1 className='font-bold '>Scholarship</h1>
      </div>

      <div className='bg-blue-200 rounded-md' style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-between',
        padding: "15px",
        paddingRight: '3.5em',
        paddingLeft: '2.5em',
        alignItems: 'center',
      }}>
        <h4 className='font-medium'>Prime Minister's Special Scholarship Scheme (PMSSS)</h4>

        {user ? (
          !user.scholarshipId || user.scholarshipId === '' ? (
            <Button
              onClick={handleApplyClick} // Show dialog on apply click
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginY: 2 }}
            >
              Apply
            </Button>
          ) : (
            <h5 className='font-semibold text-green-500'>Applied</h5>
          )
        ) : (
          <h5 className='font-semibold text-yellow-500'>Loading...</h5>
        )}
      </div>

      {/* Dialog for confirmation */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Application"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you and your documents upto date with the latest guidelines ?

            By Clicking yes you agree to all the guidelines will be punished accordingly in a case of forgery.
            <a href='https://www.aicte-india.org/sites/default/files/pmsss2020/2022-23/Methodology%2022-23.pdf' target='_blank'>Guidelines</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelApply} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmApply} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default Scholarships;

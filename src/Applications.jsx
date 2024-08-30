import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function Applications() {
  const [scholarship, setScholarship] = useState(null);
  const [progress, setProgress] = useState(0); 

  const steps = [
    'Applied For Scholarship',
    'Application Under Verification',
    'Scholarship Approved',
  ];

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/scholarship', {
        withCredentials: true,
      });
      setScholarship(response.data.scholarship);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch scholarship');
    }
  };

  // Fetch the profile once the component is mounted
  useEffect(() => {
    fetchProfile();
  }, []);

  // Update the progress based on scholarship status
  useEffect(() => {
    if (scholarship) {
      if (scholarship.status === 'pending') {
        setProgress(1);
      }
      else if (scholarship.status === 'verified') {
        setProgress(2);
      }
      else if (scholarship.status === 'approved') {
        setProgress(3);
      }
      else if (scholarship.status === 'rejected') {
        setProgress(-1);
      }
    }
  }, [scholarship]); // Dependency on scholarship to trigger this effect

  return(
    <>

    <div className='mt-2' style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center',
        marginBottom:'4em',
      }}>
        <h1 className='font-bold '>Application Status</h1>
    </div>

    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={progress} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel 
              StepIconProps={{
                sx: {
                  fontSize: '2rem', // Adjust this value to make the icons larger
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>

    <div  style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center',
        marginTop:'2em',
      }}>
        {progress === -1 && (
        <h5 className='font-semibold text-red-500'>Rejected</h5>
      )}
    </div>

    <div  style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center',
        marginTop:'2em',
      }}>
        <h4 className='font-semibold'>Prime Minister's Special Scholarship Scheme (PMSSS)</h4>
    </div>
    </>
  );
}

export default Applications;

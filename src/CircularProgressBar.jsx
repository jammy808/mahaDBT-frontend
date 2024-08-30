import React, { useState, useEffect } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import axios from 'axios';

const StudentProfileProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const percentage = await calculateFilledPercentage();
      setProgress(percentage);
    };

    fetchData();
  }, []);

  const calculateFilledPercentage = async () => {
    let student = null;

    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      student = response.data.user;
      console.log(student.username);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    }

    if (!student) {
      return 0; // Return 0 if no student data is available
    }

    const totalFields = 22;  // Total number of essential fields
  
    // Count filled fields
    let filledFields = 0;
  
    // Check if the essential fields are filled
    if (student.username) filledFields++;
    if (student.password) filledFields++;
    if (student.email) filledFields++;
  
    // Check personalDetails
    const personalDetailsFields = [
      student.personalDetails?.firstName,
      student.personalDetails?.middleName,
      student.personalDetails?.lastName,
      student.personalDetails?.mobileNo,
      student.personalDetails?.guardianMobileNo,
      student.personalDetails?.birthDate,
      student.personalDetails?.userImage,
      student.personalDetails?.address,
      student.personalDetails?.gender,
      student.personalDetails?.age
    ];
    filledFields += personalDetailsFields.filter(field => field).length;
  
    // Check incomeDetails
    const incomeDetailsFields = [
      student.incomeDetails?.isIncomeCertificateAvailable,
      student.incomeDetails?.annualIncome,
      student.incomeDetails?.incomeCertificate,
      student.incomeDetails?.incomeCertificateNo,
      student.incomeDetails?.issuedDate
    ];
    filledFields += incomeDetailsFields.filter(field => field).length;
  
    // Check educationDetails
    const educationDetailsFields = [
      student.educationDetails?.marksheet,
      student.educationDetails?.totalMarks,
      student.educationDetails?.percentage,
      student.educationDetails?.college,
      student.educationDetails?.course
    ];
    filledFields += educationDetailsFields.filter(field => field).length;
  
    // Check bankAccountNo
    if (student.bankAccountNo) filledFields++;
  
    // Calculate percentage
    return (filledFields / totalFields) * 100;
  };

  return (
    <div style={{ width: '204px', height: '240px', overflow: 'hidden' }}>
      <Flat
        progress={progress}
        text={'Profile'}
        showMiniCircle={false}
        sx={{
          strokeColor: '#37ff00',
          barWidth: 10,
          valueSize: 21,
          valueWeight: 'lighter',
          valueColor: '#ffffff',
          textSize: 11,
          textWeight: 'lighter',
          textColor: '#ffffff',
          miniCircleColor: '#f4fea9'
        }}
      />
    </div>
  );
};

export default StudentProfileProgress;

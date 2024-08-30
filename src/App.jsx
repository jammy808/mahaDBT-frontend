import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register'
import Dashboard from "./Dashboard";
import Form from './Form';

import Layout from './Layout'
import ProfileDash from './ProfileDash';
import Scholarships from './Scholarships';
import Applications from './Applications';

// import "./Assets/scss/hope-ui.scss"
// import "./Assets/scss/custom.scss"
// import "./Assets/scss/dark.scss"
// import "./Assets/scss/rtl.scss"
// import "./Assets/scss/customizer.scss"

function App() {
  return (

    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/form" element={<Form />} />

        <Route path="/profile" element={<Layout />}>
          <Route path="dash" element={<ProfileDash />} />
          <Route path="apply" element={<Scholarships />} />
          <Route path="status" element={<Applications />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

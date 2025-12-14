import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Dashboard from './Dashboard/index'

function App() {

  return (
    <>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </>
  )
}

export default App

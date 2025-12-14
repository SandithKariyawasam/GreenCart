import React from 'react'
import './dashboard.css'

import Data from './components/data'
import Rowone from './components/rowone'
import Rowtwo from './components/rowtwo'
import Rowthree from './components/rowthree'

const Dashboard = () => {



  return (
    <>
      <div className="dashboard-container">

        <div className="dashboard-data">
          <Data />
        </div>

        <div className="dashboard-rowone">
          <Rowone />
        </div>

        <div className="dashboard-rowtwo">
          <Rowtwo />
        </div>

        <div className="dashboard-rowthree">
          <Rowthree />
        </div>

      </div>
    </>
  )
}

export default Dashboard

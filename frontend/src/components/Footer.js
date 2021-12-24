import React from 'react'

const Footer = () => {
  return (
    <footer style={{backgroundColor:'red'}} >

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2021. All rights reserved. DoSon Sneaker
        </div>
        {/* Copyright */}
        {/* Right */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-github" />
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-github" />
          </a>
        </div>
        {/* Right */}
      </div>

    </footer>
  )
}

export default Footer

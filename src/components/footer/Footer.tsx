import React from 'react'
import '../footer/footer.scss'
import { Link } from 'react-router-dom'

export default function footer() {
  return (
    <div className='footer-main'>
      <p className='mb-0'>Copyright © 2024 B4chain | All Rights Reserved.</p>
      <div>
        <ul className='d-flex mb-0'>
          <li>Terms and conditions</li>
          <li>Privacy policy</li>
        </ul>
      </div>
    </div>
  )
}

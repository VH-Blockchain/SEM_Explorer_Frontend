import React from 'react'
import '../footer/footer.scss'
import { Link } from 'react-router-dom'

export default function footer() {
  return (
    <div className='footer-main'>
      <p className='mb-0'>Copyright © 2024 SEMchain | All Rights Reserved.</p>
      <div>
        <ul className='d-flex mb-0'>
          <li>Terms and conditions</li>
          <li><Link to={"privacy-policy"}>Privacy policy</Link></li>
        </ul>
      </div>
    </div>
  )
}

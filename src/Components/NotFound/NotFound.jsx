import React from 'react'
import styles from './NotFound.module.css'
import error from '../../Assets/Images/error.svg'
export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src={error} alt="" className="img-center" />
    </div>
  )
}
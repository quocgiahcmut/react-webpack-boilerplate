import React from 'react'
import styles from './App.module.scss'

function App() {
  console.log(styles)
  return (
    <>
      <h1 className={styles.title}>React + Webpack</h1>
    </>
  )
}

export default App
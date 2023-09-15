import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total sum={total} />
    </div>
  )
}

export default Course
import React, { useState } from 'react'
import { createActivity } from '../../api/activity'

const ActivityCreate = ({ msgAlert, user }) => {
  const [ activity, setActivity ] = useState({
    name: '',
    activity: '',
    description: '',
    note: ''
  })

  const handleSubmit = event => {
    event.preventDefault()
    createActivity(activity, user.token)
      .then(msgAlert({
        heading: 'Activity Created',
        message: 'You have successfully created a new log',
        variant: 'success'
      }))
      .catch(err => {
        msgAlert({
          heading: 'Activity Create Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }
  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setActivity(prevActivity => {
      const updatedActivity = { ...prevActivity, ...updatedField }
      return updatedActivity
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        name="name"
        value={activity.name}
        onChange={handleChange}
      />
      <input
        placeholder="Nap, Diaper Change, Bottle"
        name="activity"
        value={activity.activity}
        onChange={handleChange}
      />
      <input
        placeholder="Description"
        name="description"
        value={activity.description}
        onChange={handleChange}
      />
      <input
        placeholder="(optional) Add Note"
        name="note"
        value={activity.note}
        onChange={handleChange}
        as="textarea"
        rows="3"
      />
      <button type="submit">Create Activity</button>
    </form>
  )
}

export default ActivityCreate
import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput, appointmentsList} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy', 'EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive, appointmentsList} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredList = this.getFilteredAppointmentsList()
    return (
      <div className="main-cont">
        <div className="bg-cont">
          <div className="app-cont">
            <div className="top-cont">
              <div className="input-cont">
                <h1 className="heading">Add Appointment</h1>
                <form onSubmit={this.onAddAppointment} className="form-cont">
                  <label htmlFor="txtTitle">TITLE</label>
                  <input
                    id="title"
                    type="text"
                    onChange={this.onChangeTitle}
                    value={titleInput}
                    className="title-input"
                  />
                  <label htmlFor="txtDate">DATE</label>
                  <input
                    type="date"
                    value={dateInput}
                    id="date"
                    onChange={this.onChangeDateInput}
                  />
                  <button type="submit" className="btn-add">
                    Add
                  </button>
                </form>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr className="horizontal-line" />
            <div className="display-cont">
              <div className="appoints-starbtn-cont">
                <h1 className="bot-head">Appointments</h1>
                <button
                  type="button"
                  className={`star-btn filter-style ${filterClassName}`}
                  onClick={this.onFilter}
                >
                  Starred
                </button>
              </div>
              <div className="appoints-cont">
                <ul className="appoints-list">
                  {filteredList.map(each => (
                    <AppointmentItem
                      key={each.id}
                      appointmentDetails={each}
                      toggleIsStarred={this.toggleIsStarred}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

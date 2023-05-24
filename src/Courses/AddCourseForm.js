import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteCourse, getAllCourses, sendNewCourse } from "../ServerManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./AddCourseForm.css"

export const AddCourseForm = () => {
    const [newCourse, updateNewCourse] = useState({})
    const [addCourse, setAddCourse] = useState(false)
    const navigate = useNavigate()
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const { courses, setCourses } = useContext(TeeTimeContext)

    const success = (position) => {
        // console.log(position)
    }
    const error = (error) => {
        // console.log(error)
    }
    const newCourseObjToSendToAPI = {
        name: newCourse.name,
        url: newCourse.url,
        address: newCourse.address,
        phone_number: newCourse.phoneNumber
    }
    const addCourseSection = (addCourse) => {
        if (addCourse === true) {
            return <>
                <div className="newCourse">
                    <div className="newCourseForm">
                        <form >
                            <h2 className="courseFormTitle">Add new course</h2>
                            <fieldset className="newCourse_input">
                                <div  >
                                    <input type="text" className="courseFormInput" id="courseName" placeholder="new course name" onChange={
                                        (evt) => {
                                            const copy = { ...newCourse }
                                            copy.name = evt.target.value
                                            updateNewCourse(copy)
                                        }
                                    } />
                                </div>
                                <div  >
                                    <input type="text" className="courseFormInput" id="address" placeholder="new course address" onChange={
                                        (evt) => {
                                            const copy = { ...newCourse }
                                            copy.address = evt.target.value
                                            updateNewCourse(copy)
                                        }
                                    } />
                                </div>
                                <div  >
                                    <input type="text" className="courseFormInput" id="phoneNumber" placeholder="new course phone number" onChange={
                                        (evt) => {
                                            const copy = { ...newCourse }
                                            copy.phoneNumber = evt.target.value
                                            updateNewCourse(copy)
                                        }
                                    } />
                                </div>
                                <div  >
                                    <input type="text" className="courseFormInput" id="url" placeholder="new course url" onChange={
                                        (evt) => {
                                            const copy = { ...newCourse }
                                            copy.url = evt.target.value
                                            updateNewCourse(copy)
                                        }
                                    } />
                                </div>
                                <div className="addCourseFormButtonBlock">
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        if (newCourse.address && newCourse.name) {
                                            sendNewCourse(newCourseObjToSendToAPI)
                                                .then(
                                                    () => {
                                                        getAllCourses()
                                                            .then(data => setCourses(data))
                                                    }
                                                )
                                                setAddCourse(false)
                                        }
                                        else {
                                            alert("please fill out the form")
                                        }
                                    }} id="addCourse" >Save</button>
                                    <button id="cancelAddCourse" onClick={() => {
                                        setAddCourse(false)
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51523.52488762775!2d-86.73771816347926!3d36.18552363154911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgolf%20courses%20near%20me!5e0!3m2!1sen!2sus!4v1680293954613!5m2!1sen!2sus"
                            id="map"
                            // width="600"
                            // height="450"
                            origin={navigator.geolocation.getCurrentPosition(success, error)}
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </>
        }
        else {
            return <>
                <div className="newCourse">
                    <button className="addNewCourseButton" onClick={
                        () => {
                            setAddCourse(true)
                        }
                    }>New Course?</button>
                </div>
            </>
        }
    }
    return <>
        <main id="addCourseContainer">
            {addCourseSection(addCourse)}
            <section id="listOfAddedCourses">
                <h3 className="courseFormTitle">Courses</h3>
                <ul id="listOfCourses">
                    {
                        courses.map(course => {
                            if (course) {
                                return <>
                                    <li key={course.id} className="courseListItem">
                                        <div className="courseInfo">
                                            <div>{course.image}</div>
                                            <div>{course.name}</div>
                                            <div>{course.address}</div>
                                            <div>{course.phoneNumber}</div>
                                            <Link className="siteLink" to={course.url} target="_blank">Website</Link>
                                        </div>
                                        <button className="deleteCourseButton" onClick={
                                            () => {
                                                if (window.confirm("are you sure?")) {
                                                    deleteCourse(course.id)
                                                        .then(() => {
                                                            getAllCourses()
                                                                .then(data => setCourses(data))
                                                        })
                                                }
                                                else {
                                                    return null
                                                }
                                            }
                                        }>Delete</button>
                                    </li>
                                </>
                            }
                        })
                    }
                </ul>
            </section>
        </main>
    </>
}
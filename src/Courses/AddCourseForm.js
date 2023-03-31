import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteCourse, sendNewCourse } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./AddCourseForm.css"

export const AddCourseForm = () => {
    const [newCourse, updateNewCourse] = useState({})
    const [addedCourse, setAddedCourse] = useState(false)
    const [addCourse, setAddCourse] = useState(false)
    const navigate = useNavigate()
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const { courses } = useContext(TeeTimeContext)

    const success = (position) => {
        console.log(position)
    }
    const error = (error) => {
        console.log(error)
    }
    // var x = document.getElementById("map");

    // const position = navigator.geolocation.getCurrentPosition(success, error)

    // const showPosition = () => {
    //     x.innerHTML = "Latitude: " + position.coords.latitude +
    //         "<br>Longitude: " + position.coords.longitude;
    //         return x.innerHTML
    // }
    // console.log(showPosition())

    const newCourseObjToSendToAPI = {
        name: newCourse.name,
        image: newCourse.url,
        address: newCourse.address,
        phoneNumber: newCourse.phoneNumber
    }
    if (addCourse) {

        return <>
            <main id="addCourseContainer">

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
                                    <button onClick={() => {
                                        if (newCourse.address && newCourse.name) {
                                            sendNewCourse(newCourseObjToSendToAPI)
                                            setAddedCourse(!addedCourse)
                                        }
                                        else {
                                            alert("please fill out the form")
                                        }

                                    }} id="addCourse" >Save</button>
                                    <button id="cancelAddCourse" onClick={() => {
                                        // navigate("/")
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
                            // origin={navigator.geolocation.getCurrentPosition(success, error)}
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">

                        </iframe>
                    </div>
                </div>
                <section id="listOfAddedCourses">
                    <ul id="listOfCourses">
                        {
                            courses.map(course => {
                                return <>
                                    <li key={course.id} className="courseListItem">
                                        <div>
                                            <div>{course.image}</div>
                                            <div>{course.name}</div>
                                            <div>{course.address}</div>
                                            <div>{course.phoneNumber}</div>
                                        </div>
                                        <button className="deleteCourseButton" onClick={
                                            () => {
                                                deleteCourse(course.id)

                                            }
                                        }>Delete Course</button>

                                    </li>
                                </>
                            })
                        }

                    </ul>
                </section>
            </main>
        </>
    }
    else {
        return <>
            <main id="addCourseContainer">
                <div className="newCourse">
                    <button className="addNewCourseButton" onClick={
                        () => {
                            setAddCourse(true)
                        }
                    }>New Course?</button>
                </div>

                <section id="listOfAddedCourses">
                    <h3 className="courseFormTitle">Courses</h3>

                    <ul id="listOfCourses">

                        {
                            courses.map(course => {
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

                                                }
                                                else {
                                                    return null
                                                }

                                            }
                                        }>Delete</button>

                                    </li>
                                </>
                            })
                        }

                    </ul>
                </section>
            </main>
        </>
    }

}
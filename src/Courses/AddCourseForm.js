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
                    <form className="newCourseForm">
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
                <div className="addNewCourseLink">
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
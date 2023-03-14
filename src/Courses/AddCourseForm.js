import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { deleteCourse, sendNewCourse } from "../ApiManager"
import { TeeTimeContext } from "../TeeTime/TeeTimeProvider"
import "./AddCourseForm.css"

export const AddCourseForm = () => {
    const [newCourse, updateNewCourse] = useState({})
    const [addedCourse, setAddedCourse] = useState(false)

    const navigate = useNavigate()
    const localLinkUpUser = localStorage.getItem("linkUp_user")
    const linkUpUserObj = JSON.parse(localLinkUpUser)
    const { courses } = useContext(TeeTimeContext)



    const newCourseObjToSendToAPI = {
        name: newCourse.name,
        image: newCourse.image,
        address: newCourse.address,
        phoneNumber: newCourse.phoneNumber
    }

    return <>
        <main id="addCourseContainer">

            <div className="newCourse">
                <form>

                    <fieldset className="newCourse_input">

                        <div  >
                            <input type="text" id="courseName" placeholder="new course name" onChange={
                                (evt) => {
                                    const copy = { ...newCourse }
                                    copy.name = evt.target.value
                                    updateNewCourse(copy)
                                }
                            } />
                        </div>
                        <div  >
                            <input type="text" id="address" placeholder="new course address" onChange={
                                (evt) => {
                                    const copy = { ...newCourse }
                                    copy.address = evt.target.value
                                    updateNewCourse(copy)
                                }
                            } />
                        </div>
                        <div  >
                            <input type="text" id="phoneNumber" placeholder="new course phone number" onChange={
                                (evt) => {
                                    const copy = { ...newCourse }
                                    copy.phoneNumber = evt.target.value
                                    updateNewCourse(copy)
                                }
                            } />
                        </div>
                        <div  >
                            <input type="text" id="imgUrl" placeholder="new course image" onChange={
                                (evt) => {
                                    const copy = { ...newCourse }
                                    copy.image = evt.target.value
                                    updateNewCourse(copy)
                                }
                            } />
                        </div>


                        <div>
                            <button onClick={() => {
                                if (newCourse.address && newCourse.name) {
                                    sendNewCourse(newCourseObjToSendToAPI)
                                    setAddedCourse(!addedCourse)
                                }
                                else {
                                    alert("please fill out the form")
                                }

                            }} id="savePost" >Save</button>
                            <button id="cancelPost" onClick={() => navigate("/")}>Cancel</button>
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
                                    <button onClick={
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
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';

function EditStudentAcademic() {
    const userRef = useRef(null);
    const [basicacademic, setBasicAcademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);

    const handleInputChange = (event) => {
        setSem(event.target.value);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                userRef.current = response.data.username;

                axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            setBasicAcademic(response.data);
                        } else {
                            alert('No academic data found');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });

                axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
                    .then(response => {
                        if (response.data) {
                            setMarks(response.data);
                        } else {
                            alert('No marks found for selected semester');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }, [sem]);

    const handleEditMarks = (subjectID, newMarks) => {
        // Make API call to edit marks for the subject
        if (newMarks < 0 || newMarks > 100) {
            alert('Marks should be between 0 and 100');
            return;
        }
        axios.put(`http://localhost:5000/editmarks/${userRef.current}/${subjectID}`, { marks: newMarks })
            .then(response => {
                console.log('Marks edited successfully');
                // After editing marks, fetch updated marks data for the current semester
                axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${sem}`)
                    .then(response => {
                        if (response.data) {
                            setMarks(response.data);
                        } else {
                            alert('No marks found for selected semester');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <Navbarfun />
            <h1>Edit Student Academic</h1>
            {basicacademic && <div className='basic-detail'>
                <p>Current Semester : {basicacademic.CurrentSemester}</p>
                <p>Tenth Marks : {basicacademic.TenthMarks}</p>
                <p>Higher Secondary Marks : {basicacademic.HigherSecondaryMarks}</p>
            </div>}
            <div>
                <label htmlFor="semSelect">Select Semester:</label>
                <select
                    id="semSelect"
                    value={sem || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Select Semester</option>
                    {[...Array(8).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
                <p>Semester: {sem}</p>
            </div>
            {marks && <div>
                <h2>Marks Table</h2>
                <table className='marks-table'>
                    <thead>
                        <tr>
                            <th>Subject ID</th>
                            <th>Marks Obtained</th>
                            <th>Grade</th>
                            <th>Edit Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((mark, index) => (
                            <tr key={index}>
                                <td>{mark.SubjectID}</td>
                                <td>{mark.MarksObtained}</td>
                                <td>{mark.Grade}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={mark.MarksObtained}
                                        onChange={(e) => {
                                            const newMarks = e.target.value;
                                            handleEditMarks(mark.SubjectID, newMarks);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </>
    );
}

export default EditStudentAcademic;

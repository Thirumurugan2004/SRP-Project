import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';

function EditStudentAcademic() {
    const userRef = useRef(null);
    const [basicacademic, setBasicAcademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);
    const [tenthMarks, setTenthMarks] = useState('');
    const [higherSecondaryMarks, setHigherSecondaryMarks] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sem') {
            setSem(value);
        } else if (name === 'tenthMarks') {
            setTenthMarks(value);
        } else if (name === 'higherSecondaryMarks') {
            setHigherSecondaryMarks(value);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                userRef.current = response.data.username;

                axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            setBasicAcademic(response.data);
                            setTenthMarks(response.data.TenthMarks);
                            setHigherSecondaryMarks(response.data.HigherSecondaryMarks);
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
        if (newMarks < 0 || newMarks > 100) {
            alert('Marks should be between 0 and 100');
            return;
        }
        axios.put(`http://localhost:5000/editmarks/${userRef.current}/${subjectID}`, { marks: newMarks })
            .then(response => {
                console.log('Marks edited successfully');
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

    const handleEditBasicAcademic = () => {
        // Make API call to edit basic academic details
        axios.put(`http://localhost:5000/editbasicacademic/${userRef.current}`, {
            TenthMarks: tenthMarks,
            HigherSecondaryMarks: higherSecondaryMarks
        })
        .then(response => {
            console.log('Basic academic details edited successfully');
            setBasicAcademic({
                ...basicacademic,
                TenthMarks: tenthMarks,
                HigherSecondaryMarks: higherSecondaryMarks
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <Navbarfun />
   
            {basicacademic && <div className='basic-detail'>
                <p>Current Semester : {basicacademic.CurrentSemester}</p>
                <p>Tenth Marks : 
                    <input
                        type="number"
                        name="tenthMarks"
                        value={tenthMarks}
                        onChange={handleInputChange}
                    />
                </p>
                <p>Higher Secondary Marks : 
                    <input
                        type="number"
                        name="higherSecondaryMarks"
                        value={higherSecondaryMarks}
                        onChange={handleInputChange}
                    />
                </p>
                <button className="add-btn" onClick={handleEditBasicAcademic}>Save Basic Academic Details</button>
            </div>}
            <div>
                <label htmlFor="semSelect">Select Semester:</label>
                <select
                    id="semSelect"
                    name="sem"
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

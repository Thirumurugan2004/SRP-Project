import { React, useState, useRef, useEffect } from "react";
import Navbarfun from "../../usercomponents/Navbarfun";
import axios from "axios";
import Chart from 'chart.js/auto';

function Teacheranalytics() {
    const userRef = useRef(null);
    const [rollNumber, setRollNumber] = useState('');
    const [basicacademic, setbasicacademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);
    const [gpa, setGpa] = useState(null);
    const handleInputChange1 = (event) => {
        setRollNumber(event.target.value);
    };
    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                userRef.current = response.data.username;
            })
            .catch(error => {
                console.log(error);
            });
            axios.get(`http://localhost:5000/getgpa/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    setGpa(response.data);
                     renderGpaChart(response.data);
                    console.log("gpa",response.data);
                } else {
                    setGpa(null);
                    alert('No GPA found');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [sem]);
    const fetchStudentDetails=(event) => {

    }
    const handleInputChange = (event) => {
        const selectedSemester = event.target.value;
        setSem(selectedSemester);

        axios.get(`http://localhost:5000/basicacademic/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    setbasicacademic(response.data);
                } else {
                    setbasicacademic(null);
                    alert('No academic found');
                }
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:5000/getsemestermarks/${rollNumber}/${selectedSemester}`)
            .then(response => {
                if (response.data) {
                    console.log("marks=",response.data);
                    setMarks(response.data);
                    renderChart(response.data);
                } else {
                    setMarks(null);
                    alert('No marks found');
                }
            })
            .catch(err => {
                console.log(err);
            });
           
    };

    const renderChart = (marksData) => {
        const ctx = document.getElementById('marksChart');
        const subjectIDs = marksData.map(mark => mark.SubjectID);
        const marksObtained = marksData.map(mark => mark.MarksObtained);
        if (Chart.instances && typeof Chart.instances === 'object') {
            Object.keys(Chart.instances).forEach(key => {
                const instance = Chart.instances[key];
                instance.destroy();
            });
        }


        new Chart(ctx, {
            type: 'line',
            data: {
                labels: subjectIDs,
                datasets: [{
                    label: 'Marks Obtained',
                    data: marksObtained,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'x', 
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    };
    const renderGpaChart = (gpaData) => {
        
        const ctx1 = document.getElementById('gpaChart');
        const semesters = gpaData.map(gpa => gpa.semester);
        const gpas = gpaData.map(gpa => gpa.gpa);
        console.log("render",semesters);
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: semesters,
                datasets: [{
                    label: 'GPA',
                    data: gpas,
                    borderColor: 'rgba(100, 245, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'x', 
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    };

    return (
        <>
            <Navbarfun />
            <h1>Visualization</h1>
            
        <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange1}
            />
            <button onClick={fetchStudentDetails}>Search</button>
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
            <div>
                <canvas id="marksChart"></canvas>
            </div>
            <div>
                <canvas id="gpaChart"></canvas>
            </div>
        </>
    )
}

export default Teacheranalytics;

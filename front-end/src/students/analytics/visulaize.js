import { React, useState, useRef, useEffect } from "react";
import Navbarfun from "../../usercomponents/Navbarfun";
import axios from "axios";
import Chart from 'chart.js/auto';

function Visualization() {
    const userRef = useRef(null);
    const [basicacademic, setbasicacademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                userRef.current = response.data.username;
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        const selectedSemester = event.target.value;
        setSem(selectedSemester);

        axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
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

        axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${selectedSemester}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data);
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

        // Check if Chart.instances exists and if it's an object
        if (Chart.instances && typeof Chart.instances === 'object') {
            // Iterate over the keys of Chart.instances
            Object.keys(Chart.instances).forEach(key => {
                // Get the chart instance corresponding to the current key and destroy it
                const instance = Chart.instances[key];
                instance.destroy();
            });
        }

        // Render the new chart instance
        new Chart(ctx, {
            type: 'bar',
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
                indexAxis: 'x', // Show labels on the y-axis
                maintainAspectRatio: false, // Disable aspect ratio to allow resizing
                responsive: true, // Allow chart to be responsive
                plugins: {
                    legend: {
                        display: true // Hide the legend
                    }
                }
            }
        });
    };

    return (
        <>
            <Navbarfun />
            <h1>Visualization</h1>
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
        </>
    )
}

export default Visualization;

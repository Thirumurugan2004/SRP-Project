import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';
import '../../CSS/view.css';
function ViewStudentOther(){
    const [Username,setUsername]=useState(null);
    const [Internship,setInternship]=useState(null);
    const [Scholarship,setScholarship]=useState(null);
    const [Project,setProject]=useState(null);
    const [Sports,setSports]=useState(null);
    const [Exams,setExams]=useState(null);
    const [Paper,setPaper]=useState(null);
    const [Events,setEvents]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    axios.defaults.withCredentials = true; 
    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                const username = response.data.username;
                
                axios.get(`http://localhost:5000/InternshipDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setInternship(response.data);
                        } else {
                            setErrorMessage('No Internship details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Internship details:', error);
                    });

                    axios.get(`http://localhost:5000/ScholarshipDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setScholarship(response.data);
                        } else {
                            setErrorMessage('No Scholarship details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Scholarship details:', error);
                    });
                    axios.get(`http://localhost:5000/ProjectDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setProject(response.data);
                        } else {
                            setErrorMessage('No Project details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Project details:', error);
                    });
                    axios.get(`http://localhost:5000/SportsDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setSports(response.data);
                        } else {
                            setErrorMessage('No Sports details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Sports details:', error);
                    });
                    axios.get(`http://localhost:5000/ExamDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setExams(response.data);
                        } else {
                            setErrorMessage('No Sports details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Exams details:', error);
                    });

                    axios.get(`http://localhost:5000/PaperDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setPaper(response.data);
                        } else {
                            setErrorMessage('No paper details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Paper details:', error);
                    });

                    axios.get(`http://localhost:5000/EventDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                            console.log(response.data);
                           
                            setEvents(response.data);
                        } else {
                            setErrorMessage('No Events details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Events details:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching username:', error);
            });    
    }, []);
    return(
        <>
        <Navbarfun/>
       
        {Internship && (
<>
<div className='view-form'>
<h2>Internship Details</h2>
                        <p className='view-field'><strong>Roll Number:</strong> {Internship.roll_number}</p>
                        <p className='view-field'><strong>Employer:</strong> {Internship.employer_name}</p>
                        <p className='view-field'><strong>On/Off campus:</strong> {Internship.on_off_campus}</p>
                        <p className='view-field'><strong>CTC:</strong> {Internship.ctc}</p>
                        <p className='view-field'><strong>Internship Duration:</strong> {Internship.InternshipDuration}</p>
                        <p className='view-field'><strong>Internship StartDate:</strong> {Internship.InternshipStartDate}</p>
                        <p className='view-field'><strong>Internship EndDate:</strong> {Internship.InternshipEndDate}</p>
                        <p className='view-field'><strong>Product/Service Based :</strong> {Internship.product_service_based }</p>
 </div>


</>
        )}
{ Scholarship && <div className='view-form'>
<h2>Scholarship Details</h2>
                        <p className='view-field'><strong>Scholarship Provider:</strong> {Scholarship.ScholarshipProvider}</p>
                        <p className='view-field'><strong>On/Off campus:</strong> {Scholarship.amount}</p>
</div>}

        {Project && 
        <div className='view-form'>
            <h2>Project Details</h2>
           <p className='view-field'><strong>Project Name:</strong> {Project.title}</p>
           <p className='view-field'><strong>Guide:</strong> {Project.guide}</p>
           <p className='view-field'><strong>Description:</strong> {Project.project_desc}</p>
            </div>}
            {!Project && <h3>No Project details found</h3>}
            {Sports && 
        <div className='view-form'>
            <h2>Sports Details</h2>
           <p className='view-field'><strong>Event Name:</strong> {Sports.event_name}</p>
           <p className='view-field'><strong>Award:</strong> {Sports.award}</p>
          
            </div>}
            {!Sports &&<h3>No sports details found</h3>}
            {Exams && 
        <div className='view-form'>
            <h2>Exams Attended</h2>
            <p className='view-field'><strong>GATE Score</strong>{Exams.GATE_scoew}</p>
            {/* to be filled in later */}
            </div>}
            {!Exams &&<h3>No exam details found</h3>}

             {Paper && 
        <div className='view-form'>
            <h2>Papers Presented:</h2>
            </div>}
            {!Paper &&<h3>No paper details found</h3>}
            {Events && <div className='view-form'>
                <h2>Events Details</h2>
                </div>}
                {!Events &&<h3>No events details found</h3>}
        </>
    )
}
export default ViewStudentOther;
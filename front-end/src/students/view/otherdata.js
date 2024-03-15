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
<h1>Internship Details</h1>
                        <p className='view-field'><strong>Roll Number:</strong> {Internship.roll_number}</p>
                        <p className='view-field'><strong>Employer:</strong> {Internship.employer_name}</p>
                        <p className='view-field'><strong>On/Off campus:</strong> {Internship.on_off_campus}</p>
                        <p className='view-field'><strong>CTC:</strong> {Internship.ctc}</p>
                        <p className='view-field'><strong>Internship Duration:</strong> {Internship.InternshipDuration}</p>
                        <p className='view-field'><strong>Internship StartDate:</strong> {Internship.InternshipStartDate}</p>
                        <p className='view-field'><strong>Internship EndDate:</strong> {Internship.InternshipEndDate}</p>
                        <p className='view-field'><strong>Product/Service Based :</strong> {Internship.product_service_based }</p>
 </div>

 <div className='view-form'>
<h1>Scholarship Details</h1>
                        <p className='view-field'><strong>Scholarship Provider:</strong> {Scholarship.ScholarshipProvider}</p>
                        <p className='view-field'><strong>On/Off campus:</strong> {Scholarship.amount}</p>
</div>
</>
        )}
        </>
    )
}
export default ViewStudentOther;
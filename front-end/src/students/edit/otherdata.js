import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../../usercomponents/Navbarfun';
import '../../CSS/view.css'
function EditStudentOther() {
    const [internships, setInternships] = useState(null);
    const [scholarships, setScholarships] = useState(null);
    const [projects, setProjects] = useState(null);
    const [sports, setSports] = useState(null);
    const [exams, setExams] = useState(null);
    const [papers, setPapers] = useState(null);
    const [events, setEvents] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [addScholarship,setaddScholarship] = useState(false);
    const userRef = useRef(null);
    const [scholarshipdata, setScholarshipdata]=useState({
        ScholarshipProvider:'',
        amount:''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/session')
            .then(response => {
                userRef.current = response.data.username;
                console.log('from other data edit', userRef.current);
                axios.get(`http://localhost:5000/InternshipDetails/${userRef.current}`)
                    .then(response => {
                        setInternships(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching Internship details:', error);
                    });
                axios.get(`http://localhost:5000/ScholarshipDetails/${userRef.current}`)
                    .then(response => {
                        setScholarships(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching Scholarship details:', error);
                    });
                    axios.get(`http://localhost:5000/ProjectDetails/${userRef.current}`)
                    .then(response => {
                        setProjects(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching Scholarship details:', error);
                    });
                    axios.get(`http://localhost:5000/SportsDetails/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            console.log("sports",response.data);
                           
                            setSports(response.data);
                        } else {
                            setErrorMessage('No Sports details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Sports details:', error);
                    });
                    axios.get(`http://localhost:5000/ExamDetails/${userRef.current}`)
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

                    axios.get(`http://localhost:5000/PaperDetails/${userRef.current}`)
                    .then(response => {
                        if (response.data) {
                            setPapers(response.data);
                            
                        } else {
                            setErrorMessage('No paper details available');
                        }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching Paper details:', error);
                    });

                    axios.get(`http://localhost:5000/EventDetails/${userRef.current}`)
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
                console.error('Error fetching session:', error);
            });
    }, []);

    const handleDeleteInternship = (id) => {
        const apiUrl = `http://localhost:5000/deleteInternship/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Internship record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Internship record:", error);
            });
    
    };

    const handleDeleteScholarship = (id) => {
        const apiUrl = `http://localhost:5000/deleteScholarship/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Scholarship record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting scholarship record:", error);
            });
    };
    const handleDeleteProject = (id) => {
        const apiUrl = `http://localhost:5000/deleteProject/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Project record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Project record:", error);
            });
    };
    const handleDeleteSports = (id) => {
        const apiUrl = `http://localhost:5000/deleteSports/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Sports record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Sports record:", error);
            });
    };
    const handleDeletePapers = (id) => {
        const apiUrl = `http://localhost:5000/deletePapers/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Papers record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Papers record:", error);
            });
    };
    const handleDeleteEvents = (id) => {
        const apiUrl = `http://localhost:5000/deleteEvents/${id}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log("Events record with id", id, "deleted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting Events record:", error);
            });
    };
    const handleAddInternship = () => {
        // Add new Internship entry
        // Implement your add logic here
    };

    const handleAddScholarship = async () => {
        try {
            const apiUrl = `http://localhost:5000/addScholarship/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, scholarshipdata);
            alert('Scholarship data added successfully');
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding scholarship data:', error.response.data);
            alert('Failed to add scholarship data');
        }
    };
    const handleInputChangescholarship = (event) => {
        const { name, value } = event.target;
        setScholarshipdata(prevData => ({
            ...prevData,
            [name]: value
        }));
        // setScholarshipdata({ ...scholarshipdata, [name]: value });
    };
const handleAddProject = () => {

};

const handleAddSports = () => {

};

const handleAddPapers = () => {

};

const handleAddEvents = () => {

};


    return (
        <>
            <Navbarfun />
            <h2>EditStudentOther</h2>
            {internships && internships.map((internship, index) => (
    <div className='view-form' key={index}>
        <h2>Internship Details {index + 1}</h2>
        <p className='view-field'><strong>Roll Number:</strong> {internship.roll_number}</p>
        <p className='view-field'><strong>Employer:</strong> {internship.employer_name}</p>
        <p className='view-field'><strong>On/Off campus:</strong> {internship.on_off_campus}</p>
        <p className='view-field'><strong>CTC:</strong> {internship.ctc}</p>
        <p className='view-field'><strong>Internship Duration:</strong> {internship.internship_duration}</p>
        <p className='view-field'><strong>Internship StartDate:</strong> {internship.internship_start_date}</p>
        <p className='view-field'><strong>Internship EndDate:</strong> {internship.internship_end_date}</p>
        <p className='view-field'><strong>Product/Service Based :</strong> {internship.product_service_based}</p>
        <button onClick={() => handleDeleteInternship(index)}>Delete</button>
    </div>
))}
            <button onClick={handleAddInternship}>Add Internship</button>


            {!scholarships&&<h3>No Scholarshp details found</h3>}
{scholarships && scholarships.map((Scholarship, index) => (
    <div className='view-form' key={index}>
        <h2>Scholarship Details {index + 1}</h2>
        <p className='view-field'><strong>Scholarship Provider:</strong> {Scholarship.ScholarshipProvider}</p>
        <p className='view-field'><strong>Amount:</strong> {Scholarship.amount}</p>
        <button onClick={() => handleDeleteScholarship(Scholarship.id)}>Delete</button>
    </div>
))}
            <button onClick={()=>setaddScholarship(!addScholarship)}>Add Scholarship</button>
{addScholarship && <div>
    Scholarship Provider<input type='text' name='ScholarshipProvider' value={scholarshipdata.ScholarshipProvider} onChange={handleInputChangescholarship} required></input>
    Amount<input type='text' name='amount' value={scholarshipdata.amount} onChange={handleInputChangescholarship}required></input>
    <button onClick={handleAddScholarship}></button>
    </div>}


            {projects && projects.map((Project, index) => (
                <div className='view-form' key={index}>
                    <h2>Project Details {index + 1}</h2>
                    <p className='view-field'><strong>Project Name:</strong> {Project.title}</p>
                    <p className='view-field'><strong>Guide:</strong> {Project.guide}</p>
                    <p className='view-field'><strong>Description:</strong> {Project.project_desc}</p>
                    <button onClick={() => handleDeleteProject(Project.id)}>Delete</button>
                </div>
            ))}
            <button onClick={handleAddProject}>Add Project</button>
            


            {sports && sports.map((sport, index) => (
    <div className='view-form' key={index}>
        <h2>Sports Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {sport.event_name}</p>
        <p className='view-field'><strong>Award:</strong> {sport.award}</p>
        <button onClick={() => handleDeleteSports(sport.id)}>Delete</button>
    </div>
))}
            <button onClick={handleAddSports}>Add Sports</button>
            {!sports &&<h3>No sports details found</h3>}



            {exams && (
    <div className='view-form'>
        <h2>Exams Attended</h2>
        <p className='view-field'><strong>GATE Score:</strong> {exams.GATE_score}</p>
        <p className='view-field'><strong>GRE Score:</strong> {exams.GRE_score}</p>
        <p className='view-field'><strong>TOEFL Score:</strong> {exams.TOEFL_score}</p>
        <p className='view-field'><strong>IELTS Score:</strong> {exams.IELTS_score}</p>
        <p className='view-field'><strong>UPSC Score:</strong> {exams.UPSC_score}</p>
        <p className='view-field'><strong>NET Score:</strong> {exams.NET_score}</p>
    </div>
)}
            {!exams &&<h3>No exam details found</h3>}



             
       {papers && papers.map((paper, index) => (
        <div className='view-form' key={index}>
            <h2>Papers Presented {index + 1}</h2>
            <p className='view-field'><strong>Title:</strong> {paper.title}</p>
            <p className='view-field'><strong>Journal:</strong> {paper.journal}</p>
            <p className='view-field'><strong>Date:</strong> {paper.date_year}</p>
            <p className='view-field'><strong>DOI link:</strong> {paper.DOI_link}</p>
            <button onClick={() => handleDeletePapers(paper.id)}>Delete</button>
      
        </div>
    ))}
    <button onClick={handleAddPapers}>Add Papers</button>
            {!papers &&<h3>No paper details found</h3>}




            {events && events.map((event, index) => (
    <div className='view-form' key={index}>
        <h2>Events Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {event.event_name}</p>
        <p className='view-field'><strong>Institution Name:</strong> {event.institution}</p>
        <p className='view-field'><strong>Role:</strong> {event.role}</p>
        <p className='view-field'><strong>Date:</strong> {event.date}</p>
        <p className='view-field'><strong>Awards:</strong> {event.awards}</p>
        <button onClick={() => handleDeleteEvents(event.id)}>Delete</button>
  
    </div>
))}
            <button onClick={handleAddEvents}>Add Events</button>
                {!events &&<h3>No events details found</h3>}

        </>
    );
}

export default EditStudentOther;

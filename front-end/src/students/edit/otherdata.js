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
    const [addinternship,setaddinternship] = useState(false);
    const [addproject,setaddproject] = useState(false);
    const [addsport,setaddsport] = useState(false);
    const [addexam,setaddexam] = useState(false);
    const [addpaper,setaddpaper] = useState(false);
    const [addevent,setaddevent] = useState(false);

    const userRef = useRef(null);

    const [scholarshipdata, setScholarshipdata]=useState({
        ScholarshipProvider:'',
        amount:''
    });
 const [internshipdata, setinternshipdata] = useState({
        employer_name: '',
        on_off_campus: '',
        ctc: '',
        internship_duration: '',
        internship_start_date: '',
        internship_end_date: '',
        product_service_based: ''
    });
    const [projectdata, setprojectdata] = useState({
        title: '',
        guide:'',
        project_desc:''
    });
    const [sportdata, setsportdata] = useState({
        event_name: '',
        award:''
    });
    const  [paperdata, setpaperdata] = useState({
        title: '',
        journal:'',
        date_year: '',
        DOI_link: ''
    });

    const [eventdata, setEventdata] = useState({
        event_name: '',
        institution:'',
        date:'',
        role: '',
        awards:''
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
    const handleInputChangescholarship = (event) => {
        const { name, value } = event.target;
        setScholarshipdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
       const handleInputChangeproject = (event) => {
        const { name, value } = event.target;
        setprojectdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleInputChangesport = (event) => {
        const { name, value } = event.target;
        setsportdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleInputChangepaper = (event) => {
        const { name, value } = event.target;
        setpaperdata(prevData => ({
          ...prevData,
            [name]: value
        }));
    }
    const handleInputChangeEvent = (event) => {
        const { name, value } = event.target;
        setEventdata(prevData => ({
          ...prevData,
            [name]: value
        }));
    };
    const handleInputChangeInternship = (event) => {
        const { name, value } = event.target;
        setinternshipdata(prevData => ({
        ...prevData,
            [name]: value
        }));
    };

    const handleAddInternship = async() => {
        try {
            const apiUrl = `http://localhost:5000/addInternship/${userRef.current}`; // Replace with your API endpoint
            const response = await axios.post(apiUrl, internshipdata);
            alert('Internship data added successfully');
            console.log('Response from API:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding Internship data:', error.response.data);
            alert('Failed to add Internship data');
        }
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
  
const handleAddProject = async() => {
    try {
        const apiUrl = `http://localhost:5000/addProject/${userRef.current}`; // Replace with your API endpoint
        const response = await axios.post(apiUrl, projectdata);
        alert('Project data added successfully');
        console.log('Response from API:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('Error adding Project data:', error.response.data);
        alert('Failed to add Project data');
    }
};

const handleAddSports = async() => {
    try {
        const apiUrl = `http://localhost:5000/addSport/${userRef.current}`; // Replace with your API endpoint
        const response = await axios.post(apiUrl, sportdata);
        alert('Sports data added successfully');
        console.log('Response from API:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('Error adding Sports data:', error.response.data);
        alert('Failed to add Sports data');
    }
};

const handleAddPapers = async() => {
    console.log('add papers');
    try {
        const apiUrl = `http://localhost:5000/addPaper/${userRef.current}`; // Replace with your API endpoint
        const response = await axios.post(apiUrl, paperdata);
        alert('Papers data added successfully');
        console.log('Response from API:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('Error adding Papers data:', error.response.data);
        alert('Failed to add Papers data');
    }
};

const handleAddEvents = async() => {
    try {
        const apiUrl = `http://localhost:5000/addEvent/${userRef.current}`; // Replace with your API endpoint
        const response = await axios.post(apiUrl, eventdata);
        alert('Events data added successfully');
        console.log('Response from API:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('Error adding Events data:', error.response.data);
        alert('Failed to add Events data');
    }
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
            <button onClick={()=>setaddinternship(!addinternship)}>Add Internship</button>
            {addinternship && (
  <div>
    Employer Name:<input type="text" name='employer_name' value={internshipdata.employer_name} onChange={handleInputChangeInternship} required></input>
    On/Off Campus:<input type="text" name='on_off_campus' value={internshipdata.on_off_campus} onChange={handleInputChangeInternship} required></input>
    CTC:<input type="number" name='ctc' value={internshipdata.ctc} onChange={handleInputChangeInternship}></input>
    Duration:<input type="text" name='InternshipDuration' value={internshipdata.InternshipDuration} onChange={handleInputChangeInternship} required></input>
    Start Date:<input type="date" name='InternshipStartDate' value={internshipdata.InternshipStartDate} onChange={handleInputChangeInternship} required></input>
    End Date:<input type="date" name='InternshipEndDate' value={internshipdata.InternshipEndDate} onChange={handleInputChangeInternship} required></input>
    Product/Service Based:<input type="text" name='product_service_based' value={internshipdata.product_service_based} onChange={handleInputChangeInternship} required></input>
    <button onClick={handleAddInternship}>Submit</button>
  </div>
)}


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
    Amount<input type='text' name='amount' value={scholarshipdata.amount} onChange={handleInputChangescholarship} required></input>
    <button onClick={handleAddScholarship}>Submit</button>
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
            <button onClick={()=>setaddproject(!addproject)}>Add Project</button>
            {addproject &&<div>
                Title:<input type="text" name='title' value={projectdata.title} onChange={handleInputChangeproject} required></input>
                Guide:<input type="text" name='guide' value={projectdata.guide} onChange={handleInputChangeproject} required></input>
                Description:<input type="textbox" name='project_desc' value={projectdata.project_desc} onChange={handleInputChangeproject} required></input>
                <button onClick={handleAddProject}>Submit</button>
                </div>}


            {sports && sports.map((sport, index) => (
    <div className='view-form' key={index}>
        <h2>Sports Details {index + 1}</h2>
        <p className='view-field'><strong>Event Name:</strong> {sport.event_name}</p>
        <p className='view-field'><strong>Award:</strong> {sport.award}</p>
        <button onClick={() => handleDeleteSports(sport.id)}>Delete</button>
    </div>
))}
            <button onClick={()=>setaddsport(!addsport)}>Add Sports</button>
            {!sports &&<h3>No sports details found</h3>}
            {addsport && (
  <div>
    Event Name:<input type="text" name='event_name' value={sportdata.event_name} onChange={handleInputChangesport} required></input>
    Award:<input type="text" name='award' value={sportdata.award} onChange={handleInputChangesport} required></input>
    <button onClick={handleAddSports}>Submit</button>
  </div>
)}



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
    <button onClick={()=>setaddpaper(!addpaper)}>Add Papers</button>
            {!papers &&<h3>No paper details found</h3>}

            {addpaper && (
  <div>
    Title:<input type="text" name='title' value={paperdata.title} onChange={handleInputChangepaper} required></input>
    Journal:<input type="text" name='journal' value={paperdata.journal} onChange={handleInputChangepaper} required></input>
    Date Year:<input type="date" name='date_year' value={paperdata.date_year} onChange={handleInputChangepaper} required></input>
    DOI Link:<input type="text" name='DOI_link' value={paperdata.DOI_link} onChange={handleInputChangepaper} required></input>
    <button onClick={handleAddPapers}>Submit</button>
  </div>
)}



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
            <button onClick={()=>setaddevent(!addevent)}>Add Events</button>
            {addevent && (
  <div>
    Event Name:<input type="text" name='event_name' value={eventdata.event_name} onChange={handleInputChangeEvent} required></input>
    Institution:<input type="text" name='institution' value={eventdata.institution} onChange={handleInputChangeEvent} required></input>
    Date:<input type="date" name='date' value={eventdata.date} onChange={handleInputChangeEvent} required></input>
    Role:<input type="text" name='role' value={eventdata.role} onChange={handleInputChangeEvent} required></input>
    Awards:<input type="text" name='awards' value={eventdata.awards} onChange={handleInputChangeEvent} required></input>
    <button onClick={handleAddEvents}>Submit</button>
  </div>
)}

                {!events &&<h3>No events details found</h3>}

        </>
    );
}

export default EditStudentOther;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Navbarfun from '../../usercomponents/Navbarfun';
import '../../CSS/edit.css'
function EditStudentPersonal() {
    const [studentData, setStudentData] = useState({
        RollNumber: '',
        DateOfBirth: '',
        Address: '',
        Phone: '',
        Sex: '',
        Blood_Group: '',
        FatherName: '',
        Mothername: '',
        Fatheroccupation: '',
        Motheroccupation: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const  [file,Setfile]=useState();
    const navigate = useNavigate(); 
var fetchedUsername;
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/session');
                fetchedUsername = response.data.username;
                const studentResponse = await axios.get(`http://localhost:5000/studentDetails/${fetchedUsername}`);
               

                if (studentResponse.data) {
                    const formattedStudentData = formatStudentData(studentResponse.data);
                    setStudentData(formattedStudentData);
              
                } else {
                    console.log("Student details not found");
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, []);

    const formatStudentData = (data) => {
        return {
            ...data,
            DateOfBirth: formatDate(data.DateOfBirth)
        };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (studentData.RollNumber) {
                const response = await axios.put(`http://localhost:5000/updateStudentDetails/${studentData.RollNumber}`, studentData);
                console.log('Student data updated successfully:', response.data);
                setSuccessMessage('Student data updated successfully');
            } else {
                const response = await axios.get('http://localhost:5000/session');
                fetchedUsername = response.data.username;
                const response1 = await axios.post(`http://localhost:5000/addStudentDetails/${fetchedUsername}`, studentData);
                console.log('Student data added successfully:', response1.data,fetchedUsername);
                setSuccessMessage('Student data added successfully');
            }

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/student/view/personaldata', { replace: true }); // Redirect to ViewPersonalData page
            }, 2000);
        } catch (error) {
            console.error('Error updating/adding student data:', error);
        }
    };
const handleFile=(e)=>{
    Setfile(e.target.files[0]);
}
const handleUpload=(e)=>{
const formdata=new FormData();
formdata.append('image',file);
axios.post(`http://localhost:5000/upload/${studentData.RollNumber}`,formdata)
.then(res=>{
    if(res.data.status === 'Success'){
        console.log("succeed");
    }
    else{
        console.log("failed");
    }

})
.catch(err=>console.log(err));
}
    return (
        <>
            <Navbarfun />
            <div classname='edit-container'>
                <h1 className='edit-heading'>Edit Student Personal Data</h1>
                <form className='edit-form' onSubmit={handleSubmit}>
                    
                        <label className='edit-label'>Date of Birth:</label>
                        <input className='edit-input' type="date" name="DateOfBirth" value={studentData.DateOfBirth || ""} onChange={handleChange} />
                 
                    
                        <label className='edit-label'>Address:</label>
                        <input className='edit-input' type="text" name="Address" value={studentData.Address} onChange={handleChange} />
                 
                 
                        <label className='edit-label'>Phone:</label>
                        <input className='edit-input' type="text" name="Phone" value={studentData.Phone} onChange={handleChange} />
                 
                        <label className='edit-label'>Sex:</label>
                        <input className='edit-input' type="text" name="Sex" value={studentData.Sex} onChange={handleChange} />
                
                   
                        <label className='edit-label'>Blood Group:</label>
                        <input className='edit-input' type="text" name="Blood_Group" value={studentData.Blood_Group} onChange={handleChange} />
                   
                    
                        <label className='edit-label'>Father's Name:</label>
                        <input  className='edit-input' type="text" name="FatherName" value={studentData.FatherName} onChange={handleChange} />
                
                    
                        <label className='edit-label'>Mother's Name:</label>
                        <input className='edit-input' type="text" name="Mothername" value={studentData.Mothername} onChange={handleChange} />
                    
                    
                        <label className='edit-label'>Father's Occupation:</label>
                        <input className='edit-input' type="text" name="Fatheroccupation" value={studentData.Fatheroccupation} onChange={handleChange} />
                  
                    
                        <label className='edit-label'>Mother's Occupation:</label>
                        <input className='edit-input' type="text" name="Motheroccupation" value={studentData.Motheroccupation} onChange={handleChange} />
                   <br/>
                   <input type="file" onChange={handleFile}></input>
                    <br/><button type="submit" onClick={handleUpload}>Submit</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </>
    );
}

export default EditStudentPersonal;

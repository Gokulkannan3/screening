import React, { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [backupemail, setBackupEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [ncompany, setNCompany] = useState();
    const [companyname,setCompanyNames] = useState('');
    const [wages, setWages] = useState();
    const [resume, setResume] = useState('');
    const [country, setCountry] = useState('');
    const [job, setJob] = useState('');
    const [adopt, setAdopt] = useState('');

    const addEmployee=()=>{
        axios.post(`http://localhost:5000/register`,{
            firstname: firstname,
            lastname : lastname,
            dob : dob,
            age : age,
            gender : gender,
            email : email,
            backupemail : backupemail,
            contact : contact,
            address : address,
            ncompany : ncompany,
            companyname : companyname,
            wages : wages ,
            resume : resume ,
            country : country ,
            job : job,
            adopt : adopt,
        })
        .then(() => {
            console.log("Success");
          })
          .catch(() => {
            console.error();
          });
    }

    const handleDateOfBirth = (e) => {
        setDob(e.target.value);
        const birthDate = new Date(e.target.value);
        const currentDate = new Date();
        const userAge = currentDate.getFullYear() - birthDate.getFullYear();
    
        setAge(userAge);
    }
    

  return (
    <div className='flex justify-center bg-red-300'>
        <form className='bg-red-200 p-32 flex content-center'>
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="font-bold flex justify-center mb-10 leading-7 text-5xl text-gray-900">Employee Registration</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                    <div class="sm:col-span-6">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div class="mt-2">
                        <input type="text" required onChange={(e)=>{setFirstname(e.target.value);}} name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <div class="mt-2">
                        <input type="text" required name="last-name" id="last-name" onChange={(e)=>{setLastname(e.target.value);}} autocomplete="family-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-3 ">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                    <div class="mt-2">
                        <input type="date" value={dob} onChange={handleDateOfBirth} class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div className='sm:col-span-3 mt-10 font-bold'>
                        {age && <p>Age {age}</p>}
                    </div>

                    <div class="sm:col-span-3">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                    <div class="mt-2">
                        <select id="country" required onChange={(e)=>{setGender(e.target.value);}} name="country" autocomplete="country-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900" >Email address</label>
                    <div class="mt-2">
                        <input id="email" required name="email" type="email" autocomplete="email" onChange={(e)=>{setEmail(e.target.value);}} class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Backup Email address</label>
                    <div class="mt-2">
                        <input id="email" required onChange={(e)=>{setBackupEmail(e.target.value);}} name="email" type="email" autocomplete="email" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Contact</label>
                    <div class="mt-2">
                        <input type='tel' required onChange={(e)=>{setContact(e.target.value);}} autocomplete="tel" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div class="mt-2">
                        <textarea id="text" required onChange={(e)=>{setAddress(e.target.value);}} autocomplete="email" className="textarea textarea-bordered block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"></textarea>
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Number of companies worked before</label>
                    <div class="mt-2">
                        <input type='number' required onChange={(e)=>{setNCompany(e.target.value);}} class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">
                            Company Name 
                        </label>
                        <div class="mt-2">
                            <input
                                required
                                type='text'
                                onChange={(e) => {setCompanyNames(e.target.value)}}
                                autocomplete="text"
                                class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div class="sm:col-span-6">
                    <label for="email"  class="block text-sm font-medium leading-6 text-gray-900">Expected annual salary</label>
                    <div class="mt-2">
                        <input type='number' required onChange={(e)=>{setWages(e.target.value);}} class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Upload your resume</label>
                    <div class="mt-2">
                        <input required onChange={(e)=>{setResume(e.target.value);}} type='file' class="file-input w-full max-w-xs border-0"/>
                    </div>
                    </div>
                    

                    <div class="sm:col-span-6">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                    <div class="mt-2">
                        <select required id="country" onChange={(e)=>{setCountry(e.target.value);}} name="country" autocomplete="country-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Select</option>
                            <option>India</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Select job position</label>
                    <div class="mt-2">
                        <select required id="country" onChange={(e)=>{setJob(e.target.value);}} name="country" autocomplete="country-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Select</option>
                            <option>Fullstack Developer</option>
                            <option>Data Analyst</option>
                            <option>Tester</option>
                            <option>Business Analyst</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-6">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Can you able to adapt according to companies location</label>
                    <div class="mt-2">
                        <select required id="country" onChange={(e)=>{setAdopt(e.target.value);}} name="country" autocomplete="country-name" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    </div>
                </div>
                <Link to='/details'>
                    <div className='flex justify-center mt-10'>
                        <button type='submit' onClick={addEmployee} className='btn btn-success flex justify-center'>Submit</button>
                    </div>
                </Link>
                </div>
            </form>
    </div>
  )
}

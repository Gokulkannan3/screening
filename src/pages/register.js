import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();
    const [basicDetails, setBasicDetails] = useState({
        firstname: '',
        lastname: '',
        dob: '',
        age: null,
        gender: '',
        email: '',
        contact: '',
        wages: null,
        country: '',
        job: '',
    });

    const [additionalDetails, setAdditionalDetails] = useState({
        address: '',
        degree:'',
        college:'',
        twelth:'',
        tenth:'',
    });

    const [validationMessage, setValidationMessage] = useState(false);

    const addEmployee = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!basicDetails.firstname || !basicDetails.lastname || !basicDetails.contact || !basicDetails.email || !basicDetails.dob || !basicDetails.gender || !basicDetails.country || !basicDetails.wages || !basicDetails.job) {
                setValidationMessage("Please fill in all details");
                return;
            }
            if (basicDetails.wages.length > 8) {
                setValidationMessage("Wages should be up to 8 digits");
                return;
            }
        } else if (step === 2) {
            if (!additionalDetails.address || !additionalDetails.degree || !additionalDetails.college || !additionalDetails.twelth || !additionalDetails.tenth) {
                setValidationMessage("Please fill in all details");
                return;
            }
        }

        const dataToPost = {
            ...basicDetails,
            ...additionalDetails,
        };
        const apiUrl = step === 1 ? 'http://localhost:5000/register' : 'http://localhost:5000/update';
        axios.post(apiUrl, dataToPost)
            .then((response) => {
                console.log("Success");
                if (step === 1) {
                    setStep(2);
                } else {
                    setStep(1);
                    setBasicDetails({
                        firstname: '',
                        lastname: '',
                        dob: '',
                        age: null,
                        gender: '',
                        email: '',
                        contact: '',
                        wages: null,
                        country: '',
                        job: '',
                    });
                    setAdditionalDetails({
                        address: '',
                        degree:'',
                        college:'',
                        twelth: '',
                        tenth:''
                    });
                    navigate('/details')
                }
            })
            .catch(() => {
                console.error();
            });
    }

    const handleDateOfBirth = (e) => {
        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            dob: e.target.value,
        }));

        const birthDate = new Date(e.target.value);
        const currentDate = new Date();
        const userAge = currentDate.getFullYear() - birthDate.getFullYear();

        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            age: userAge,
        }));
    }

    return (
        <div className='bg-red-300'>
            <div className='flex justify-end translate-y-12'>
                {validationMessage && (
                    <>
                        <Stack className='relative'>
                            <Alert severity="warning" onClose={() => setValidationMessage("")}>
                                {validationMessage}
                            </Alert>
                        </Stack>
                        {window.scrollTo({ top: 0, behavior: 'smooth' })}
                    </>
                )}
            </div>
            <div className='flex justify-center h-full'>
                <form className='bg-red-200 p-32 h-full flex content-center'>
                    {step === 1 && (
                        <div className="border-b border-gray-900/10 pb-32">
                            <h2 className="font-bold flex justify-center mb-10 leading-7 text-5xl text-gray-900">Employee Registration</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, firstname: e.target.value })); }} name="first-name" id="first-name" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, lastname: e.target.value })); }} name="first-name" id="first-name" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        required
                                        onChange={handleDateOfBirth}
                                        value={basicDetails.dob}
                                        name="date-of-birth"
                                        id="date-of-birth"
                                        className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={basicDetails.age || ''}
                                        name="age"
                                        id="age"
                                        className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                                <div class="mt-2">
                                    <select id="country" required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, gender: e.target.value })); }} name="country" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, email: e.target.value })); }} name="first-name" id="first-name" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Contact</label>
                                    <div className="mt-2">
                                        <input type="tel" max={11} required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, contact: e.target.value })); }} name="first-name" id="first-name" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Wages</label>
                                    <div className="mt-2">
                                        <input type="number" maxLength={8} required onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, wages: e.target.value })); }} name="first-name" id="first-name" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-6">
                                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                    <div class="mt-2">
                                        <select required id="country" onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, country: e.target.value })); }} name="country" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
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
                                    <select required id="country" onChange={(e) => { setBasicDetails((prevDetails) => ({ ...prevDetails, job: e.target.value })); }} name="country" class="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>Select</option>
                                        <option>Fullstack Developer</option>
                                        <option>Data Analyst</option>
                                        <option>Tester</option>
                                        <option>Business Analyst</option>
                                    </select>
                                </div>
                                </div>
                    
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-bold flex justify-center mb-10 leading-7 text-5xl text-gray-900">Additional Details</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setAdditionalDetails((additionalDetails) => ({ ...additionalDetails, address: e.target.value })); }} name="address" id="address" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Degree</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setAdditionalDetails((additionalDetails) => ({ ...additionalDetails, degree: e.target.value })); }} name="address" id="address" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">College Name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={(e) => { setAdditionalDetails((additionalDetails) => ({ ...additionalDetails, college: e.target.value })); }} name="address" id="address" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Twelth Mark</label>
                                    <div className="mt-2">
                                        <input type="number" required onChange={(e) => { setAdditionalDetails((additionalDetails) => ({ ...additionalDetails, twelth: e.target.value })); }} name="address" id="address" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-28 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Tenth Mark</label>
                                    <div className="mt-2">
                                        <input type="number" required onChange={(e) => { setAdditionalDetails((additionalDetails) => ({ ...additionalDetails, tenth: e.target.value })); }} name="address" id="address" className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </form>
            </div>
            <div className='flex justify-center -translate-y-20'>
                        <button type='submit' onClick={addEmployee} className='btn btn-success flex justify-center'>
                            {step === 1 ? 'Next' : 'Submit'}
                        </button>
                </div>
        </div>
    )
}

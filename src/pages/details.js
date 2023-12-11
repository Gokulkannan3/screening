import React from 'react'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Details() {
    const [employee,setEmployee] =useState([])
    const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
          setEmployee(
            employee.filter((val) => {
              return val.id !== id;
            })
          );
        });
      };

    const getEmployee = () => {
        Axios.get(`http://localhost:5000/employeelist`)
          .then((response) => {
            setEmployee(response.data);
          })
          .catch(() => {
            console.error();
          });
    };

    useEffect(() => {
        getEmployee();
        const intervalId = setInterval(() => {
          getEmployee();
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);
  return (
    <div>
    <div className='flex justify-center text-4xl p-32'>
        Employee Details
    </div>
      <div className='flex justify-center mt-5 mb-20'>
      
        <div className='flex justify-center items-center'>
          <table className="table table-zebra text-lg font-normal">
            <thead>
              <tr className='bg-red-400 text-lg font-black text-black'>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Wages</th>
                <th>Job preference</th>
                <th>Delete</th>
              </tr>
            </thead>
            {employee.length > 0 &&  (
            <tbody >
              {employee.map((val, key) => (
                <tr key={key} className='mt-5 font-semibold'>
                  <td>{val.id}</td>
                  <td>{val.firstname}</td>
                  <td>{val.lastname}</td>
                  <td>{val.age}</td>
                  <td>{val.gender}</td>
                  <td>{val.country}</td>
                  <td>{val.contact}</td>
                  <td>{val.wages}</td>
                  <td>{val.job}</td>
                  <button className='w-20 h-10 flex justify-center rounded-lg items-center bg-sky-400 hover:bg-green-400 border-2 border-dashed border-black'
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </tr>
              ))}
              
                </tbody>
            )}    
          </table>
        </div>
        </div>
  </div>
  )
}
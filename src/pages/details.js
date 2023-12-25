import React from 'react'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

export default function Details() {
    const [employee,setEmployee] =useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const deleteEmployee = (id) => {
        Axios.delete(`http://3.136.19.245:5000/${id}`).then((response) => {
          setEmployee(
            employee.filter((val) => {
              return val.id !== id;
            })
          );
        });
      };

      const handleEdit = (id) => {
        const employeeToEdit = employee.find((emp) => emp.id === id);
        setEditingEmployee(employeeToEdit);
        openModal();
      };
    

      const handleModalSave = () => {
        Axios.put(`http://3.136.19.245:5000/${editingEmployee.id}`, editingEmployee)
          .then((response) => {
            console.log('Employee edited:', response.data);
            closeModal();
            getEmployee();
          })
          .catch((error) => {
            console.error('Error editing employee:', error);
          });
      };
    
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
      };
    const getEmployee = () => {
        Axios.get(`http://3.136.19.245:5000/employeelist`)
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
  
  console.log('Employee data:', employee);
  
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
                <th>Edit/Delete</th>
              </tr>
            </thead>
            {employee.length > 0 && (
              <tbody>
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

                    <td>
                      <div>
                        <button
                          className='w-20 h-10 flex justify-center rounded-lg items-center bg-blue-400 hover:bg-blue-600 border-2 border-dashed border-black mr-2'
                          onClick={() => handleEdit(val.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='w-20 h-10 flex justify-center rounded-lg items-center bg-sky-400 hover:bg-red-400 border-2 border-dashed border-black'
                          onClick={() => deleteEmployee(val.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='flex justify-center p-80'>
          <div className='bg-red-300 p-8 w-1/2 rounded-lg'>
            <h2 className='text-lg font-semibold mb-5'>Edit Employee</h2>
            <div className='col-span-6'>
              <label>
                First Name:
                <input
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingEmployee ? editingEmployee.firstname : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      firstname: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Last Name:
                <input
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingEmployee ? editingEmployee.lastname : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      lastname: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Gender:
                <input
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingEmployee ? editingEmployee.gender : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      gender: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Country:
                <select
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  value={editingEmployee ? editingEmployee.country : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      country: e.target.value,
                    })
                  }
                >
                  <option>Select</option>
                  <option>India</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Contact:
                <input
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  type='tel'
                  value={editingEmployee ? editingEmployee.contact : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      contact: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Wages:
                <input
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  type='number'
                  value={editingEmployee ? editingEmployee.wages : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      wages: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Job Preference:
                <select
                  className='border-2 border-black rounded-lg ml-2 mb-5'
                  value={editingEmployee ? editingEmployee.job : ''}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      job: e.target.value,
                    })
                  }
                >
                  <option>Select</option>
                  <option>Fullstack Developer</option>
                  <option>Data Analyst</option>
                  <option>Tester</option>
                  <option>Business Analyst</option>
                </select>
              </label>
            </div>
            <div className='flex justify-center'>
              <button
                className='w-20 h-10 flex justify-center rounded-lg items-center bg-green-400 hover:bg-green-600 border-2 border-dashed border-black mr-2'
                onClick={handleModalSave}
              >
                Save
              </button>
              <button
                className='w-20 h-10 flex justify-center rounded-lg items-center bg-red-400 hover:bg-red-600 border-2 border-dashed border-black'
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
  )
}

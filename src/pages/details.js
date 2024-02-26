import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

export default function Details() {
  const [employee, setEmployee] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      if (response.status === 200) {
        setEmployee(
          employee.filter((val) => {
            return val.id !== id;
          })
        );
        console.log(`Employee with ID ${id} deleted successfully.`);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
    });
  };

  const handleEdit = (id) => {
    const employeeToEdit = employee.find((emp) => emp.id === id);
    setEditingEmployee(employeeToEdit);
    openModal();
  };

  const handleModalSave = () => {
    if (editingEmployee) {
      Axios.put(`http:///localhost:5000/updateEmployee/${editingEmployee.id}`, editingEmployee)
        .then((response) => {
          console.log('Employee edited:', response.data);
          closeModal();
          getEmployee();
        })
        .catch((error) => {
          console.error('Error editing employee:', error);
        });
    }
  };  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const getEmployee = () => {
    Axios.get(`http://localhost:5000/employeelist`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  };

  useEffect(() => {
    getEmployee();
    const intervalId = setInterval(() => {
      getEmployee();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  console.log('Employee data:', employee)

  return (
    <div>
    <div className='flex justify-center text-4xl p-32'>
        Employee Details
    </div>
      <div className='flex justify-center mt-5 mb-20'>
      
        <div className='flex justify-center items-center p-10'>
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
                <th>Address</th>
                <th>College</th>
                <th>Degree</th>
                <th>Twelth</th>
                <th>Tenth</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            {Array.isArray(employee) && employee.length > 0 && (
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
                    <td>{val.address}</td>
                    <td>{val.college}</td>
                    <td>{val.degree}</td>
                    <td>{val.twelth}</td>
                    <td>{val.tenth}</td>

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
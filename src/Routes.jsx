import React from "react";
import {Routes,Route} from 'react-router-dom';
import Register from "./pages/register";
import Details from "./pages/details";



const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path ='/' element={<Register/>}/>
            <Route exact path='/details' element={<Details/>}/>
        </Routes>
        
    )   
}
export default AllRoutes
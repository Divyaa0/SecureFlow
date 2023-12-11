
import React, { useRef } from "react";
import axios from "axios";
import '../styledashb.css'
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { AiOutlineContainer, AiOutlineFileProtect, AiOutlineSnippets, AiOutlineSetting, AiOutlineLogout, AiOutlineSearch, AiOutlineFund } from "react-icons/ai";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';





const AdminNavbar = () => {
    const urll = 'http://localhost:8000'
    const navRef = useRef(null);
    const [isNavClose, setIsNavClose] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const user = localStorage.getItem('display_name');
  
    // console.log("location 2 : -" , location)

    const navcloseFunc = () => {
        // Toggle the state to control the class
        setIsNavClose(!isNavClose);
    };

    const Navigation = useNavigate();
    const Logoclick = () => {
        Navigation("/")
    }

    const dashboard_btn = async () => {
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/admin-dashboard`, { headers: { 'Authorization': token } }).then(response => {
            // Handle successful response and update the dashboard UI
            console.log("response recieved from token AdminDashboard verification", response);
            if (response.status == 200) {
                Navigation("/Admin/admin-dashboard");
            }
        })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }
    const upload_btn = async () => {
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/upload-data`, { headers: { 'Authorization': token } }).then(response => {
            // Handle successful response and update the dashboard UI
            console.log("response recieved from upload data verification", response);
            if (response.status == 200) {
                Navigation("/Admin/upload-data")
            }
        })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }
    const logout_btn = async () => {
        const token = localStorage.getItem('jwtToken')
        const userid = localStorage.getItem('userid')
      
        await axios.get(`${urll}/logout`, { headers: { 'Authorization': token } }).then(response => {

            console.log("response recieved from logout ");
        })



    }


    const optionList = [
        { value: "Dashboard", label: "Dashboard" },
        { value: 'UploadData', label: "Upload Data" },
        { value: "Activities", label: "Activities" },
        { value: "Mytask", label: "My Task" },

    ];

    return (
        <>

            <header>

                <div class="logosec">
                    <div class="logo" onClick={Logoclick}>CRM App</div>
                    <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
                        class="icn menuicn"
                        id="menuicn"
                        alt="menu-icon" onClick={navcloseFunc} />
                </div>

                <div class="searchbar">
                    <div className="card flex justify-content-center">
                        <Dropdown value={items} onChange={(e) => setItems(e.value)} options={optionList} optionLabel="label"
                            editable placeholder="Search" className="w-full md:w-14rem" />
                    </div>

                </div>

                <div class="message">
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                        data-pr-tooltip="No notifications"
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ fontSize: '2rem', cursor: 'pointer' }}>
                        <Badge severity="danger"></Badge>
                    </i>

                    <div class="dp">
                        <img src=
                            "https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            class="dpicn"
                            alt="dp" />
                    </div>
                    <h6 style={{ color: 'black', fontWeight: '100', fontSize: '15px' }}>{user}</h6>

                </div>

            </header>

            <div class="main-container" style={{ width: '250px' }}>
                <div className={`navcontainer  ${isNavClose ? 'navclose' : ''}`} ref={navRef}>
                    <nav class="nav" >
                        <div class="nav-upper-options">
                            <div class="nav-option option1 " onClick={dashboard_btn}>
                                <AiOutlineFund class="nav-img" />
                                <h3> Dashboard</h3>
                            </div>

                            <div class="option2 nav-option" onClick={upload_btn}>
                                <AiOutlineContainer class="nav-img" />
                                <h3>Upload Data</h3>
                            </div>

                            <div class="nav-option " >
                                <AiOutlineFileProtect class="nav-img" />
                                <h3> Activities</h3>
                            </div>

                            <div class="nav-option option4">
                                <AiOutlineSnippets class="nav-img" />
                                <h3>My Task</h3>
                            </div>


                            <div class="nav-option option6">

                                <AiOutlineSetting class="nav-img" />
                                <h3> Settings</h3>
                            </div>

                            <div class="nav-option logout " onClick={logout_btn}>

                                <AiOutlineLogout class="nav-img" />
                                <h3>Logout</h3>
                            </div>

                        </div>
                    </nav>
                </div>

            </div>

        </>
    )
}
export default AdminNavbar;


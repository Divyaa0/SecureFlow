
import React, { useRef } from "react";
import './styledashb.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { AiOutlineFilter, AiOutlineContainer, AiOutlineFileProtect, AiOutlineSnippets, AiOutlineSetting, AiOutlineLogout, AiOutlineSearch, AiOutlineFund } from "react-icons/ai";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';



const Dashboard = () => {
    const urll = 'http://localhost:8000'
    const navRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [isNavClose, setIsNavClose] = useState(false);
    const [items, setItems] = useState([]);
    const user = localStorage.getItem('display_name');
    const navcloseFunc = () => {
        // Toggle the state to control the class
        setIsNavClose(!isNavClose);
      };

    const Navigation = useNavigate();
    const Logoclick = () => {
        Navigation("/")
    }
  
    const dashboard_btn = async() => {
        const token=localStorage.getItem('jwtToken')
        await axios.get(`${urll}/dashboard`,{headers:{'Authorization':token}}).then(response => {
          // Handle successful response and update the dashboard UI
          console.log("response recieved from Dashboard verification",response);
          if(response.status==200)
          {
            Navigation("/dashboard");
          }
        })
        .catch(error => {
          console.error('Error fetching dashboard data:', error);
        }); 
    }
    const foreclosure_btn = async() => {
        const token=localStorage.getItem('jwtToken')
        await axios.get(`${urll}/foreclosure`,{headers:{'Authorization':token}}).then(response => {
          // Handle successful response and update the dashboard UI
          console.log("response recieved from Foreclosure verification",response);
          if(response.status==200)
          {
            Navigation("/foreclosure");
          }
        })
        .catch(error => {
          console.error('Error fetching foreclosure data:', error);
        });  
    }
    const optionList = [
        { value: "Dashboard", label: "Dashboard" },
        { value: 'FCdata', label: "Foreclosure" },
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

            <div class="main-container">
            <div className={`navcontainer ${isNavClose ? 'navclose' : ''}`} ref={navRef} >
                    <nav class="nav" ref={navRef}>
                        <div class="nav-upper-options">
                            <div class="nav-option option1 " onClick={dashboard_btn}>
                                <AiOutlineFund class="nav-img" />
                                <h3> Dashboard</h3>
                            </div>

                            <div class="option2 nav-option" onClick={foreclosure_btn}>
                                <AiOutlineContainer class="nav-img" />
                                <h3> Foreclosure</h3>
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

                            <div class="nav-option logout">

                                <AiOutlineLogout class="nav-img" />
                                <h3>Logout</h3>
                            </div>

                        </div>
                    </nav>
                </div>
                <div class="main">

                   
                     <><div class="searchbar2">
                        <input type="text"
                            name=""
                            id=""
                            placeholder="Search" />
                        <div class="searchbtn">

                        </div>
                    </div>


                        <div>

                            <div class="box-container">

                                <div class="box box1">

                                    <div class="text">
                                        <h2 class="topic-heading">$15000</h2>
                                        <h2 class="topic">Total Earning</h2>
                                    </div>


                                </div>

                                <div class="box box2">
                                    <div class="text">
                                        <h2 class="topic-heading">320</h2>
                                        <h2 class="topic">Activity Tracks</h2>
                                    </div>

                                </div>

                                <div class="box box3">
                                    <div class="text">
                                        <h2 class="topic-heading">70</h2>
                                        <h2 class="topic">Completed Tasks</h2>
                                    </div>

                                </div>

                                <div class="box box4">
                                    <div class="text">
                                        <h2 class="topic-heading">10</h2>
                                        <h2 class="topic">Pending Tasks</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="report-container">
                                <div class="report-header">
                                    <h1 class="recent-Articles"></h1>
                                    <div>
                                        <label class="view">Sort By : </label>
                                        <select name="" id="">
                                            <option value="">Today</option>
                                            <option value="">Last Week</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="report-body">
                                    <div class="report-topic-heading">
                                        <h3 class="t-op">DateTime</h3>
                                        <h3 class="t-op">Opening Bid</h3>
                                        <h3 class="t-op">Closing Bid</h3>
                                        <h3 class="t-op">Status</h3>
                                    </div>

                                    <div class="items">
                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 73</h3>
                                            <h3 class="t-op-nextlvl">2.9k</h3>
                                            <h3 class="t-op-nextlvl">210</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 72</h3>
                                            <h3 class="t-op-nextlvl">1.5k</h3>
                                            <h3 class="t-op-nextlvl">360</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 71</h3>
                                            <h3 class="t-op-nextlvl">1.1k</h3>
                                            <h3 class="t-op-nextlvl">150</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 70</h3>
                                            <h3 class="t-op-nextlvl">1.2k</h3>
                                            <h3 class="t-op-nextlvl">420</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 69</h3>
                                            <h3 class="t-op-nextlvl">2.6k</h3>
                                            <h3 class="t-op-nextlvl">190</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 68</h3>
                                            <h3 class="t-op-nextlvl">1.9k</h3>
                                            <h3 class="t-op-nextlvl">390</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 67</h3>
                                            <h3 class="t-op-nextlvl">1.2k</h3>
                                            <h3 class="t-op-nextlvl">580</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 66</h3>
                                            <h3 class="t-op-nextlvl">3.6k</h3>
                                            <h3 class="t-op-nextlvl">160</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div class="item1">
                                            <h3 class="t-op-nextlvl">Article 65</h3>
                                            <h3 class="t-op-nextlvl">1.3k</h3>
                                            <h3 class="t-op-nextlvl">220</h3>
                                            <h3 class="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </> 


                    

                </div>
            </div>

        </>
    )
}
export default Dashboard;



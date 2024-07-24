import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import '../styles/dashboard.css'
import PvTable from "./PvTable";
import GoatForm from "./GoatForm";
import BeneficiaryForm from "./BeneficiaryForm";
import PvInsight from "./PvInsight";
import BvTable from "./BvTable";
import Admin from "./Admin";

const Dashboard = ({content}) => {
  const { currentUser, currentUserDetails } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const arr = []
        snapshot.forEach((doc) => {
            arr.push({...doc.data(), id:doc.id});
          });
        setUsers(arr);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='full'>
      <Sidebar/>
      <div className="content">
        <Topbar/>
        {content === 'pvtable' && (<PvTable/>)}
        {content === 'assigngoat' && (<GoatForm/>)}
        {content === 'addben' && (<BeneficiaryForm/>)}
        {content === 'pvinsight' && (<PvInsight/>)}
        {content==='bvtable' && (<BvTable/>)}
        {content === 'admin' && (<Admin/>)}
      </div>
      
      
    </div>
  );
};

export default Dashboard;

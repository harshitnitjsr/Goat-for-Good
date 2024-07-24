import React, {useState, useEffect} from 'react';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Admin = () => {
  // Dummy data

  const [goats, setGoats] = useState([]);
  const [healthy, setHealthy] =useState(0)
  const [mild, setMild] =useState(0)
  const [severe, setSevere] =useState(0)
  const [male, setMale] =useState(0)
  const [pregnant, setPregnant] =useState(0)
  const [g0, setG0] = useState(0);
    const [g1, setG1] = useState(0);
    const [g2, setG2] = useState(0);
    const [g3, setG3] = useState(0);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3080/api/v1/goat/findgoat");
        const data = await response.data;
        setGoats(data);
        let localMild = 0;
        let localSevere = 0;
        let localHealthy = 0;
        let localPregnant = 0;

        let l0 = 0;
        let l1 = 0;
        let l2 = 0;
        let l3 = 0;
         data.forEach((goat) => {
            console.log(goat)
            if(goat.health === "Healthy") {
                // console.log("hi")
                localHealthy++;
            } else if(goat.health === "Mild") {
                localMild++
            } else {
                localSevere++
            }
            if (goat.isPregnant) {
                localPregnant++;
              }
            if(goat.gender === 'Male')setMale(male+1)
            if(goat.year_of_birth >= 2023) l0++;
            else if(goat.year_of_birth>= 2022) l1++;
            else if(goat.year_of_birth>=2019) l2++;
            else l3++;  
        })
        setHealthy(localHealthy)
        setMild(localMild)
        setSevere(localSevere)
        setPregnant(localPregnant)
        setG0(l0);
        setG1(l1);  
        setG2(l2);
        setG3(l3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [])



  const [paravet, setParavet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3080/api/v1/paravat/find');
        const data = await response.data;
        const arr = [];
        data.mdg.map((item)=>{
            console.log(item)
            
            arr.push(item)
        })
        setParavet(arr);
        console.log(paravet[0])
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
},[]);
  const healthData = [
    { name: 'Healthy', value: healthy, fill: '#77dd77' }, // green
    { name: 'Mild', value: mild, fill: '#ffb347' },    // yellow
    { name: 'Severe', value: severe, fill: '#ff6961' }
  ];

  const genderData = [
    { name: 'Female', value: goats.length - male, fill: '#ffb6c1' },    // pink
    { name: 'Male', value: male, fill: '#aec6cf' }
  ];

  const weightData = [
    { name: 'Jan', Goat1: 50, Goat2: 45 },
    { name: 'Feb', Goat1: 55, Goat2: 50 },
    { name: 'Mar', Goat1: 60, Goat2: 52 },
  ];

  const ageData = [
    { name: '0-1', value: g0 },
    { name: '1-2', value: g1 },
    { name: '2-4', value: g2 },
    { name: '>5', value: g3 },
  ];

  const pregnancyData = [
    { name: 'Pregnant', value: pregnant,  fill:"#aec6cf"},
    { name: 'Not Pregnant', value: goats.length-pregnant, fill:"#ffcc80" },
  ];

  const paravatData = [
    { name: 'Paravat 1', Assignments: paravet[0]?.no_of_assignments, Completed: paravet[0]?.no_of_completed_assignments },
    { name: 'Paravat 2', Assignments: paravet[1]?.no_of_assignments, Completed: paravet[1]?.no_of_completed_assignments },
    { name: 'Paravat 3', Assignments: paravet[2]?.no_of_assignments, Completed: paravet[2]?.no_of_completed_assignments },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '300px', height: '300px'}}>
        <h4>Health Status of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={healthData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '300px', height: '300px', flexGrow: '1' }}>
        <h4>Gender Distribution of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    
      <div style={{ width: '300px', height: '300px'}}>
        <h4>Pregnancy Status of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pregnancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#ffc658" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div  style={{ width: '100px', height: '300px'}}>

      </div>
      

      <div style={{ width: '400px', height: '300px', margin: '10px',  marginTop: '-10px' }}>
        <h4>Goat Age Distribution</h4>
        <ResponsiveContainer>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      

      <div style={{ width: '700px', height: '300px', margin: '10px',  marginTop: '-10px' }}>
        <h4>Para-vet Assignments</h4>
        <ResponsiveContainer>
          <BarChart data={paravatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Assignments" fill="#8884d8" />
            <Bar dataKey="Completed" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Admin;

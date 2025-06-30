import React, { useContext ,useEffect} from "react";
import AppContext from "../context/AppContext";

const Expenses = () => {
  const {expenseData,setExpenseData} = useContext(AppContext)

  console.log("new data",expenseData)

  useEffect(()=>{
    fetch(`https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses.json`)
    .then((res)=>{
      if(res.ok){
        return res.json().then((data)=>{
          setExpenseData(data)
          console.log("All the data ",data) 
        })
      }
    })

  },[])



  return <>

  <div>
    <div>
      <h1>ALl Expenses</h1>
    </div>
    <div style={{display:"flex",flexWrap:'wrap',gap:'2px'}}>
      
   {Object.entries(expenseData).map(([key, value]) => (
  <div 
    key={key}
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#f9f9f9",
      width: "300px",
      margin:'1rem auto'

    }}
  >
    <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
      ₹{value.amount}
    </p>
    <p style={{ margin: 0, color: "#666" }}>{value.description}</p>
     <p style={{ margin: 0, color: "#666",backgroundColor:'pink',borderRadius:'10px' }}>{value.category}</p>
  </div>
))}

     
    
     
    </div>


  </div>
  
  
  
   </>;
};

export default Expenses;

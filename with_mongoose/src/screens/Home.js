import React,{useState,useEffect} from 'react';

function Home() {
    
    
    const [work,setWork] = useState("")
    const [data,setData]= useState([])
    const [Temp,setTemp] =useState("jbdsjb");
    useEffect(()=>{
        getData()
    },[Temp]) 

    const getData =()=>{
        fetch("http://localhost:5000/getdata",{
            headers:new Headers({
              'content-Type':'application/json'
            })
            }).then(res=>res.json())
            .then(data=>{ 
                setData(data);
            }
        )
    }

    const post_data = ()=>{
        console.log("Helo")
        fetch("http://localhost:5000/postdata",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
        "work":work
       })
      })
      .then(res=>res.json())
      .then(response => {
        setWork(""); 
        setTemp("create"+response?._id);
      })
      .catch(error => {
        console.error("Error: ------------", error);
      });
    }

    

    return (
        <div>
            <h1 className='text-center mt-5'>Crud Operations</h1>
            <hr />
            <div className='container mt-3' >
                <div className='row mt-4'>
                    <input className='col-7 ' placeholder='Add remainder' onChange={(e)=>{setWork(e.target.value)}} value={work} />
                    <button className='btn btn-outline-secondary col-2 offset-1' onClick={post_data}>Add</button>
                </div>
            </div>

            <div className='container mt-5'>
                <ul style={{margin:"0",padding:"0"}}>
                    {data.map((item)=>(
                        <Fields data={item} setTemp={setTemp}/>
                    )  
                    )}
                </ul>
            </div>
        </div>
    );
}


function Fields(props){
    const [change,setChange] = useState("")
    const handler = (e)=>{
        setChange(e)
    }
    const [work,setWork] = useState(props.data.work)
    const UpdateDetails=()=>{
        fetch("http://localhost:5000/updatedata",{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
            "work":work,
            "id":props.data._id
         })
        })
        .then(res=>{
            
            props.setTemp("update"+props.data._id)
            setChange("")
            alert("Updated.")})
      }

      const deleteData=()=>{
        fetch("http://localhost:5000/deletedata",{
            method:"DELETE",
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({
                "id":props.data._id
            })
        }).then(()=>{
            props.setTemp("delete"+props.data._id)
            alert("Deleted")})
         
      }

    
    return(
        <div className='row align-items-center mt-5'>
            {change === props.data._id?<><input className='col-4 py-1' placeholder='Edit here' value={work} onChange={(e)=>setWork(e.target.value)} />
            <button className='col-2 offset-1 btn btn-outline-success' onClick={UpdateDetails}>Update</button><button className='col-2 offset-1 btn btn-outline-danger' onClick={(e)=>handler("")}>Cancel</button></>
            :<><li className='col-4 text-truncate' style={{listStyleType:'none',margin:"0",padding:'0', fontSize:"24px"}}>{props.data.work}</li>
            <button className='col-2 offset-1 btn btn-outline-info' onClick={(e)=>handler(props.data._id)}>Edit</button>
            <button className='col-2 offset-1 btn btn-outline-danger' onClick={deleteData}>Delete</button>
            </>}
            
           
        </div>
    )
}


export default Home;
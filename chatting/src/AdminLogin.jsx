import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

const [password,setPassword] = useState("");
const navigate = useNavigate();

const login = () => {

if(password === "123456"){

localStorage.setItem("admin","true");

navigate("/admin-gallery");

}else{

alert("Wrong Password");

}

};

return(

<div style={{textAlign:"center",marginTop:"150px"}}>

<h2>Admin Login</h2>

<input
type="password"
placeholder="Enter Admin Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{padding:"10px",margin:"10px"}}
/>

<br/>

<button onClick={login} style={{padding:"10px 20px"}}>
Login
</button>

</div>

);

};

export default AdminLogin;
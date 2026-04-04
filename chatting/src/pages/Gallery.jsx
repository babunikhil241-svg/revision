import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, UploadCloud, Plus } from "lucide-react";

const Gallery = ({ isAdmin }) => {

const [images,setImages] = useState([]);
const [file,setFile] = useState(null);
const [preview,setPreview] = useState(null);
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchImages();
},[]);


// ================= FETCH IMAGES =================

const fetchImages = async () => {

try{

const res = await axios.get("http://localhost/shine-api/upload.php");

setImages(Array.isArray(res.data) ? res.data : []);

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};


// ================= FILE CHANGE =================

const onFileChange = (e) => {

const selected = e.target.files[0];

if(!selected) return;

setFile(selected);

setPreview(URL.createObjectURL(selected));

};


// ================= UPLOAD =================

const handleUpload = async () => {

if(!file) return alert("Select image");

if(!password) return alert("Enter admin password");

const formData = new FormData();

formData.append("image",file);
formData.append("password",password);

try{

await axios.post(
"http://localhost/shine-api/upload.php",
formData
);

alert("Uploaded Successfully");

setFile(null);
setPreview(null);

fetchImages();

}catch(err){

alert("Upload Failed");

}

};


// ================= DELETE =================

const handleDelete = async (id) => {

if(!password){
alert("Enter admin password");
return;
}

if(!window.confirm("Delete image?")) return;

try{

await axios.delete(
`http://localhost/shine-api/upload.php?id=${id}&password=${password}`
);

fetchImages();

}catch(err){

alert("Delete Failed");

}

};


return(

<div style={styles.container}>

<h1 style={styles.mainTitle}>
Shine Institute Gallery
</h1>

{isAdmin && (

<div style={styles.adminPanel}>

<h3>
<UploadCloud size={20}/> Add Image
</h3>

<input
type="password"
placeholder="Admin Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.password}
/>

<div style={styles.uploadFlex}>

<label style={styles.customUpload}>

<Plus size={24}/>

<input
type="file"
onChange={onFileChange}
style={{display:"none"}}
/>

</label>

{preview && (
<img
src={preview}
style={styles.previewImg}
alt="preview"
/>
)}

{file && (

<button
onClick={handleUpload}
style={styles.uploadBtn}
>

Upload

</button>

)}

</div>

</div>

)}

{loading && <p style={{textAlign:"center"}}>Loading images...</p>}

<div style={styles.grid}>

{images.map((img)=> (

<div
key={img.id}
style={styles.imageCard}
onMouseEnter={(e)=>{
e.currentTarget.querySelector(".overlay").style.opacity="1";
e.currentTarget.querySelector("img").style.transform="scale(1.1)";
}}
onMouseLeave={(e)=>{
e.currentTarget.querySelector(".overlay").style.opacity="0";
e.currentTarget.querySelector("img").style.transform="scale(1)";
}}
>

<img
src={`http://localhost/shine-api/${img.image_path}`}
style={styles.galleryImg}
alt=""
/>

<div className="overlay" style={styles.overlay}></div>

{isAdmin && (

<button
onClick={()=>handleDelete(img.id)}
style={styles.deleteBtn}
>

<Trash2 size={18}/>

</button>

)}

</div>

))}

</div>

</div>

);

};


const styles = {

container:{
padding:"40px",
background:"#f3f4f6",
minHeight:"100vh"
},

mainTitle:{
textAlign:"center",
marginBottom:"40px"
},

adminPanel:{
background:"white",
padding:"20px",
borderRadius:"10px",
marginBottom:"40px",
maxWidth:"500px",
margin:"auto"
},

password:{
width:"100%",
padding:"10px",
marginBottom:"15px"
},

uploadFlex:{
display:"flex",
gap:"15px",
alignItems:"center"
},

customUpload:{
width:"60px",
height:"60px",
border:"2px dashed blue",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
},

previewImg:{
width:"60px",
height:"60px",
objectFit:"cover"
},

uploadBtn:{
background:"blue",
color:"white",
border:"none",
padding:"10px 20px",
cursor:"pointer"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"20px"
},

imageCard:{
position:"relative",
height:"200px",
overflow:"hidden",
borderRadius:"10px",
cursor:"pointer"
},

galleryImg:{
width:"100%",
height:"100%",
objectFit:"cover",
transition:"0.4s"
},

overlay:{
position:"absolute",
top:"0",
left:"0",
width:"100%",
height:"100%",
background:"rgba(255,255,255,0.35)",
opacity:"0",
transition:"0.4s"
},

deleteBtn:{
position:"absolute",
top:"10px",
right:"10px",
background:"red",
color:"white",
border:"none",
padding:"8px",
cursor:"pointer",
zIndex:"2"
}

};

export default Gallery;
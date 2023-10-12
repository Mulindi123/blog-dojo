
import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home = () => {

    const [blogs, setBlogs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
       



    const handleDelete = (id) => {
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs);
        // console.log("blog deleted")
    }

    useEffect(() =>{
        fetch(" http://localhost:8000/blogs")
        .then(r => {
            if(!r.ok){
                throw Error("could not fetch data for that resource!")
            }    
            return r.json()})
        .then(data=>{ 
            setBlogs(data)
            setIsLoading(false)
            setError(null)
        })
        .catch(error=>{
            setIsLoading(false)
            setError(error.message)
        })
      
    },[]);


    return ( 
        <div className="home">
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {blogs && <BlogList blogs ={blogs} title="All Blogs!" onDelete={handleDelete}/> }
        </div>
     );
}
 
export default Home;
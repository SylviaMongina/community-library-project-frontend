import { useState } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
    title:"",
    author:"",
    summary:"",
    price:"",
    image:"",
    category:""
  };

  const ProjectForm = ({ onAddProject }) => {
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((formData) => ({ ...formData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...formData}),
        };

        fetch("http://localhost:3000/projects", configObj)
        .then((resp) => resp.json())
        .then((project) => {
          onAddProject(project);
          history.push("/books")
        });
    };
    return (
        <section>
          <form  className='form' autoComplete='off'
          onSubmit={handleSubmit} >
          <h3>Add New Book</h3>
          <label htmlFor="tilte">Title</label>
           <input 
           type="text"
            id="title" 
            name="title"
            onChange={handleChange}
            value={formData.title}
            />
    
          <label htmlFor="author">Author</label>
           <input 
           type="text" 
           id="author" 
           name="author"
           onChange={handleChange}
           value={formData.author}
           />
           
    
          <label htmlFor="summary">Summary</label>
           <textarea 
           id="summary" 
           name="summary"
           onChange={handleChange}
           value={formData.summary}
           ></textarea>
          
    
           <label htmlFor="category">Category</label>
           <select 
           name="category" 
           id="category"
           onChange={handleChange}
           value={formData.category}
           >
    
           <option>Select category</option>
           <option value="Non Fiction">Non Fiction</option>
           <option value="Fiction">Fiction</option>
           <option value="Christian Books">Christian Books</option>
           <option value="Documentations and Reports">Documentations and Reports</option>
           <option value="Children stories">Children stories</option>
           <option value="CBC Books">CBC Books</option>
           <option value="Romance">Romance</option>
           
           <option value="TextBook">TextBook</option>
           </select>
    
    
           <lable htmlFor='image'>Image</lable>
            <input 
            type="text" 
            id="image" 
            name="image"
            onChange={handleChange}
            value={formData.image}
            />
    
            <label htmlFor="price">Price</label>
           <input 
           type="text" 
           id="price" 
           name="price"
           onChange={handleChange}
           value={formData.price}
           
           />
           
    
            <button type="submit">Add Book</button>
          </form>
        </section>
      );
    };
    
    export default ProjectForm;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    // fetch the 3 most recently added projects from json-server
    fetch("http://localhost:3000/projects?_sort=id&_order=desc&_limit=3")
      .then((r) => r.json())
      .then((recentProjects) => {
        setRecentProjects(recentProjects);
      });
  }, []);

  return (
    <section className="box">
      <h2 style={{ fontSize: "2rem" }}>Welcome .</h2>
    
      <h3>Recently Added Book:</h3>
      {recentProjects.map((project) => (
        <p key={project.id}>{project.name}</p>
      ))}
      <div style={{ margin: "1rem 0" }}>
        <Link className="button" to="/books">
          View All Books
        </Link>
      </div>
     
     <section>
     <h2>Our Services</h2>
     <h3> Upendo Community Library offers the following services for free:</h3>
     <ol>
      <li> Library services </li>
      <li>Career and business mentorship</li>
      <li>Arts and sports mentorship</li>
      <li>Social work support</li>
     </ol>
     </section>
      <section>
        <h1>CONTACT US</h1>
        
      </section>


    </section>
  
  );
};

export default Home;
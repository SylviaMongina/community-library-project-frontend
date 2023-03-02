import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectListItem = ({
    project,
    onProjectEdit,
    onProjectDelete,
  }) => {
    const { id, image, title, summary, author,price, category } = project;

  
    const handleEditClick = () => {
      onProjectEdit(project);
    };
  
    const handleDeleteClick = () => {
      onProjectDelete(id)
      fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE"
      })
    };
  
    return (
      <li className="card">
        <Link to={`/books/${id}`}>
          <figure className="image">
            <img src={image} alt={title} />
          </figure>
        </Link>
  
        <section className="details">
          <h4>{title}</h4>
          <p>{summary}</p>
          <p >Author: {author}</p>
          <p>Price: {price}</p>
        </section>
  
        <footer className="extra">
          <span className="badge blue">{category}</span>
          <div className="manage">
            <Link className="button" to={`/books/${id}/edit`}>
              <FaPencilAlt onClick={handleEditClick} />
            </Link>
            <button onClick={handleDeleteClick}>
              <FaTrash />
            </button>
          </div>
        </footer>
      </li>
    );
  };
  
  export default ProjectListItem;
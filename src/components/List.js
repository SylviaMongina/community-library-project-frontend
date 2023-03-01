import ListItem from "./ListItem";
import { useState, useEffect } from "react";
import {useHistory, useParams, useRouteMatch, useLocation } from "react-router-dom";

const List = ({
  projects,
  onProjectEdit,
  onProjectDelete,
  setSelectedCategory,
  setSearchQuery
}) => {
  
  const [searchInputText, setSearchInputText] = useState("");
  const { category } = useParams();
  // useLocation provides access to query parameters as search
  const { search } = useLocation();
  // useHistory gives access to the history object so we can update the url
  const history = useHistory();
  // useRouteMatch used to access the url without any query parameters
  const { url } = useRouteMatch(); 

  
  console.log('useLocation() search', search);
  console.log('useRouteMatch url', url);


  const projectItems = projects.map((project) => {
    return (
      <ProjectListItem
        key={project.id}
        project={project}
        onProjectEdit={onProjectEdit}
        onProjectDelete={onProjectDelete}
      />
    );
  });

  const handleOnChange = (e) => setSearchInputText(e.target.value);

  useEffect(() => {
    const scheduledUpdate = setTimeout(() => {
      setSearchQuery(searchInputText);

      if (searchInputText) {
        history.push(`${url}?${new URLSearchParams({q: encodeURI(searchInputText)}).toString()}`)
      } else {
        history.push(`${url}`)
      }
    }, 300)
    
    return () => {
      clearTimeout(scheduledUpdate);
    }
  }, [setSearchQuery, searchInputText, history, url])

  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory])

  useEffect(() => {

    setSearchInputText(new URLSearchParams(search).get('q'))
  }, [search])


  return (
    <section>
      <h2>Books</h2>

      <input type="text" placeholder="Search..." onChange={handleOnChange} value={searchInputText} />

      <ul className="cards">{projectItems}</ul>
    </section>
  );
};

export default List;
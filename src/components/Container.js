import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Form from "./Form";
import List from "./List";
import EditForm from "./EditForm";


function Container() {
    const [projects, setProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let url;
        if (selectedCategory && searchQuery) {
          url = `http://localhost:4000/projects?phase=${selectedCategory}&q=${encodeURI(searchQuery)}`;
        } else if (searchQuery) {
          url = `http://localhost:4000/projects?q=${encodeURI(searchQuery)}`;
        } else if (selectedCategory) {
          url = `http://localhost:4000/projects?category=${selectedCategory}`;
        } else {
          url = "http://localhost:4000/projects";
        }
        fetch(url)
          .then((resp) => resp.json())
          .then((projects) => setProjects(projects));
      }, [selectedCategory, searchQuery]);

      const onAddProject = (newProj) => {
        setProjects((projects) => [...projects, newProj]);
      };
    
      const onUpdateProject = (updatedProject) => {
        setProjects(projects => projects.map(originalProject => {
          if (originalProject.id === updatedProject.id) {
            return updatedProject;
          } else {
            return originalProject;
          }
        }))
      };
    
      const onProjectDelete = (projectId) => {
        setProjects(projects => projects.filter(p => p.id !== projectId))
      };

      return (
        <>
          <Switch>
            <Route path="/books/:id/edit">
              <EditForm
                onUpdateProject={onUpdateProject}
              />
            </Route>
            <Route path="/books/new">
              <Form onAddProject={onAddProject} />
            </Route>
            <Route exact path="/books/:id">
            </Route>
             <Route path="/books/category/:category">
              <List
                projects={projects}
                onProjectDelete={onProjectDelete}
                setSelectedCategory={setSelectedCategory}
                setSearchQuery={setSearchQuery}
                />
            </Route>
            <Route path="/books">
              <List
                projects={projects}
                onProjectDelete={onProjectDelete}
                setSelectedCategory={setSelectedCategory}
                setSearchQuery={setSearchQuery}
                />
            </Route>
          </Switch>
        </>
      )
    }
    
    export default Container;
import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [newMovie, setNewMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const onChangeHandler = evt => {
    evt.target.name !== "stars"
      ? setNewMovie({
          ...newMovie,
          [evt.target.name]: evt.target.value
        })
      : setNewMovie({
          ...newMovie,
          stars: [evt.target.value]
        });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("post NewMovie", newMovie);
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title: </label>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={onChangeHandler}
        placeholder="Title"
        required
      />
      <label>Director: </label>
      <input
        type="text"
        name="director"
        value={newMovie.director}
        onChange={onChangeHandler}
        placeholder="Director"
        required
      />
      <label>Metascore: </label>
      <input
        type="text"
        name="metascore"
        value={newMovie.metascore}
        onChange={onChangeHandler}
        placeholder="Metascore"
        required
      />
      <label>Stars: </label>
      <input
        type="text"
        name="stars"
        value={newMovie.stars}
        onChange={onChangeHandler}
        placeholder="Stars"
      />
      <button type="submit">Add Movie!</button>
    </form>
  );
};

export default AddMovie;

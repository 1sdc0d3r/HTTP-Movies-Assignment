import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [values, setValues] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log("updateMovie", res.data);
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onChangeHandler = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, values)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err));
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title: </label>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={onChangeHandler}
        placeholder="Title"
        required
      />
      <label>Director: </label>
      <input
        type="text"
        name="director"
        value={values.director}
        onChange={onChangeHandler}
        placeholder="Director"
        required
      />
      <label>Metascore: </label>
      <input
        type="text"
        name="metascore"
        value={values.metascore}
        onChange={onChangeHandler}
        placeholder="Metascore"
        required
      />
      <label>Stars: </label>
      <input
        type="text"
        name="stars"
        value={values.stars}
        onChange={onChangeHandler}
        placeholder="Stars"
      />
      <button type="submit">Update Movie!</button>
    </form>
  );
};

export default UpdateMovie;

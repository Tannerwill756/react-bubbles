import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [newColor, setNewColor] = useState(initialColor);
  const { push } = useHistory();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log("put request for color", res);
        refreshPage();
        setEditing(false);
        push("/protected");
      })
      .catch((err) => console.log("error from update colorlist", err));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        refreshPage();
      })
      .catch((err) => console.log("error deleting color", err));
  };

  // const handleColorChange = (e) => {
  //   setNewColor({
  //     ...newColor,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleHexChange = (e) => {
  //   setNewColor({
  //     ...newColor,
  //     code: { hex: e.target.value },
  //   });
  // };

  // const addColor = (e) => {
  //   axiosWithAuth()
  //     .post("/api/colors", newColor)
  //     .then((res) => console.log(res));
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      {/* <form onSubmit={addColor}>
        <label>Color name: </label>
        <input type="text" name="color" value={handleColorChange} />

        <label>Hex Code: </label>
        <input type="text" name="hex" value={handleHexChange} />

        <button>add color</button>
      </form> */}
    </div>
  );
};

export default ColorList;

import React, { useState, useEffect } from "react";

function App() {
  const [colorName, setColorName] = useState("");
  const [color, setColor] = useState("");
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const storedColors = localStorage.getItem("colors");
    if (storedColors) {
      setColorList(JSON.parse(storedColors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colorList));
  }, [colorList]);

  const handleChangeName = (event) => {
    setColorName(event.target.value);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleAddColor = () => {
    if (colorName && color) {
      setColorList([...colorList, { name: colorName, color: color }]);
      setColorName("");
      setColor("");
    }
  };

  const handleDeleteColor = (index) => {
    const updatedColorList = [...colorList];
    updatedColorList.splice(index, 1);
    setColorList(updatedColorList);
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header">
          <h4>Administrar colores</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div
                className="color-picker"
                style={{ backgroundColor: color }}
              ></div>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Ingrese un nombre"
                value={colorName}
                onChange={handleChangeName}
              />
              <input
                type="color"
                className="form-control mt-3"
                value={color}
                onChange={handleChangeColor}
              />
              <button className="btn btn-primary mt-3" onClick={handleAddColor}>
                Guardar
              </button>
            </div>
            <div className="col-md-8">
              {colorList.map((color, index) => (
                <div className="card mb-3" key={index}>
                  <div className="card-header">{color.name}</div>
                  <div
                    className="card-body"
                    style={{ backgroundColor: color.color }}
                  ></div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteColor(index)}
                  >
                    Borrar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

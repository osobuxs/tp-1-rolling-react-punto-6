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

  const handleChangeColorName = (event) => {
    const value = event.target.value.slice(0, 15);
    setColorName(value);
  };
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleAddColor = () => {
    if (colorName.length >= 2 && colorName.length <= 15 && color) {
      const newColor = {
        name: colorName,
        color: color,
      };
      setColorList([...colorList, newColor]);
      setColorName("");
      setColor("");
    } else if (colorName.length < 2) {
      alert("El nombre del color debe tener al menos 2 caracteres");
    } else if (colorName.length > 15) {
      alert("El nombre del color debe tener como máximo 15 caracteres");
    } else {
      alert("Por favor, ingrese un nombre y seleccione un color");
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
              <h5>Elegí tu color</h5>
              <input
                type="color"
                className="form-control mt-3"
                value={color}
                onChange={handleChangeColor}
                style={{ height: 200, width: 200 }}
              />
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese un nombre para su color"
                  value={colorName}
                  onChange={handleChangeColorName}
                  maxLength={15}
                  required
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddColor}
                  disabled={!color}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body color-list row ">
          {colorList.map((color, index) => (
            <div className="card color-card col-md-2" key={index}>
              <div
                className="color-box"
                style={{ backgroundColor: color.color }}
              ></div>
              <div className="card-body text-center">
                <h5 className="card-title">{color.name}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteColor(index)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

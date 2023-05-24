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
    setColorName(event.target.value);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleAddColor = () => {
    if (color) {
      const newColor = {
        name: colorName,
        color: color,
      };
      setColorList([...colorList, newColor]);
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
              <h5>Elegí tu color</h5>
              <div
                className="color-picker"
                style={{ backgroundColor: color }}
              ></div>
              <input
                type="color"
                className="form-control mt-3"
                value={color}
                onChange={handleChangeColor}
              />
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese un nombre"
                  value={colorName}
                  onChange={handleChangeColorName}
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
            <div className="col-md-8">
              {colorList.map((color, index) => (
                <div className="color-item" key={index}>
                  <div
                    className="color-box"
                    style={{ backgroundColor: color.color }}
                  ></div>
                  <div className="color-name">{color.name}</div>
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

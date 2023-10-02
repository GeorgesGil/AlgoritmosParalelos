import { useState } from "react";
import {TextField, Typography, Button, Box} from "@mui/material";
import {
  binariaBusqueda,
  burbujaOrdenamiento,
  insercionOrdenamiento,
  quickSort,
  secuencialBusqueda,
} from "./ordenamiento";

export const App = () => {
  const [arraySize, setArraySize] = useState(100000);
  const [valorObjetivo, setValorObjetivo] = useState(null);
  const [resultados, setResultados] = useState({
    secuencial: "",
    binaria: "",
    burbuja: "",
    quickSort: "",
    insercion: "",
  });

  const [tiempo, setTiempo] = useState({
    secuencial: 0,
    binaria: 0,
    burbuja: 0,
    quickSort: 0,
    insercion: 0,
  });

  const ordenarBuscar = async () => {
    if (!valorObjetivo || valorObjetivo <= 0) {
      alert("Por favor, ingrese un valor objetivo.");
      return;
    }
  
    const randomArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 10000)
    );
    console.log("array: ", randomArray);
    const binaArra = [...randomArray];
    binaArra.sort((a, b) => a - b);
    console.log("binara despues: ", binaArra);
  
    try {
      const [
        secuencialResult,
        binariaResult,
        burbujaResult,
        quickSortResult,
        insercionResult,
      ] = await Promise.all([
        secuencialBusqueda(randomArray, valorObjetivo),
        binariaBusqueda(binaArra, valorObjetivo),
        burbujaOrdenamiento([...randomArray]),
        quickSort([...randomArray]),
        insercionOrdenamiento([...randomArray]),
      ]);
  
      setResultados({
        secuencial: Array.isArray(secuencialResult)
          ? secuencialResult.join(", ")
          : JSON.stringify(secuencialResult.index),
        binaria: Array.isArray(binariaResult)
          ? binariaResult.join(", ")
          : JSON.stringify(binariaResult.index),
        burbuja: Array.isArray(burbujaResult.sortedArray)
          ? burbujaResult.sortedArray.join(", ")
          : JSON.stringify(burbujaResult),
        quickSort: Array.isArray(quickSortResult.sortedArray)
          ? quickSortResult.sortedArray.join(", ")
          : JSON.stringify(quickSortResult),
        insercion: Array.isArray(insercionResult.sortedArray)
          ? insercionResult.sortedArray.join(", ")
          : JSON.stringify(insercionResult),
      });
  
      setTiempo({
        secuencial: secuencialResult.time,
        binaria: binariaResult.time,
        burbuja: burbujaResult.time,
        quickSort: quickSortResult.time,
        insercion: insercionResult.time,
      });
    } catch (error) {
      console.error("Error al ejecutar las búsquedas:", error);
    }
  };
  
  return (
    <>
    <Box className='orden'>
    <Box sx={{display:'flex' , justifyContent: 'center', alignItems: 'center'}}>
      <h1>Tarea #2 Alg.Paralelo - Georges Gil</h1>
    </Box>
    <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
      <TextField
        label="Tamaño del Arreglo"
        variant="outlined"
        value={isNaN(arraySize) ? "" : arraySize}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setArraySize(isNaN(value) ? "" : value);
        }}
        required
        sx={{ backgroundColor: "white", marginRight: 1 }}
        size="small"
      />
      <TextField
        label="Valor a Buscar"
        variant="outlined"
        value={valorObjetivo === null ? "" : valorObjetivo}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setValorObjetivo(isNaN(value) ? null : value);
        }}
        required
        type="number"
        sx={{ backgroundColor: "white", marginRight: 1 }}
        size="small"
      />
      <Button onClick={ordenarBuscar} variant="contained">
        Ejecutar
      </Button>
    </Box>
      <Box
        className="result-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="result-item"
          sx={{
            width: "calc(33.33% - 16px)",
            margin: "8px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Secuencial:</h3>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={resultados.secuencial}
            sx={{
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <Typography variant="body2">
            Tiempo: {tiempo.secuencial.toFixed(2)} ms
          </Typography>
        </Box>
        <Box
          className="result-item"
          sx={{
            width: "calc(33.33% - 16px)",
            margin: "8px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Binaria:</h3>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={resultados.binaria}
            sx={{
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <Typography variant="body2">
            Tiempo: {tiempo.binaria.toFixed(2)} ms
          </Typography>
        </Box>
        <Box
          className="result-item"
          sx={{
            width: "calc(33.33% - 16px)",
            margin: "8px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Burbuja:</h3>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={resultados.burbuja}
            sx={{
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <Typography variant="body2">
            Tiempo: {tiempo.burbuja.toFixed(2)} ms
          </Typography>
        </Box>
        <Box
          className="result-item"
          sx={{
            width: "calc(33.33% - 16px)",
            margin: "8px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>QuickSort:</h3>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={resultados.quickSort}
            sx={{
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <Typography variant="body2">
            Tiempo: {tiempo.quickSort.toFixed(2)} ms
          </Typography>
        </Box>
        <Box
          className="result-item"
          sx={{
            width: "calc(33.33% - 16px)",
            margin: "8px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>Inserción:</h3>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={resultados.insercion}
            sx={{
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <Typography variant="body2">
            Tiempo: {tiempo.insercion.toFixed(2)} ms
          </Typography>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default App;

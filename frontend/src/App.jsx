import { useState } from "react";
import Toolbar from './components/Toolbar.jsx';
import Canvas from './components/Canvas.jsx';
import useCanvas from "./hooks/useCanvas.js";
import "./index.css";

function App() {

    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState("#000000");
    const {
        canvasRef,
        startDrawing,
        stopDrawing,
        draw,
        clearCanvas,
        saveCanvas,
        searchSketch
    } = useCanvas(brushSize, brushColor);

    return (
        <div className="app">
        <h1>ECHOO</h1>

        <Toolbar
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            brushColor={brushColor}
            setBrushColor={setBrushColor}
            clearCanvas={clearCanvas}
            saveCanvas={saveCanvas}
            searchSketch={searchSketch}
        />
        <Canvas
            canvasRef={canvasRef}
            startDrawing={startDrawing}
            stopDrawing={stopDrawing}
            draw={draw}
        />
        
        </div>
    )
}

export default App
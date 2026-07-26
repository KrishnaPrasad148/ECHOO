function Toolbar({
    brushSize,
    setBrushSize,
    brushColor,
    setBrushColor,
    clearCanvas,
    saveCanvas
})
{
    return(
        <div className="toolbar">
            <label>Brush Size</label>

            <input
                type="range"
                min="1"
                max="30"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
            />

            <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
            />

            <button onClick={clearCanvas}>
                Clear Canvas
            </button>

            <button onClick={saveCanvas}>
                Save Sketch
            </button>
        </div>
    );
}

export default Toolbar;
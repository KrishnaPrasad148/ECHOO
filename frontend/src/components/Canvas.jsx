function Canvas({
    canvasRef,
    startDrawing,
    stopDrawing,
    draw
})
{
    return(
        <canvas
            ref={canvasRef}
            width={900}
            height={500}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
        ></canvas>
    );
}

export default Canvas;
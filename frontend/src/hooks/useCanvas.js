import { useRef, useState } from "react";

function useCanvas(brushSize, brushColor){

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPosition = useRef({
        x:0,
        y:0
    });

    function startDrawing(e) 
    {
        console.log("Mouse Down");
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const context = canvas.getContext("2d");

        context.beginPath();
        context.moveTo(x, y);

        lastPosition.current = {
            x: x,
            y: y
        };
        setIsDrawing(true);
    }

    function stopDrawing()
    {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.closePath();
    }

    function draw(e) 
    {
        if (!isDrawing) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        context.lineWidth = brushSize;
        context.strokeStyle = brushColor;
        context.lineCap = "round";

        context.beginPath();

        context.moveTo(
            lastPosition.current.x,
            lastPosition.current.y
        );

        context.lineTo(x, y);
        context.stroke();
        lastPosition.current = {
            x: x,
            y: y
        };

        console.log("X:", x, "Y:", y);
    }

    function clearCanvas() 
    {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveCanvas() 
    {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");

        link.href = image;
        link.download = "sketch.png";
        link.click();
    }

    async function searchSketch() {
        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append(
                "image",
                blob,
                "sketch.png"
            );
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/search",
                    {
                        method: "POST",
                        body: formData
                    }
                );
                const data = await response.json();
                console.log(data);
            } 
            catch (error) {
                console.error(error);
            }
        }, "image/png");
    }

    return {
        canvasRef,
        startDrawing,
        stopDrawing,
        draw,
        clearCanvas,
        saveCanvas,
        searchSketch
    }
}

export default useCanvas;
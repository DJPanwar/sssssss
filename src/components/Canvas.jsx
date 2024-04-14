import { useState, useRef } from "react";
import { useOnDraw } from "./Hooks";
import Color from "./Color";


const Canvas = ({ width, height }) => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [eraserSize, setEraserSize] = useState(5);
  const canvasRef = useRef(null);

  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    if (currentColor === "#ffffff") {
      drawLine(prevPoint, point, ctx, currentColor, eraserSize * 2);
    } else {
      drawLine(prevPoint, point, ctx, currentColor, 5);
    }
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    if (color !== "#ffffff") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  const drawCircle = (ctx) => {
    let isDrawing = false;
    let startX, startY;

    canvasRef.current.style.cursor = "crosshair";

    canvasRef.current.addEventListener("mousedown", (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });

    canvasRef.current.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const endX = e.offsetX;
      const endY = e.offsetY;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawCircleShape(ctx, startX, startY, endX, endY, true);
    });

    canvasRef.current.addEventListener("mouseup", () => {
      isDrawing = false;
      canvasRef.current.style.cursor = "default";
    });
  };

  const drawTriangle = (ctx) => {
    let isDrawing = false;
    let startX, startY;

    canvasRef.current.style.cursor = "crosshair";

    canvasRef.current.addEventListener("mousedown", (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });

    canvasRef.current.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const endX = e.offsetX;
      const endY = e.offsetY;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawTriangleShape(ctx, startX, startY, endX, endY, true);
    });

    canvasRef.current.addEventListener("mouseup", () => {
      isDrawing = false;
      canvasRef.current.style.cursor = "default";
    });
  };

  const drawCircleShape = (ctx, startX, startY, endX, endY, fillColor) => {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    fillColor ? ctx.fill() : ctx.stroke();
  };

  const drawTriangleShape = (ctx, startX, startY, endX, endY, fillColor) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(2 * startX - endX, endY);
    ctx.closePath();
    fillColor ? ctx.fill() : ctx.stroke();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "canvas_drawing.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="flex">
        <Color  setCurrentColor={setCurrentColor} setEraserSize={setEraserSize} onClean={clearCanvas} onSave={saveCanvas}
        drawCircle={() => drawCircle(canvasRef.current.getContext("2d"))}
        drawTriangle={() => drawTriangle(canvasRef.current.getContext("2d"))}/>
        <canvas
          width={width}
          height={height}
          onMouseDown={onCanvasMouseDown}
          style={canvasStyle}
          ref={(canvas) => {
            setCanvasRef(canvas);
            canvasRef.current = canvas;
          }}
          className="bg-white rounded-xl mt-2 shadow-xl shadow-black mx-2 "
        />
      </div>
      
    </>
  );
};

const canvasStyle = {
  border: "1px solid white",
};

export default Canvas;

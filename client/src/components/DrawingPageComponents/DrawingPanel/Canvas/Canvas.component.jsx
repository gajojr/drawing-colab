import React, { useContext, useEffect, useRef, useState } from 'react';

import { Canvas } from './Canvas.styles.js';
import { SocketContext } from '../../../../context/socket';

const DrawingCanvas = () => {
    const socket = useContext(SocketContext);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        const width = document.getElementById('canvas').offsetWidth;
        const height = document.getElementById('canvas').offsetHeight;

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;

        socket.on('canvas-data', data => {
            const image = new Image();
            image.onload = () => context.drawImage(image, 0, 0);
            image.src = data;
        });

        socket.on('clear-canvas', () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const currentColor = document.getElementById('currentColor').innerText.replace('Current pick: ', '');
        const currentBrushSize = document.getElementById('brush_size').value;
        contextRef.current.strokeStyle = currentColor;
        contextRef.current.lineWidth = currentBrushSize;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);

        const canvas = document.getElementById('canvas');
        const base64ImageData = canvas.toDataURL('image/png');
        socket.emit('canvas-data', base64ImageData);
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    return (
        <Canvas
            id='canvas'
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        ></Canvas>
    )
}

export default DrawingCanvas;

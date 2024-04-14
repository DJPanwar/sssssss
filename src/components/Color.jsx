import React from 'react';
import Square from '../assets/Square.webp'
import Circle from '../assets/Circle.webp'
import Rectangle from '../assets/Rectangle.webp'
import Triangle from '../assets/triangle.webp'
import Pencil from '../assets/pencil.webp'
import Eraser from '../assets/Eraser.webp'

function Color({ setCurrentColor, setEraserSize, onClean, onSave, drawCircle,
drawTriangle,}) {
  const handleClean = () => {
    onClean();
  };
  const handleSave = () => {
    onSave();
  };
  
  const handlePencilSelect = () => {
    setCurrentColor('#000000'); // Set pencil color to black
    setEraserSize(2); // Set line width for pencil
  };

  const handleEraserSelect=() => {
    setCurrentColor('#ffffff'); 
    setEraserSize(40); 
  }

  const handleCircle=()=>{
    drawCircle();
  }
  return (
  
    <div className='border bg-white w-fit p-2 rounded-xl shadow-sm shadow-black'>
      <div className='flex justify-start font-semibold m-2'>Colors</div>
      <div className='flex'>
        <ColorOption color='#000000' label='Black' setCurrentColor={setCurrentColor} />
        <ColorOption color='#ff0000' label='Red' setCurrentColor={setCurrentColor} />
        <ColorOption color='#ffff00' label='Yellow' setCurrentColor={setCurrentColor} />
        <ColorOption color='#00ff00' label='Green' setCurrentColor={setCurrentColor} />
        <ColorOption color='#0000ff' label='Blue' setCurrentColor={setCurrentColor} />
        <ColorOption color='#FFA500' label='Orange' setCurrentColor={setCurrentColor} />
      </div>

      <div className='m-2 mt-4'>
        <div className='flex justify-start font-semibold'>Shapes</div>
        <div className='flex m-2'><img src={Square} className='w-8 h-8'></img><button className='mx-3'>Square</button></div>
        <div className='flex m-2'onClick={handleCircle}> <img src={Circle} className='w-8 h-8'></img><button className='mx-3'>Circle</button></div>
        <div className='flex m-2'> <img src={Rectangle} className='w-8 h-8'></img><button className='mx-3'>Rectangle</button></div>
        <div className='flex m-2' onClick={drawTriangle}> <img src={Triangle} className='w-8 h-8'></img><button className='mx-3'>Triangle</button></div>
      </div>

      <div className='m-2 mt-4'>
        <div className='flex justify-start font-semibold'>Other</div>
        <div className='flex m-2'onClick={handlePencilSelect}><img src={Pencil} className='w-8 h-8'></img><p className='mx-3'>Pencil</p></div> 
        <div className='flex m-2'onClick={handleEraserSelect}><img src={Eraser} className='w-8 h-8'></img><p className='mx-3'>Eraser</p></div>
      </div>

      <div className='flex'>
        <div className='border border-[#153A70] w-20 h-18 p-2 m-4 bg-[#153A70] text-white text-center shadow-sm shadow-black'>
          <button className='font-bold' onClick={handleClean}>Clean</button>
        </div>
        <div className='border border-green-500 w-20 h-18 p-2 m-4 bg-green-500 text-white text-center shadow-sm shadow-black'>
          <button className='font-bold' onClick={handleSave}>Save</button>
        </div>
      </div>
    </div >
  );
}

function ColorOption({ color, label, setCurrentColor }) {
  return (
    <>
      <div className='color-option' onClick={() => setCurrentColor(color)}>
        <div className='border w-8 h-8 rounded-2xl m-3' style={{ backgroundColor: color }}></div>
        <p className='text-center text-xs'>{label}</p>
      </div>
    </>
  );
}

export default Color;
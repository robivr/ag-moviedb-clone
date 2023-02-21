import { useRef, useEffect } from 'react';

const Rating = ({ progress }: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    let amountLoaded = progress;
    const start = 4.72;
    let diff = (amountLoaded / 100) * Math.PI * 2;
    const cw = ctx.canvas.width / 2;
    const ch = ctx.canvas.height / 2;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();

    ctx.arc(cw, ch, 45, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#b3cf3c';
    ctx.textAlign = 'center';
    ctx.font = '24pt Verdana';
    ctx.lineWidth = 5;
    ctx.beginPath();

    ctx.arc(cw, ch, 41, start, diff + start, false);
    ctx.stroke();
    ctx.fillText(amountLoaded + '', cw - 8, ch + 10);
    ctx.font = '12pt Verdana';
    ctx.fillText('%', cw + 20, ch - 3);
    ctx.closePath();
  }, [progress]);

  return (
    <>
      <canvas
        className="rating-canvas"
        ref={canvasRef}
        width="110"
        height="110"
      ></canvas>
    </>
  );
};

export default Rating;

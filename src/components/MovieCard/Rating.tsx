import { useRef, useEffect } from 'react';

interface RatingProps {
  progress: number;
}

const ratingColors = {
  green: '#21cc77',
  yellow: '#c3c62e',
  red: '#df1d1d',
  notRated: '#666666',
};

const Rating = ({ progress }: RatingProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    let amountLoaded = progress;
    const start = 4.72;
    let diff = (amountLoaded / 100) * Math.PI * 2;
    const cw = ctx.canvas.width / 2;
    const ch = ctx.canvas.height / 2;

    let color;

    if (progress === 0) {
      color = ratingColors.notRated;
    }
    if (progress > 0) {
      color = ratingColors.red;
    }
    if (progress > 50) {
      color = ratingColors.yellow;
    }
    if (progress > 70) {
      color = ratingColors.green;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();

    ctx.arc(cw, ch, 45, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = color;
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

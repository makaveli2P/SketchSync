export const handleMove = (move: Move, ctx: CanvasRenderingContext2D) => {
  const { options, path } = move;

  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.lineColor;

  if (move.eraser) ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  path.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.closePath();

  ctx.globalCompositeOperation = "source-over";
};

// export const drawBackground = (ctx: CanvasRenderingContext2D) => {
//   ctx.lineWidth = 1;
//   ctx.fillStyle = "#ccc"; // Color for the dots

//   // Set the spacing for the dots
//   const dotSpacing = 50;
//   const dotRadius = 1.5; // Radius of the dots

//   for (let y = 0; y < ctx.canvas.height; y += dotSpacing) {
//     for (let x = 0; x < ctx.canvas.width; x += dotSpacing) {
//       ctx.beginPath();
//       ctx.arc(x, y, dotRadius, 0, 2 * Math.PI); // Draws a small circle (dot)
//       ctx.fill();
//     }
//   }
// };

// export const drawBackground = (ctx: CanvasRenderingContext2D) => {
//   ctx.lineWidth = 1;
//   ctx.strokeStyle = "#ccc";

//   for (let i = 0; i < CANVAS_SIZE.height; i += 50) {
//     ctx.beginPath();
//     ctx.moveTo(0, i);
//     ctx.lineTo(ctx.canvas.width, i);
//     ctx.stroke();
//   }

//   for (let i = 0; i < CANVAS_SIZE.width; i += 50) {
//     ctx.beginPath();
//     ctx.moveTo(i, 0);
//     ctx.lineTo(i, ctx.canvas.height);
//     ctx.stroke();
//   }
// };

export const drawAllMoves = (
  ctx: CanvasRenderingContext2D,
  room: ClientRoom
) => {
  const { usersMoves, movesWithoutUser, myMoves } = room;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const moves = [...movesWithoutUser, ...myMoves];

  usersMoves.forEach((userMoves) => {
    moves.push(...userMoves);
  });

  moves.sort((a, b) => a.timestamp - b.timestamp);
  moves.forEach((move) => {
    handleMove(move, ctx);
  });
};

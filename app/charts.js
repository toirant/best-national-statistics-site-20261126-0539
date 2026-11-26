// Canvas charts for NaijaStats. No libraries, no network: every chart is
// drawn with the 2D canvas API from the data in data.js, so the site works
// offline and the first load stays small. Each function draws into a
// <canvas> that already has its CSS size; the canvas is scaled for sharp
// text on high-density screens, and a text table of the same values sits
// beside it for readers who cannot see the chart.

const GREEN = '#0b6e3f';
const GREEN_LIGHT = '#2fa866';
const SAND = '#c98a2e';
const INK = '#17301f';
const GRID = '#dfe7de';
const MUTED = '#5d6f61';

// Size a canvas to its displayed box, scaled by the device pixel ratio.
function setup(canvas) {
  const box = canvas.getBoundingClientRect();
  const width = Math.max(240, Math.round(box.width));
  const height = Math.max(180, Math.round(box.height));
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

function niceMax(value) {
  const power = 10 ** Math.floor(Math.log10(value));
  const scaled = value / power;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 3 ? 3 : scaled <= 4 ? 4 : scaled <= 5 ? 5 : scaled <= 6 ? 6 : scaled <= 8 ? 8 : 10;
  return nice * power;
}

function drawAxes(ctx, plot, max, ticks, format) {
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const tick of ticks) {
    const y = plot.top + (plot.height * (1 - tick / max));
    ctx.beginPath();
    ctx.moveTo(plot.left, y);
    ctx.lineTo(plot.left + plot.width, y);
    ctx.stroke();
    ctx.fillText(format(tick), plot.left - 8, y);
  }
  ctx.strokeStyle = '#b9c6ba';
  ctx.beginPath();
  ctx.moveTo(plot.left, plot.top + plot.height);
  ctx.lineTo(plot.left + plot.width, plot.top + plot.height);
  ctx.stroke();
}

function xLabels(ctx, plot, points) {
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textBaseline = 'top';
  // Step the labels so they never collide: a narrow plot (a phone) needs a
  // wider step than a desktop one. The last year is drawn only when it has
  // a full step of room from the previous label drawn.
  const step = points.length > 8 ? 2 : 1;
  let lastDrawn = -step;
  points.forEach((point, i) => {
    const isLast = i === points.length - 1;
    if (i % step !== 0 && !isLast) return;
    if (isLast && i % step !== 0 && i - lastDrawn < step) return;
    const x = plot.left + (plot.width * i) / (points.length - 1);
    // Keep the first and last labels inside the canvas instead of letting
    // half of each run off the edge.
    ctx.textAlign = i === 0 ? 'left' : isLast ? 'right' : 'center';
    ctx.fillText(String(point.year), x, plot.top + plot.height + 8);
    lastDrawn = i;
  });
}

// A line chart with points and value labels on the first and last points.
export function lineChart(canvas, series, options) {
  const { ctx, width, height } = setup(canvas);
  const plot = { left: 56, top: 14, width: width - 66, height: height - 44 };
  const max = niceMax(Math.max(...series.map((p) => p.value)) * 1.08);
  const ticks = [0, max / 2, max];
  drawAxes(ctx, plot, max, ticks, (v) => options.format(v));
  const point = (i, value) => ({
    x: plot.left + (plot.width * i) / (series.length - 1),
    y: plot.top + (plot.height * (1 - value / max)),
  });
  ctx.beginPath();
  series.forEach((p, i) => {
    const { x, y } = point(i, p.value);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = options.color || GREEN;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = options.color || GREEN;
  series.forEach((p, i) => {
    const { x, y } = point(i, p.value);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = '600 12px system-ui, sans-serif';
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  const first = point(0, series[0].value);
  const last = point(series.length - 1, series[series.length - 1].value);
  ctx.fillText(options.format(series[0].value), first.x + 14, first.y - 4);
  ctx.fillText(options.format(series[series.length - 1].value), last.x - 14, last.y - 4);
  xLabels(ctx, plot, series);
}

// A vertical bar chart. `highlightLast` colours the final bar gold so the
// latest year stands out.
export function barChart(canvas, series, options) {
  const { ctx, width, height } = setup(canvas);
  const plot = { left: 56, top: 14, width: width - 66, height: height - 44 };
  const max = niceMax(Math.max(...series.map((p) => p.value)) * 1.1);
  const ticks = [0, max / 2, max];
  drawAxes(ctx, plot, max, ticks, (v) => options.format(v));
  const slot = plot.width / series.length;
  const barWidth = Math.min(46, slot * 0.62);
  series.forEach((p, i) => {
    const barHeight = (plot.height * p.value) / max;
    const x = plot.left + (slot * i) + ((slot - barWidth) / 2);
    const y = plot.top + plot.height - barHeight;
    ctx.fillStyle = options.highlightLast && i === series.length - 1 ? SAND : GREEN;
    ctx.fillRect(x, y, barWidth, barHeight);
    if (options.showValues) {
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = INK;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(options.format(p.value), x + barWidth / 2, y - 3);
    }
  });
  xLabels(ctx, plot, series);
}

// A population pyramid: one horizontal bar per age group, centred on the
// middle line, labelled with the group's share of the population.
export function pyramid(canvas, groups) {
  const { ctx, width, height } = setup(canvas);
  const max = niceMax(Math.max(...groups.map((g) => g.share)));
  const top = 8;
  const rowHeight = (height - top - 24) / groups.length;
  const centre = width / 2;
  const half = (width - 110) / 2;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  groups.forEach((group, i) => {
    const y = top + (rowHeight * i) + (rowHeight / 2);
    const barWidth = (half * group.share) / max;
    ctx.fillStyle = i % 2 === 0 ? GREEN : GREEN_LIGHT;
    ctx.fillRect(centre - barWidth, y - (rowHeight * 0.32), barWidth, rowHeight * 0.64);
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'right';
    ctx.fillText(group.group, centre - half - 8, y);
    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    ctx.fillText(`${group.share.toFixed(1)}%`, centre + 6, y);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText('Share of population by age group, 2024', centre, height - 8);
}

// A donut chart with a centre label and a legend drawn under the canvas by
// the caller (the legend is plain HTML, so it stays readable).
export function donut(canvas, slices, centreLabel) {
  const { ctx, width, height } = setup(canvas);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 12;
  const inner = radius * 0.58;
  const colours = [GREEN, SAND, '#7fb069'];
  let angle = -Math.PI / 2;
  slices.forEach((slice, i) => {
    const sweep = (slice.share / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = colours[i % colours.length];
    ctx.fill();
    const mid = angle + sweep / 2;
    const labelX = cx + Math.cos(mid) * (radius + 16);
    const labelY = cy + Math.sin(mid) * (radius + 16);
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.fillStyle = INK;
    ctx.textAlign = labelX < cx ? 'right' : 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${slice.share}%`, labelX, labelY);
    angle += sweep;
  });
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.font = '600 13px system-ui, sans-serif';
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(centreLabel, cx, cy);
}

// Horizontal bars for the ten largest states, drawn from a sorted list.
export function stateBars(canvas, states) {
  const top = states.slice(0, 10);
  const { ctx, width, height } = setup(canvas);
  const max = niceMax(Math.max(...top.map((s) => s.pop)));
  const labelWidth = 86;
  const rowHeight = (height - 16) / top.length;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  top.forEach((state, i) => {
    const y = 8 + (rowHeight * i) + (rowHeight / 2);
    const barWidth = ((width - labelWidth - 52) * state.pop) / max;
    ctx.fillStyle = i === 0 ? SAND : GREEN;
    ctx.fillRect(labelWidth, y - (rowHeight * 0.3), barWidth, rowHeight * 0.6);
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(state.name, labelWidth - 8, y);
    ctx.textAlign = 'left';
    ctx.fillText(`${state.pop.toFixed(1)}m`, labelWidth + barWidth + 6, y);
  });
}

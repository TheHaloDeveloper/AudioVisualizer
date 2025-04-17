function gradient(partitions, index) {
    const start = {
        r: (STARTCOLOR >> 16) & 255,
        g: (STARTCOLOR >> 8) & 255,
        b: STARTCOLOR & 255,
    };

    const end = {
        r: (ENDCOLOR >> 16) & 255,
        g: (ENDCOLOR >> 8) & 255,
        b: ENDCOLOR & 255,
    };

  const t = (index - 1) / (partitions - 1);

  const r = Math.round(start.r + (end.r - start.r) * t);
  const g = Math.round(start.g + (end.g - start.g) * t);
  const b = Math.round(start.b + (end.b - start.b) * t);

  return (r << 16) | (g << 8) | b;
}
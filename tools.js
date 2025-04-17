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

function partitions(data, bands = PARTS) {
    const result = new Array(bands).fill(0);
    const maxIndex = data.length - 1;

    for (let i = 0; i < bands; i++) {
        const start = Math.floor(Math.pow(i / bands, 2) * maxIndex);
        const end = Math.floor(Math.pow((i + 1) / bands, 2) * maxIndex);
        let sum = 0;
        let count = 0;

        for (let j = start; j <= end; j++) {
            sum += data[j];
            count++;
        }

        result[i] = count > 0 ? sum / count : 0;
    }

    return result;
}
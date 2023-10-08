export const secuencialBusqueda = (arr, target) => {
  return new Promise((resolve) => {
    const start = performance.now();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        const end = performance.now();

        console.log(
          "Target: ",
          target,
          "Secuencial I: ",
          start.toFixed(2),
          "Secuencial F: ",
          end.toFixed(2),
          "Total: ",
          end.toFixed(2) - start.toFixed(2)
        );
        resolve({ index: i, time: end - start });
        return;
      }
    }
    const end = performance.now();
    resolve({ index: -1, time: end - start });
  });
};

export const binariaBusqueda = (arr, target) => {
  return new Promise((resolve) => {
    const start = performance.now();
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        const end = performance.now();
        console.log("mid: ", mid);
        console.log(
          "Binaria I: ",
          start.toFixed(2),
          "Binaria F: ",
          end.toFixed(2),
          "Total: ",
          end.toFixed(2) - start.toFixed(2)
        );
        resolve({ index: mid, time: end - start });
        return;
      }

      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    const end = performance.now();

    resolve({ index: -1, time: end - start });
  });
};

export const burbujaOrdenamiento = (arr) => {
  return new Promise((resolve) => {
    const start = performance.now();
    const len = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);

    const end = performance.now();
    console.log("Burbuja I: ", start.toFixed(2), "Burbuja F: ", end.toFixed(2));
    resolve({ sortedArray: arr, time: end - start });
  });
};

export const quickSort = (arr) => {
  return new Promise((resolve) => {
    const start = performance.now();

    const sort = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[0];
      const left = [];
      const right = [];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }

      return [...sort(left), pivot, ...sort(right)];
    };

    const sortedArray = sort([...arr]);
    const end = performance.now();
    console.log(
      "quickSort I: ",
      start.toFixed(2),
      "quickSort F: ",
      end.toFixed(2)
    );
    resolve({ sortedArray, time: end - start });
  });
};

export const insercionOrdenamiento = (arr) => {
  return new Promise((resolve) => {
    const start = performance.now();
    for (let i = 1; i < arr.length; i++) {
      let currentVal = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > currentVal) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = currentVal;
    }

    const end = performance.now();
    resolve({ sortedArray: arr, time: end - start });
  });
};

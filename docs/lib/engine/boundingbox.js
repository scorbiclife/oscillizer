const getBoundingBox = (cells) => {
  const addCellToBoundingBox = (box, [x, y]) => ({
    xmin: (x < box.xmin) ? x : box.xmin,
    xmax: (x > box.xmax) ? x : box.xmax,
    ymin: (y < box.ymin) ? y : box.ymin,
    ymax: (y > box.ymax) ? y : box.ymax,
  });

  const initialBox = {
    xmin: Infinity, ymin: Infinity, xmax: -Infinity, ymax: -Infinity,
  };

  return cells.reduce(addCellToBoundingBox, initialBox);
};

export default getBoundingBox;

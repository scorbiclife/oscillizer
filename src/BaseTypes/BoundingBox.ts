/**
 * A bounding box consists of min/max of the X/Y coordinates.
 * For an empty pattern the bounding box is `(Inf, Inf, -Inf, -Inf)`
 * because it's an identity in the addition below.
 */
class BoundingBox {
  /**
   * @param {number} xmin
   * @param {number} xmax
   * @param {number} ymin
   * @param {number} ymax
   */
  constructor(xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity) {
    /** @type {number} */ this.xmin = xmin;
    /** @type {number} */ this.xmax = xmax;
    /** @type {number} */ this.ymin = ymin;
    /** @type {number} */ this.ymax = ymax;
  }

  /**
   * Return a new bounding box that is the result of
   * merging `this` with the `other` bounding box.
   *
   * @param {BoundingBox} other - The other box to merge with.
   * @returns {BoundingBox} - The merged bounding box.
   */
  plus(other) {
    const xmin = Math.min(this.xmin, other.xmin);
    const xmax = Math.max(this.xmax, other.xmax);
    const ymin = Math.min(this.ymin, other.ymin);
    const ymax = Math.max(this.ymax, other.ymax);
    return new BoundingBox(xmin, xmax, ymin, ymax);
  }

  /**
   * Given an array of bounding boxes, merge all of them and return the merged box.
   *
   * @param  {Array<BoundingBox>} boxes - The boxes to merge.
   * @returns {BoundingBox} - The merged bounding box.
   */
  static sum(boxes) {
    return boxes.reduce((psum, box) => psum.plus(box), new BoundingBox());
  }
}

export default BoundingBox;

import ArcLineSeg from './ArcLineSeg';
import { EPSILON } from './Geo';
import Point from './Point';
import Shape from './Shape';

export enum CircleIntersectionState {
  UNKNOWN = 'unknown',
  IDENTICAL_CIRCLES = 'identical circles',
  TOO_FAR_APART = 'too far apart',
  CONTAINED_CIRCLE = 'contained circle',
  SINGLE_POINT = 'single point',
  TWO_POINTS = 'two points'
};

export type CircleIntersectionResult = {
  intersects: boolean,
  distBetween: number,
  points: Point[],
  state: CircleIntersectionState
};

export default class Circle extends Shape {
  protected _center: Point;
  protected _radius: number;

  constructor(center: Point, radius: number) {
    super();
    this._center = center;
    this._radius = radius;
    // TODO verify that this is correct. There may need to be a second arc.
    this.resetLines();
  }

  protected resetLines(): void {
    this._lines = [];
    this.addLines(
      new ArcLineSeg({
        p1: new Point({
          x: this._center.x + this._radius,
          y: this._center.y
        }),
        radius: this._radius,
        startAngle: 0,
        endAngle: 2 * Math.PI
      })
    );
  }

  get x(): number {
    return this._center.x;
  }

  get y(): number {
    return this._center.y;
  }

  get r(): number {
    return this._radius;
  }

  get center(): Point {
    return this._center;
  }

  set x(x: number) {
    this.throwIfFrozen();

    const deltaX = x - this._center.x;
    this._lines.forEach(line => line.move(deltaX, 0));
    this._center.x = x;
  }

  set y(y: number) {
    this.throwIfFrozen();

    const deltaY = y - this._center.y;
    this._lines.forEach(line => line.move(0, deltaY));
    this._center.y = y;
  }

  set center(center: Point) {
    this.throwIfFrozen();

    const deltaX = center.x - this._center.x;
    const deltaY = center.y - this._center.y;
    this._lines.forEach(line => line.move(deltaX, deltaY));
    this._center = center;
  }

  set r(r: number) {
    this.throwIfFrozen();

    this._radius = r;
    this.resetLines();
  }

  intersection(other: Circle, epsilon: number = EPSILON) {
    const distX = other.x - this.x;
    const distY = other.y - this.y;
    const distBetween = Math.sqrt(distX**2 + distY**2);
    const sumOfRadii = this.r + other.r;

    const points: Point[] = [];
    const result: CircleIntersectionResult = {
      intersects: false,
      distBetween,
      points,
      state: CircleIntersectionState.UNKNOWN
    };

    // Too far apart
    if (distBetween > sumOfRadii) {
      result.state = CircleIntersectionState.TOO_FAR_APART;
      return result;
    }

    // One envelopes the other
    if (distBetween < Math.abs(this.r - other.r)) {
      result.state = CircleIntersectionState.CONTAINED_CIRCLE;
      return result;
    }

    // The circles are the same - Infinite points of intersection
    if (this.equals(other)) {
      result.state = CircleIntersectionState.IDENTICAL_CIRCLES;
      result.intersects = true;
      return result;
    }

    // At this point, there is at least one point of intersection.
    result.intersects = true;

    // Distance from the center of this circle to the center of the intersection
    const a = (this.r**2 - other.r**2 + distBetween**2) / (2 * distBetween);
    // The center of the intersection, on the line between the two circle centers
    const midPt = {
      x: this.x + (a * distX / distBetween),
      y: this.y + (a * distY / distBetween)
    };

    // Single point of intersection
    if (
      Math.abs(distBetween - sumOfRadii) < epsilon ||
      Math.abs(distBetween - Math.abs(this.r - other.r)) < epsilon
    ) {
      result.state = CircleIntersectionState.SINGLE_POINT;
      points.push(new Point({
        x: this.x + (a * distX / distBetween),
        y: this.y + (a * distY / distBetween)
      }));
      return result;
    }

    // Distance from the center of the intersection to the intersection point(s)
    const c = Math.sqrt(this.r**2 - a**2);

    result.state = CircleIntersectionState.TWO_POINTS;
    points.push(new Point({
      x: midPt.x - (c * distY / distBetween),
      y: midPt.y + (c * distX / distBetween)
    }));
    points.push(new Point({
      x: midPt.x + (c * distY / distBetween),
      y: midPt.y - (c * distX / distBetween)
    }));

    return result;
  }

  equals(other: Circle) {
    return (
      this.center.equals(other.center) &&
      Math.abs(this.r - other.r) < EPSILON
    );
  }

  toString() {
    return `${this.isFrozen() ? '!' : ''}Circle{${this.center.toString()}, r: ${this.r}}`;
  }
}

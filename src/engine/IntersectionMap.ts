import { EPSILON } from "./Geo";
import LineSeg from "./LineSeg";
import LinearLineSeg from "./LinearLineSeg";
import Point from "./Point";

const linear = {
  linear: (l1: LinearLineSeg, l2: LinearLineSeg, epsilon: number) => {
    if (l1.equals(l2)) {
      return true;
    }

    // Check if any of the endpoints are on the other line.
    // Handles the all cases where the lines are parallel.
    if (
      l1.containsPoint(l2.p1, epsilon) ||
      l1.containsPoint(l2.p2, epsilon) ||
      l2.containsPoint(l1.p1, epsilon) ||
      l2.containsPoint(l1.p2, epsilon)
    ) {
      return true;
    }

    // If parallel and above didn't return, then they don't intersect.
    if (l1.isParallel(l2, epsilon)) {
      return false;
    }

    // Find the intersection point.
    let x, y;
    if (l1.hasSlope() && l2.hasSlope()) {
      x = (l2.b - l1.b) / (l1.m - l2.m);
      y = l1.m * x + l1.b;
    } else if (l1.hasSlope()) {
      x = l2.p1.x;
      y = l1.m * x + l1.b;
    } else {
      x = l1.p1.x;
      y = l2.m * x + l2.b;
    }

    // Check if the intersection point is on both lines.
    return (
      l1.containsPoint(new Point({ x, y }), epsilon) &&
      l2.containsPoint(new Point({ x, y }), epsilon)
    );
  }
};

const IntersectionMap: { [key: string]: any } = {
  linear,
};

export const intersects = (l1: LineSeg, l2: LineSeg, epsilon: number = EPSILON) => {
  const handler = IntersectionMap[l1.type]?.[l2.type];

  if (!handler) {
    throw new Error(`No intersection handlers for ${l1.type} -> ${l2.type}.`);
  }

  return handler(l1, l2, epsilon);
};

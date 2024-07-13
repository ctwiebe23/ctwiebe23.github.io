/**
 * represents a one-to-many relation between elements
 * fields:
 *   item: the element
 *   children: array of relations that the element is related to
 *   x: x position in a hasse diagram
 *   y: y position in a hasse diagram
 */
class Relation {

  constructor(item) {
    this.item = item;
    this.children = [];
    this.x = null;
    this.y = null;
  }

  /**
   * adds the given child relation to the list of children relations if the
   * element in the relation is unique
   */
  _addChildIfUnique(child, children) {
    if (children.map((x) => x.item).includes(child.item)) {
      return;
    }

    children.push(child);
  }

  /**
   * adds the given relation to this relations children
   */
  addChild(child) {
    this._addChildIfUnique(child, this.children);
  }

  /**
   * Returns an array of all relations that are descendents of this relation
   */
  getDescendants() {
    var desc = this.children;

    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      let grandchildren = child.getDescendants();

      for (let j = 0; j < grandchildren.length; j++) {
        let grandchild = grandchildren[j];
        this._addChildIfUnique(grandchild, desc);
      }
    }

    return desc;
  }

  /**
   * returns true if this relation has any parents in the given array of
   * relations, else false
   */
  hasParentsIn(graph) {
    var allChildren = graph.map((parent) => parent.children)
      .reduce((p, n) => p.concat(n), [])
      .map((child) => child.item);

    return (allChildren.indexOf(this.item) > -1) ? true : false;
  }

  /**
   * returns a copy of this relations
   */
  copy() {
    var uusi = new Relation(this.item);
    uusi.children = this.children.map((x) => x.copy());

    return uusi;
  }
}

/**
 * returns an array of every relation (class) from the set S on relation R,
 * with tie-breaking decided by relation r
 */
function getAllRelations(S, R, r) {
  // yes, `set` is an array
  var set = [...new Set(S)].sort(r).map((x) => new Relation(x));
  const n = set.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (R(set[i].item, set[j].item)) {
        set[i].addChild(set[j]);
      } else if (R(set[j].item, set[i].item)) {
        set[j].addChild(set[i]);
      }
    }
  }

  return set;
}

/**
 * returns the transitive reduction (an array of relations) of the array of
 * relations S
 */
function getTransitiveReduction(S) {
  var set = S.map((x) => x.copy());
  const n = set.length;

  for (let i = 0; i < n; i++) {
    let children = set[i].children;

    for (let j = 0; j < children.length; j++) {
      let grandchildren = children[j].getDescendants();

      for (let k = 0; k < grandchildren.length; k++) {
        let index = children.map((x) => x.item).indexOf(grandchildren[k].item);

        if (index > -1) {
          children.splice(index, 1);
        }
      }
    }
  }

  return set;
}

/**
 * returns an array of arrays of relations, each outer array represents a level
 * in a hasse diagram (each relation in a level shares a y coord) and each
 * inner array represents the columns. Each relation is updated with x & y
 * coords and the pointers within the children arrays are refreshed
 */
function getTree(S) {
  var set = S.map((x) => x.copy());
  var levels = [];

  while (set.length != 0) {
    let orphans = set.filter((x) => !x.hasParentsIn(set));

    for (let i = 0; i < orphans.length; i++) {
      let index = set.indexOf(orphans[i]);
      set.splice(index, 1);

      for (let j = 0; j < levels.length; j++) {
        for (let k = 0; k < levels[j].length; k++) {
          let index = levels[j][k].children
                                  .map((x) => x.item)
                                  .indexOf(orphans[i].item)
          if (index > -1) {
            levels[j][k].children[index] = orphans[i];
          }
        }
      }
    }

    levels.push(orphans);
  }

  levels = levels.reverse();

  var ypad = 100 / (levels.length + 1);

  for (let i = 0; i < levels.length; i++) {
    let xpad = 100 / (levels[i].length + 1);

    for (let j = 0; j < levels[i].length; j++) {
      levels[i][j].x = (j + 1) * xpad;
      levels[i][j].y = (i + 1) * ypad;
    }
  }

  return levels.reverse();
}

/**
 * returns a complete hasse diagram created from set S and relation R, with
 * tie breaking done by relation r. The diagram is represented by an array
 * of arrays of relation classes
 */
export function makeHasseDiagram(S, R, r) {
  var relations = getAllRelations(S, R, r);
  var reduction = getTransitiveReduction(relations);
  var hasseTree = getTree(reduction);

  return hasseTree;
}

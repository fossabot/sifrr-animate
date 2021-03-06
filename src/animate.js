const animateOne = require('./animateone');

function animate({
  targets,
  target,
  to,
  time,
  type,
  onUpdate,
  round
} = {}) {
  targets = targets ? Array.from(targets) : [target];
  function iterate(target, props) {
    const promises = [];
    for (let prop in props) {
      let from, final;
      if (Array.isArray(props[prop])) [from, final] = props[prop];
      else final = props[prop];
      if (typeof props[prop] === 'object' && !Array.isArray(props[prop])) {
        promises.push(iterate(target[prop], props[prop]));
      } else {
        promises.push(animateOne({
          target,
          prop,
          to: final,
          time,
          type,
          from,
          onUpdate,
          round
        }));
      }
    }
    return Promise.all(promises);
  }
  return Promise.all(targets.map(target => iterate(target, to)));
}

module.export = animate;
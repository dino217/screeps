module.exports = function() {
  Creep.prototype.sayName = function(){
    var name = this.name;
    return this.say(name +'!');
  };

  Creep.prototype.findNearestEnergyHoldingStructure = function(){
    var source = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION)
                    && s.energy > 10)
    });
    return source;
  };
};

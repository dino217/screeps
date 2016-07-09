module.exports = {
  run: function(creep) {
    // If the harvester is working, but runs out of energy, it should switch to not working.
    if (creep.memory.working && creep.carry.energy == 0){
      creep.memory.working = false;
    }
    // If the harvester has filled up on energy it should switch to working.
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    // If the creep has energy it should do work
    if (creep.memory.working) {
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite);
      }
    }
    // If the builder is not working, it should get energy so it can work.
    if (!creep.memory.working) {
      var source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                      || s.structureType == STRUCTURE_EXTENSION)
                      && s.energy < s.energyCapacity)
      });

      if (source && source.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}
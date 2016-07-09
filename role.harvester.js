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
      var spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => ((s.structureType == STRUCTURE_SPAWN
              || s.structureType == STRUCTURE_EXTENSION)
              && s.energy < s.energyCapacity
              && s.my
              )
              || (s.structureType == STRUCTURE_CONTAINER
              &&  s.store < s.storeCapacity)
      });
      if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
    // If the harvester is not working, it should get energy so it can work.
    if (!creep.memory.working) {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);

      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}

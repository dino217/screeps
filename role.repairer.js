var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    // If the repairer is working, but runs out of energy, it should switch to not working.
    if (creep.memory.working && creep.carry.energy == 0){
      creep.memory.working = false;
    }
    // If the repairer has filled up on energy it should switch to working.
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    // If the repairer has energy it should do work
    if (creep.memory.working) {
      var buildingToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
      });
      if (buildingToRepair) {
        if(creep.repair(buildingToRepair) === ERR_NOT_IN_RANGE) {
          creep.moveTo(buildingToRepair);
        }
      }
      // If there are no buildings to repair, run the builder role.
      else {
        roleBuilder.run(creep);
      }
    }
    // If the repairer is not working, it should get energy so it can work.
    if (!creep.memory.working) {
      var source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                      || s.structureType == STRUCTURE_EXTENSION)
                      && s.energy < s.energyCapacity)
      });
      var nearestSpawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES{
        filter: (s) => s.structureType == STRUCTURE_SPAWN
      });
      var energyHold = nearestSpawn.memory.hold

      if (!energyHold && source && source.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}

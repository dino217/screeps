require('prototype.creep')();
var roleWallRepairer = require('role.wallRepairer');

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
      for (let percentage = 0.1; percentage < 0.8; percentage += 0.1){
        var buildingToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) =>
            ((s.hits / s.hitsMax) < percent) && s.structureType != STRUCTURE_WALL
        });
        if(buildingToRepair){break;}
      }

      if (buildingToRepair) {
        if(creep.repair(buildingToRepair) === ERR_NOT_IN_RANGE) {
          creep.moveTo(buildingToRepair);
        }
      }
      // If there are no buildings to repair, run the builder role.
      else {
        roleWallRepairer.run(creep);
      }
    }
    // If the repairer is not working, it should get energy so it can work.
    if (!creep.memory.working) {
      var source = creep.findNearestEnergyHoldingStructure();
      var nearestSpawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_SPAWN
      });
      var energyHold = nearestSpawn.memory.hold;

      if (source) {
        creep.moveTo(source);
      }

      if (!energyHold && source && source.transferEnergy(creep)) {}
    }
  }
}

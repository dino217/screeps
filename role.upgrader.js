require('prototype.creep')();
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
      var controller = creep.room.controller;
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
    }
    // If the upgrader is not working, it should get energy so it can work.
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

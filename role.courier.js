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
      // Find empty structures and fill them.
      for (let percent = 0.25; percent < 1; percent += 0.25){
        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (s) => (
            s.structureType == STRUCTURE_SPAWN ||
            s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_TOWER
          ) && (s.energy / s.energyCapacity) < percent
        });
        if (target){
          break
        }
      }

      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(target);
      }
    }
    // If the harvester is not working, it should get energy so it can work.
    if (!creep.memory.working) {
      // Take energy from container
      var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (
          s.structureType == STRUCTURE_CONTAINER &&
          _.sum(s.store) > 0)
      })
    }
  }
}

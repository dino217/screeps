module.exports.loop = function () {
  for(let name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.working && creep.carry.energy == 0){
      creep.memory.working = false;
    }

    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    // If the creep has energy it should do work
    if (creep.memory.working) {
      var spawn = Game.spawns.Spawn1;
      if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }

    if (!creep.memory.working) {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);

      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}

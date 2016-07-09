"use strict";
var roleHarvester = require('role.harvester');

module.exports.loop = function () {
  for(let name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role === 'harvester'){
      roleHarvester.run(creep);
    }
  }
}

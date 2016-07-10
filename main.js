"use strict";
var profiler = require('screeps-profiler');
require('prototype.spawn')();
require('prototype.creep')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleCourier = require('role.courier');

module.exports.loop = function () {
  Game.spawns.Spawn1.autobuild();

  for(let name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role === 'harvester'){
      roleHarvester.run(creep);
    }

    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep);
    }

    if (creep.memory.role === 'repairer') {
      roleRepairer.run(creep);
    }

    if (creep.memory.role === 'wallRepairer') {
      roleWallRepairer.run(creep);
    }

    if (creep.memory.role === 'courier'){
      roleCourier.run(creep);
    }
  }
}

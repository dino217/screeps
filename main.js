"use strict";

module.exports.loop = function () {
   for (var name in Game.creeps){
       var creep = Game.creeps['name'];
       if (creep.carryCapacity > _.sum(creep.carry)){
         var source = creep.room.find(FIND_SOURCES)[0];
         if (creep.harvest(source) === ERR_NOT_IN_RANGE){
           creep.moveTo(source);
         }
       }
   }
}

module.exports = function() {
  StructureSpawn.prototype.autobuild = function () {
    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfUpgraders = 2;
    var minimumNumberOfBuilders = 2;
    var minimumNumberOfRepairers = 1;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    var roleToBuild = undefined;
    var bodyToBuild = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters){
      roleToBuild = 'harvester';
      bodyToBuild = [WORK,CARRY,MOVE,WORK];
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
      roleToBuild = 'upgrader';
      bodyToBuild = [WORK,CARRY,MOVE,MOVE];
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
      roleToBuild = 'builder';
      bodyToBuild = [WORK,CARRY,MOVE];
    }
    else if (numberOfRepairers < minimumNumberOfRepairers) {
      roleToBuild = 'repairer';
      bodyToBuild = [WORK,CARRY,MOVE];
    }

    if (!roleToBuild){
      this.memory.hold = false;
      return;
    }

    var enoughEnergy = this.canCreateCreep(bodyToBuild) !== ERR_NOT_ENOUGH_ENERGY

    if (enoughEnergy) {
      this.memory.hold = false;
      return this.createCreep(bodyToBuild, undefined, {role: roleToBuild});
    }
    else {
      return this.memory.hold = true;
    }
  };
}

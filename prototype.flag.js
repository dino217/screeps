module.exports = function() {
  Flag.prototype.createCreep = function (body, memory) {
    var spawn = Game.spawns[this.memory.spawn];
    memory.flag = this;
    spawn.createCreep(body, undefined, memory);
  };
}

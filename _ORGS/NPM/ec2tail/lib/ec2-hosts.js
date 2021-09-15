var _ = require('lodash'),
  amazonEc2 = require('awssum-amazon-ec2');

// returns a list of your remote hosts.
// 1. set your credentials/zone in a .env file.
// 2. add a Name tag to your remote servers:
//   this should be a human-readable name for your server.
function Ec2Hosts(opts) {
  _.extend(this, {
    accessKeyId: process.env.EC2_ACCESS_KEY,
    secretAccessKey: process.env.EC2_SECRET_KEY,
    region: amazonEc2[process.env.EC2_ZONE]
  }, opts);
}

Ec2Hosts.prototype.getHosts = function(cb) {
  var ec2 = new amazonEc2.Ec2({
    accessKeyId: this.accessKeyId,
    secretAccessKey: this.secretAccessKey,
    region: amazonEc2[process.env.EC2_ZONE]
  });

  ec2.DescribeInstances(function(err, data) {
    var instances = _.map(data.Body.DescribeInstancesResponse.reservationSet.item, function(r) {
      var instance = r.instancesSet.item,
        tags = instance.tagSet ? instance.tagSet.item : [],
        name = null; // name label given to instance.

      // make sure tags is an array.
      if (!_.isArray(tags)) tags = [tags];

      // grab the tag 'name' from the list of tags.
      var name = _.select(tags, function(t) {
        if (t.key.toLowerCase() === 'name') { return t.value; }
      })[0]

      if (!name) return;

      // there, now we have the host and the name.
      return {
        host: instance.dnsName,
        name: name.value
      }
    });

    cb(null, _.select(instances, function(i) {return i;}));
  });
};

module.exports = Ec2Hosts;

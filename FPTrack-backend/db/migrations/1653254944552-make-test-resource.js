const models = require('../../models');

const ResourceGroup = models.ResourceGroup;
const Resource = models.Resource;

async function up() {

  var arduino_rsrc = await ResourceGroup.create(
    {
      name: "Arduino UNO",
      description: "Microprocessor board with GPIO pins. Version 3",
      kind: "hardware",
      is_multi_assignable: false
    }
  );

  var matlab_rsrc = await ResourceGroup.create(
    {
      name: "Matlab",
      description: "Fully licensed Matlab V1",
      kind: "software",
      is_multi_assignable: true
    }
  );

  await Resource.create(
    {
      resource_group: arduino_rsrc._id,
      remarks: "Purchased through Amazon",
      scan_code: "ABCD123456",
      expiry: null
    }
  );

  await Resource.create(
    {
      resource_group: arduino_rsrc._id,
      remarks: "Purchased through Flipkart",
      scan_code: "ABCD223456",
      expiry: null
    }
  );

  await Resource.create(
    {
      resource_group: matlab_rsrc._id,
      remarks: "Fully licensed version",
      scan_code: "DDDD123456",
      expiry: null
    }
  );

  await Resource.create(
    {
      resource_group: matlab_rsrc._id,
      remarks: "fully licensed version",
      scan_code: "DDDD223456",
      expiry: null
    }
  );
}


async function down() {

  await Resource.deleteOne({
    scan_code: "ABCD123456"
  });

  await Resource.deleteOne({
    scan_code: "ABCD223456"
  });

  await Resource.deleteOne({
    scan_code: "DDDD123456"
  });

  await Resource.deleteOne({
    scan_code: "DDDD223456"
  });

  await ResourceGroup.deleteOne({
    name: "Arduino UNO"
  });

  await ResourceGroup.deleteOne({
    name: "Matlab"
  });

}

module.exports = { up, down };

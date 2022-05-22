const Resource = require('../../models/resource');

async function up() {

  await ResourceSchema.create(
    {
      name: "Arduino UNO",
      description: "Microcontroller board with GPIO pins. Version 3",
      scan_code: "ABCD123456",
      kind: "hardware",
      expiry: null,
      is_multi_assignable: false
    }
  );

  await Resource.create(
    {
      name: "Matlab",
      description: "Fully licensed Matlab V1",
      scan_code: null,
      kind: "software",
      expiry: "2026-05-02",
      is_multi_assignable: true
    }
  );
}


async function down() {

  await Resource.deleteOne({
    name: "Matlab"
  });

  await Resource.deleteOne({
    name: "Arduino UNO"
  });
}

module.exports = { up, down };

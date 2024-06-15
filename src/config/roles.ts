export const roles = [
  {
    name: "admin",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "delete_record",
    ],
    modules: ["user", "tenant"],
  },
  {
    name: "manager",
    permissions: ["create_record", "read_record", "update_record"],
    modules: ["product", "tenant"],
  },
  {
    name: "employee",
    permissions: ["create_record", "read_record"],
    modules: ["product"],
  },
];

export interface RoleAccess {
  name: string;
  permissions: string[];
  modules: string[];
}

export const roles: RoleAccess[] = [
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

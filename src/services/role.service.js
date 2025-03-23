import prisma from "../common/prisma/init.prisma.js";

export const roleService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    let { page, pageSize, search } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || ``;

    const whereSearch =
      search.trim() === `` ? {} : { name: { contains: search } };
    const where = { ...whereSearch };

    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.roles.count({ where: where });
    const totalPage = Math.ceil(totalItem / pageSize);

    const roles = await prisma.roles.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        created_at: "desc", // đưa video mới nhất lên trên đầu khi thêm mới vô
      },
      where: where,
    });

    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      items: roles || [],
    };
  },

  findOne: async function (req) {
    const { id } = req.params.id;
    const role = await prisma.roles.findUnique({
      where: {
        role_id: +id,
      },
    });
    return role;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} role`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} role`;
  },

  togglePermission: async (req) => {
    const { role_id, permission_id } = req.body;
    console.log({ role_id, permission_id });

    const rolePermissionExist = await prisma.role_permissions.findFirst({
      where: {
        role_id: role_id,
        permission_id: permission_id,
      },
    });

    if (rolePermissionExist) {
      // nếu đã tồn tại thì cập nhật lại trạng thái is_active (lật lại )=> bật/tắt 1:0
      await prisma.role_permissions.update({
        where: {
          role_permissions_id: rolePermissionExist.role_permissions_id,
        },
        data: {
          is_active: !rolePermissionExist.is_active,
        },
      });
    } else {
      // nếu chưa tồn tại thì tạo mới
      await prisma.role_permissions.create({
        data: {
          role_id: role_id,
          permission_id: permission_id,
          is_active: true,
        },
      });
    }
    return rolePermissionExist;
  },
};

import { BadRequestException } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

export const checkPermission = async (req, res, next) => {
  try {
    const user = req.user;
    const role_id = user.role_id;
    const baseUrl = req.baseUrl;
    const routePath = req.route.path;
    const fullPath = baseUrl + routePath;
    const method = req.method;

    if (role_id === 1) return next();

    console.log({
      role_id,
      baseUrl,
      routePath,
      fullPath,
      method,
    });

    // đi tìm id của permissions thông qua id và method
    const permission = await prisma.permissions.findFirst({
      where: {
        endpoint: fullPath,
        method: method,
      },
    });

    const role_permission = await prisma.role_permissions.findFirst({
      where: {
        permission_id: permission.permission_id,
        role_id: role_id,
        is_active: true,
      },
    });

    if (!role_permission)
      throw new BadRequestException(
        `Bạn không đủ quyền sử dụng tài nguyên API này`
      );

    next();
  } catch (error) {
    next(error);
  }
};

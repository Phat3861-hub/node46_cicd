import prisma from "../common/prisma/init.prisma.js";

export const chatService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all chat`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} chat`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} chat`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} chat`;
  },

  listUserChat: async (req) => {
    let { page, pageSize, search, notMe } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || ``;
    notMe = notMe === `true` ? true : false;

    const whereNotMe =
      notMe === true ? { user_id: { not: req.user.user_id } } : {};
    const whereSearch =
      search.trim() === `` ? {} : { email: { contains: search } };
    const where = { ...whereNotMe, ...whereSearch };

    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.users.count({ where: where });
    const totalPage = Math.ceil(totalItem / pageSize);

    const users = await prisma.users.findMany({
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
      items: users || [],
    };
  },
};

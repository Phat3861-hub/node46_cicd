const video = {
  "/video/video-list": {
    get: {
      tags: ["Videos"],
      security: [
        {
          phatToken: [],
        },
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Nếu không truyền thì là 1 ",
        },
        {
          name: "pageSize",
          in: "query",
          description: "Nếu không truyền thì là 10 ",
        },
      ],
      responses: {
        200: {
          description: "hello",
        },
      },
    },
  },
  "/video/video-detail/{id}": {
    get: {
      tags: ["Videos"],
      security: [
        {
          phatToken: [],
        },
      ],
      responses: {
        200: {
          description: "hello",
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Id của video",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
  },
  "/video/video-create": {
    post: {
      tags: ["Videos"],
      security: [
        {
          phatToken: [],
        },
      ],
      responses: {
        200: {
          description: "hello",
        },
      },
      requestBody: {
        description: "Dữ liệu để tạo 1 video",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                video_name: { type: "string" },
                description: { type: "string" },
                views: { type: "number" },
              },
            },
          },
        },
      },
    },
  },
  "/video/video-update": {
    put: {
      tags: ["Videos"],
      security: [
        {
          phatToken: [],
        },
      ],
      responses: {
        200: {
          description: "hello",
        },
      },
      requestBody: {
        description: "Dữ liệu để update 1 video",
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default video;

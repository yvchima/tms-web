"use strict";
/**
 *  news-post controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController(
  "api::news-post.news-post",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      const query = strapi.db.query("api::news-post.news-post");
      await Promise.all(
        data.map(async (item, index) => {
          const foundItem = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ["createdBy"],
          });

          data[index].attributes.createdBy = {
            id: foundItem.createdBy.id,
            firstname: foundItem.createdBy.firstname,
            lastname: foundItem.createdBy.lastname,
          };
        })
      );
      return { data, meta };
    },
  })
);

const rules = {
  undefined: {
    static: ["product:list", "home-page:visit"]
  },
  loggedUser: {
    static: [
      "product:addToCart",
      "users:getSelf",
      "order:historySelf",

      "dashboard-page:visit"
    ],
    dynamic: {
      "order:edit": ({ userId, orderOwnerId }) => {
        if (!userId || !orderOwnerId) return false;
        return userId === orderOwnerId;
      },
      "order:delete": ({ userId, orderOwnerId }) => {
        if (!userId || !orderOwnerId) return false;
        return userId === orderOwnerId;
      }
    }
  },
  admin: {
    static: [
      "product:addToCart",
      "product:create",
      "product:edit",
      "product:delete",

      "users:get",
      "users:getSelf",

      "order:historySelf",
      "order:history",

      "dashboard-page:visit"
    ]
  }
};

export default rules;

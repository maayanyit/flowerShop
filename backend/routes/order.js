const router = require("express").Router();
let Order = require("../models/order.model");

/**
 * add new order for a user
 */
router.route("/add").post((req, res) => {
  const userEmail = req.body.userEmail;
  const productsList = req.body.productsList;
  const cost = Number(req.body.cost);
  const status = req.body.status;

  const newOrder = new Order({ userEmail, productsList, cost, status });

  console.log(newOrder);
  newOrder
    .save() // save the new order to the database
    .then(() => res.json("Order added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * find all orders
 */
router.route("/").get((req, res) => {
  Order.find() // get a list of all orders in database
    .then(orders => res.json(orders)) // return the orders we got from the database
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * find all orders for a user, by user id and status new
 */
router.route("/:id").get((req, res) => {
  Order.find({ userEmail: req.params.id, status: "new" })
    .then(order => res.json(order))
    .catch(err => res.status(400).json("Error" + err));
});

/**
 * find all orders for a user, by user id
 */
router.route("/allOrders/:id").get((req, res) => {
  Order.find({ userEmail: req.params.id })
    .then(order => res.json(order))
    .catch(err => res.status(400).json("Error" + err));
});

/**
 * update an order by id
 */
router.post("/update/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(Order => {
      Order.userEmail = req.body.userEmail;
      Order.productsList = req.body.productsList;
      Order.cost = Number(req.body.cost);
      Order.status = req.body.status;

      Order.save()
        .then(() => res.json("order updated!"))
        .catch(err => res.status(400).json("Error" + err));
    })

    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router;

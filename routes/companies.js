const express = require("express");
const Joi = require("joi");
const router = express.Router();

const companies = [
  {
    id: 1,
    name: "company1",
  },
  {
    id: 2,
    name: "company2",
  },
  {
    id: 3,
    name: "company3",
  },
];

router.get("/", (req, res) => {
  res.send(companies);
});

router.get("/:id", (req, res) => {
  const company = companies.find((c) => c.id === parseInt(req.params.id));
  if (!company)
    return res.status(404).send("The course with the given ID was not found");
  res.send(company);
});

router.post("/", (req, res) => {
  const { error } = validateCompany(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const company = {
    id: companies.length + 1,
    name: req.body.name,
  };
  companies.push(company);
  res.send(company);
});

router.put("/:id", (req, res) => {
  const company = companies.find((c) => c.id === parseInt(req.params.id));
  if (!company)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCompany(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  company.name = req.body.name;
  res.send(company);
});

router.delete("/:id", (req, res) => {
  const company = companies.find((c) => c.id === parseInt(req.params.id));
  if (!company)
    return res.status(404).send("The course with the given ID was not found");

  const index = companies.indexOf(company);
  companies.splice(index, 1);

  res.send(company);
});

const validateCompany = (company) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(company);
};

module.exports = router;
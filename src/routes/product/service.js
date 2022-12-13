const create = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);
    return res.status(201).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const get = (model) => async (req, res) => {
  try {
    const item = await model.find().lean().exec();
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const update = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndDelete(req.params.id);
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = (model) => ({
  create: create(model),
  get: get(model),
  update: update(model),
  deleteOne: deleteOne(model),
});

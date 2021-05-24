const getDb = require('../services/db');

const listAllFromArtist = async (req, res, next) => {
  const { artistId } = req.params;
  const db = await getDb();

  try {
    const [result] = await db.query('SELECT * from Album WHERE artistId = ?', [
      artistId,
    ]);
    result ? res.status(200).send(result) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
  db.close();
};

const insert = async (req, res, next) => {
  const db = await getDb();
  const { name, year } = req.body;
  const { artistId } = req.params;

  try {
    await db.query(
      'INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)',
      [name, year, artistId]
    );
    res.status(201).json(req.body);
  } catch (err) {
    console.log(err);
    next(err);
  }

  db.close();
};

const getOne = async (req, res, next) => {
  const { artistId, albumId } = req.params;
  const db = await getDb();

  try {
    const [[result]] = await db.query(
      'SELECT * from Album WHERE artistId = ? AND id = ?',
      [artistId, albumId]
    );
    result ? res.status(200).send(result) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
  db.close();
};

const changeOne = async (req, res, next) => {
  const { artistId, albumId } = req.params;
  const db = await getDb();

  const data = req.body;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Album SET ? WHERE id = ? AND artistId = ?',
      [data, albumId, artistId]
    );

    affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
  db.close();
};

const deleteOne = async (req, res, next) => {
  const { artistId, albumId } = req.params;

  const db = await getDb();

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE from Album WHERE id = ? AND artistId = ?',
      [albumId, artistId]
    );

    affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    next(err);
  }

  db.close();
};

const getAll = async (req, res, next) => {
  const db = await getDb();

  try {
    const [result] = await db.query('SELECT * from Album');
    result ? res.status(200).send(result) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
  db.close();
};

module.exports = {
  listAllFromArtist,
  insert,
  getOne,
  changeOne,
  deleteOne,
  getAll,
};
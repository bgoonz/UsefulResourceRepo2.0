const express = require('express');
const router = express.Router();
const { read, write, append, remove, rename } = require('../fileOperations');
const { createError } = require('../utils');

router.get('/read/:fileName', async (req, res, next) => {
  try {
    const data = await read(req.params.fileName);
    res.send({
      status: 'Success',
      data,
    });
  } catch (error) {
    next(createError(404, 'File not found'));
  }
});

router.get('/write/:fileName/:content', async (req, res, next) => {
  const { fileName, content } = req.params;

  try {
    const data = await write(fileName, content);
    res.send({
      status: 'Success',
      data: 'Written to the file successfully',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/append/:fileName/:content', async (req, res, next) => {
  const { fileName, content } = req.params;

  try {
    const data = await append(fileName, content);
    res.send({
      status: 'Success',
      data: 'Written to the file successfully',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/rename/:oldFileName/:newFileName', async (req, res, next) => {
  const { oldFileName, newFileName } = req.params;

  try {
    const data = await rename(oldFileName, newFileName);
    res.send({
      status: 'Success',
      data: `Successfully renamed ${oldFileName} to ${newFileName}`,
    });
  } catch (error) {
    next(createError(404, 'File not found'));
  }
});

router.get('/delete/:fileName', async (req, res, next) => {
  const { fileName } = req.params;

  try {
    const data = await remove(fileName);
    res.send({
      status: 'Success',
      data: `Successfully deleted ${fileName} from the disk.`,
    });
  } catch (error) {
    next(createError(404, 'File not found'));
  }
});

module.exports = router;

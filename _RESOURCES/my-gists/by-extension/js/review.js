exports.getRentalRating = function (req, res) {
  const rentalId = req.params.id;

  Review.aggregate(
    [
      { $unwind: "$rental" },
      {
        $group: {
          _id: rentalId,
          ratingAvg: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (result && result[0]) {
        return res.json(result[0]["ratingAvg"]);
      } else {
        // or you can return error here
        // return res.status(422).send({errors: [{title: 'Reviews Error', detail: 'No Reviews'}]})
        return res.json({});
      }
    }
  );
};

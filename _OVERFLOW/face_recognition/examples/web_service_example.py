# This is a _very simple_ example of a web service that recognizes faces in uploaded images.
# Upload an image file and it will check if the image contains a picture of Barack Obama.
# The result is returned as json. For example:
#
# $ curl -XPOST -F "file=@obama2.jpg" http://127.0.0.1:5001
#
# Returns:
#
# {
#  "face_found_in_image": true,
#  "is_picture_of_obama": true
# }
#
# This example is based on the Flask file upload example: http://flask.pocoo.org/docs/0.12/patterns/fileuploads/

# NOTE: This example requires flask to be installed! You can install it with pip:
# $ pip3 install flask

import face_recognition
from flask import Flask, jsonify, request, redirect

# You can change this to any folder on your system
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

app = Flask(__name__)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET", "POST"])
def upload_image():
    # Check if a valid image file was uploaded
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)

        file = request.files["file"]

        if file.filename == "":
            return redirect(request.url)

        if file and allowed_file(file.filename):
            # The image file seems valid! Detect faces and return the result.
            return detect_faces_in_image(file)

    # If no valid image file was uploaded, show the file upload form:
    return """
    <!doctype html>
    <title>Is this a picture of Obama?</title>
    <h1>Upload a picture and see if it's a picture of Obama!</h1>
    <form method="POST" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="submit" value="Upload">
    </form>
    """


def detect_faces_in_image(file_stream):
    # Pre-calculated face encoding of Obama generated with face_recognition.face_encodings(img)
    known_face_encoding = [
        -5.79372868e-02,
        -3.59654687e-02,
        4.94103096e-02,
        -1.19455174e-01,
        -1.34764582e-01,
        3.51520721e-04,
        4.65349592e-02,
        -8.05270523e-02,
        2.12572962e-01,
        -5.15524559e-02,
        2.22808272e-01,
        -8.29387680e-02,
        -3.02105546e-01,
        6.26332015e-02,
        -1.79184340e-02,
        1.43165559e-01,
        -1.18190922e-01,
        -4.14777361e-02,
        -7.82558098e-02,
        -1.43669462e-02,
        1.68195385e-02,
        4.65960465e-02,
        1.74813699e-02,
        1.26817659e-01,
        -9.12242830e-02,
        -4.10341829e-01,
        -7.04287216e-02,
        -3.24562266e-02,
        -6.83792233e-02,
        -3.20361778e-02,
        6.03229459e-03,
        2.13575929e-01,
        -1.61641553e-01,
        -6.58392683e-02,
        4.92329821e-02,
        4.70502898e-02,
        -1.32448897e-01,
        -1.57586694e-01,
        2.06014365e-01,
        6.82288408e-02,
        -2.20067725e-01,
        -5.50787076e-02,
        6.53022006e-02,
        2.94053465e-01,
        1.62784159e-01,
        -2.02405509e-02,
        7.90716708e-02,
        -1.34297490e-01,
        1.36183158e-01,
        -3.16769242e-01,
        1.20927189e-02,
        1.33490413e-01,
        1.72752328e-02,
        1.75223108e-02,
        8.07321072e-02,
        -1.39587507e-01,
        -8.66684504e-03,
        1.10956199e-01,
        -2.33251795e-01,
        5.01712039e-02,
        5.47767282e-02,
        -8.04020241e-02,
        -4.85560074e-02,
        -1.94968373e-01,
        2.22543553e-01,
        1.57685906e-01,
        -1.41279131e-01,
        -1.36395246e-01,
        1.97838724e-01,
        -1.15952082e-01,
        -6.22984283e-02,
        9.15516913e-02,
        -1.81724980e-01,
        -2.41720691e-01,
        -2.87515283e-01,
        5.88124059e-03,
        3.74991745e-01,
        8.69735181e-02,
        -1.31132483e-01,
        -6.52624527e-03,
        -1.01798162e-01,
        -2.51422748e-02,
        5.74094951e-02,
        1.61993310e-01,
        5.28256893e-02,
        -4.41091284e-02,
        -2.82856282e-02,
        6.65251911e-02,
        2.18407989e-01,
        -7.70751983e-02,
        -4.68551852e-02,
        2.77996391e-01,
        2.23344993e-02,
        -5.03337197e-02,
        -8.04243609e-05,
        1.12396829e-01,
        -1.33590013e-01,
        4.16687913e-02,
        -2.08774537e-01,
        1.06580788e-02,
        3.87473963e-02,
        2.60850461e-03,
        5.54204509e-02,
        1.37126371e-01,
        -2.16437474e-01,
        1.76183686e-01,
        -6.04996318e-03,
        -5.22060543e-02,
        7.30015635e-02,
        -1.30571947e-01,
        -1.00843556e-01,
        -4.07279246e-02,
        1.31106853e-01,
        -3.02381814e-01,
        1.10745251e-01,
        8.91806930e-02,
        8.73605162e-02,
        1.34653643e-01,
        -4.70379256e-02,
        2.96745487e-02,
        1.18509047e-02,
        -6.12862520e-02,
        -2.10576937e-01,
        -8.41272715e-03,
        8.89335647e-02,
        3.85822579e-02,
        -5.16164377e-02,
        -8.74482747e-03,
    ]

    # Load the uploaded image file
    img = face_recognition.load_image_file(file_stream)
    # Get face encodings for any faces in the uploaded image
    unknown_face_encodings = face_recognition.face_encodings(img)

    face_found = False
    is_obama = False

    if len(unknown_face_encodings) > 0:
        face_found = True
        # See if the first face in the uploaded image matches the known face of Obama
        match_results = face_recognition.compare_faces(
            [known_face_encoding], unknown_face_encodings[0]
        )
        if match_results[0]:
            is_obama = True

    # Return the result as json
    result = {"face_found_in_image": face_found, "is_picture_of_obama": is_obama}
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

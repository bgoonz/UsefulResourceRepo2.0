import face_recognition
import os
import csv

path = os.path.dirname(os.path.realpath(__file__))
files = os.listdir(os.path.join(path, "img"))

embs = []
for f in files:
    img = face_recognition.load_image_file(os.path.join(path, img, f))
    embs.append(face_recognition.face_encodings(img)[0])

with open("taco.txt", "w", newline="") as myfile:
    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
    wr.writerow(embs)

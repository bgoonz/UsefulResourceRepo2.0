import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import keras

print(tf.__version__)
print(keras.__version__)

from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.utils import np_utils

(X_train, y_train), (X_test, y_test) = mnist.load_data()
plt.imshow(X_train[0])
plt.show()

X_train = X_train.reshape(X_train.shape[0], 28, 28, 1)
X_test = X_test.reshape(X_test.shape[0],  28, 28, 1)
X_train = X_train.astype('float32')
X_test = X_test.astype('float32')
X_train /= 255
X_test /= 255

y_train = np_utils.to_categorical(y_train)
y_test = np_utils.to_categorical(y_test)

model = Sequential()

model.add(Conv2D(32, 3, 3, activation = 'relu', padding = 'same', input_shape =(28, 28, 1)))
model.add(Conv2D(32, 3, 3, activation = 'relu'))
model.add(MaxPooling2D(pool_size = (2,2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(128, activation = 'relu'))
model.add(Dropout(0.25))
model.add(Dense(10, activation ='softmax'))


model.compile(loss='categorical_crossentropy',
optimizer = 'adam',
metrics = ['accuracy'])

model.summary()

model.fit(X_train, y_train, batch_size = 32, epochs = 10, verbose = 1)
score = model.evaluate(X_test, y_test, verbose = 0)
print(score[1])

print(model.predict(X_test[0]))
plt.imshow(X_test[0].reshape(28,28))
plt.show()

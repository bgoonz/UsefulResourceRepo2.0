import tensorflow as tf
import keras
import numpy as np
import matplotlib.pyplot as plt
import sklearn.metrics

from keras.datasets import cifar10
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.utils import np_utils


#loading the dataset
(X_train, y_train), (X_test, y_test) = cifar10.load_data()
print("Training Set loaded with dimensions:  ", X_train.shape, '\n\n')
print(X_train[0,:,:,0], '\n\n')


#scale and regularize the dataset
X_train = (X_train-np.mean(X_train))
X_test = (X_test - X_test.mean())
print(X_train[0,:,:,0], '\n\n')


#onehot encode the target classes
y_train = np_utils.to_categorical(y_train)
y_test = np_utils.to_categorical(y_test)
print(y_train[0])


model = Sequential()
model.add(Conv2D(32, 3, activation ='relu', padding = 'same', input_shape = (32, 32, 3)))
model.add(Conv2D(32, 3, activation = 'relu'))
model.add(MaxPooling2D(pool_size = (2,2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(6272, activation = 'relu'))
model.add(Dropout(0.3))
model.add(Dense(10, activation = 'softmax'))
model.add(Dropout(0.5))

model.compile(loss = "categorical_crossentropy",
 optimizer = 'adam',
 metrics = ['accuracy'])

model.summary()


model.fit(X_train, y_train, batch_size = 32, epochs = 12, verbose = 1)

score = model.evaluate(X_test, y_test, batch_size = 32)
print(score[1])


y_pred = model.predict(X_test)
print(sklearn.metrics.classification_report(y_test, y_pred))
model.save('saved_models\\cifar10_conv.h5')

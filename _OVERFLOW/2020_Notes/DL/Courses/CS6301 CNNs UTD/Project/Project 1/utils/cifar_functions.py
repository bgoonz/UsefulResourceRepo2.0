"""
CIFAR_FUNCTIONS

A collection of utility functions to speed up the process of model implementations. The idea being to reduce the amount of boilerplate code in each notebook, so the focus can be on the coding of the model architecture.

"""

import tensorflow as tf
import math
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.layers import *
from pathlib import Path
import tensorflow_datasets as tfds
import pandas as pd
import time
import os

######################################################################
# TRAINING HYPERPARAMETERS
######################################################################


DATA_NUM_CLASSES = 10
DATA_CHANNELS = 3
DATA_ROWS = 32
DATA_COLS = 32
DATA_CROP_ROWS = 28
DATA_CROP_COLS = 28
DATA_MEAN = np.array([[[125.30691805, 122.95039414, 113.86538318]]])  # CIFAR10
DATA_STD_DEV = np.array([[[62.99321928, 62.08870764, 66.70489964]]])  # CIFAR10


# model
MODEL_LEVEL_0_BLOCKS = 4
MODEL_LEVEL_1_BLOCKS = 4
MODEL_LEVEL_2_BLOCKS = 5
BLOCK_REPEATS = [MODEL_LEVEL_0_BLOCKS, MODEL_LEVEL_1_BLOCKS, MODEL_LEVEL_2_BLOCKS]

# training
TRAINING_BATCH_SIZE = 64
TRAINING_SHUFFLE_BUFFER = 5000
TRAINING_BN_MOMENTUM = 0.9
TRAINING_BN_EPSILON = 0.001

TRAINING_LR_MAX = 0.003
TRAINING_LR_INIT_SCALE = 0.01
TRAINING_LR_INIT_EPOCHS = 7
TRAINING_LR_FINAL_SCALE = 0.01
TRAINING_LR_FINAL_EPOCHS = 23

# training (derived)
TRAINING_NUM_EPOCHS = TRAINING_LR_INIT_EPOCHS + TRAINING_LR_FINAL_EPOCHS
TRAINING_LR_INIT = TRAINING_LR_MAX * TRAINING_LR_INIT_SCALE
TRAINING_LR_FINAL = TRAINING_LR_MAX * TRAINING_LR_FINAL_SCALE

# saving
SAVE_MODEL_PATH = "F://Models/Model_Design/"

conv_params = {"padding": "same", "use_bias": False, "activation": None}

bn_params = {
    "axis": -1,
    "momentum": TRAINING_BN_MOMENTUM,
    "epsilon": TRAINING_BN_EPSILON,
    "center": True,
    "scale": True,
}

######################################################################
# DATA PROCESSING CIFAR DATASET
######################################################################


def pre_processing_train(example):
    """input a TensorFlow dataset of images, output a normalized image dataset of type int32 with random flips crops applied"""
    image = example["image"]
    label = example["label"]
    image = tf.math.divide(
        tf.math.subtract(tf.dtypes.cast(image, tf.float32), DATA_MEAN), DATA_STD_DEV
    )
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_crop(image, size=[DATA_CROP_ROWS, DATA_CROP_COLS, 3])
    label = tf.dtypes.cast(label, tf.int32)
    return image, label


def pre_processing_test(example):
    """Applies the same normalization as above and a crop with no randomness, converts to tf.int32."""
    image = example["image"]
    label = example["label"]
    image = tf.math.divide(
        tf.math.subtract(tf.dtypes.cast(image, tf.float32), DATA_MEAN), DATA_STD_DEV
    )
    image = tf.image.crop_to_bounding_box(
        image,
        (DATA_ROWS - DATA_CROP_ROWS) // 2,
        (DATA_COLS - DATA_CROP_COLS) // 2,
        DATA_CROP_ROWS,
        DATA_CROP_COLS,
    )
    label = tf.dtypes.cast(label, tf.int32)
    return image, label


def load_cifar():
    """Returns the CIFAR dataset as TensorFlow datasets.
    Note that the preprocessing functions above are applied.
    Note that shuffle -> batch -> prefetch are applied to improve datapipeline performance
    """
    # PREPARE THE CIFAR DATASET
    # download data and split into training and testing datasets
    dataset_train, info = tfds.load("cifar10", split=tfds.Split.TRAIN, with_info=True)
    dataset_test, info = tfds.load("cifar10", split=tfds.Split.TEST, with_info=True)

    dataset_train = dataset_train.map(pre_processing_train, num_parallel_calls=4)
    dataset_train = dataset_train.shuffle(buffer_size=TRAINING_SHUFFLE_BUFFER)
    dataset_train = dataset_train.batch(TRAINING_BATCH_SIZE)
    dataset_train = dataset_train.prefetch(buffer_size=3)

    # transform testing dataset
    dataset_test = dataset_test.map(pre_processing_test, num_parallel_calls=4)
    dataset_test = dataset_test.batch(TRAINING_BATCH_SIZE)
    dataset_test = dataset_test.prefetch(buffer_size=3)
    return dataset_train, dataset_test


######################################################################
# MODEL FUNCTIONS
######################################################################


def conv_block(inputs, filters, kernel_size=(3, 3), strides=(1, 1), activation=True):
    """Generic Conv -> BN -> ReLU abstraction"""
    x = Conv2D(filters, kernel_size, strides=strides, **conv_params)(inputs)
    x = BatchNormalization(**bn_params)(x)
    if activation:
        x = ReLU()(x)
    return x


def VGG_Like_CNN(
    tail_function,
    block_function,
    head_function,
    input_shape=None,
    block_repeats=None,
    num_downsamples=None,
    start_dims=32,
    block_params=None,
    **kwargs
):
    """
    This implements a VGG architecture from the given tail, body, and head block design. The body block will be repeated
    block_repeats number of times, with num_levels of downsampling (or num_downsamples if num_downsamples<num_levels)

    VGG architecture is characterized by repeated block with repeated designs, followed by downsampling in the heght,width dimension and
    expansion along the channel dimension.

    INPUTS:
    tail_function: function(in_tensor, dims, **kwargs) -> out tensor
    block_function: function(in_tensor, dims, downsampling=Bool, **kwargs) -> out tensor
    head_function: function(in_tensor, dims=None, **kwargs) -> out tensor
    input_shape: tuple- input shape of the network ex. (15,) or (3,32,32)
    block_repeats: list - number of block repeats for each level of VGG-like architecture
    num_downsamples: int - optional max number of downsamples to stop at
    start_dims: int - number of filters to be given to the head block. will double each level
    block_params: dictionary of kwargs to give to the block_function
    """
    model_input = Input(shape=input_shape)
    dims = int(start_dims)
    if block_params is None:
        block_params = {}

    # TAIL
    x = tail_function(model_input, dims)

    # BODY
    for level in range(len(block_repeats)):
        for block in range(block_repeats[level] - 1):
            x = block_function(x, dims, **block_params)

        if num_downsamples is not None:
            if level + 1 > num_downsamples:  # reached max num_downsamples
                continue

        dims = int(dims * 2)
        x = block_function(x, dims, downsample=True, **block_params)
        x = MaxPool2D()(x)

    # HEAD
    model_output = head_function(x, dims=dims)
    return tf.keras.Model(inputs=model_input, outputs=model_output)


def get_num_params(MODEL):
    """
    Returns the number of trainable parameters in a tensorflow Model. Great for comparing the size of two models.

    https://stackoverflow.com/questions/38160940/how-to-count-total-number-of-trainable-parameters-in-a-tensorflow-model"""
    total_params = 1
    for variable in MODEL.trainable_variables:
        variable_params = 1
        for dim in variable.shape.as_list():
            variable_params *= dim
        total_params += variable_params
    return total_params


######################################################################
# TRAINING FUNCTIONS FOR THE CIFAR DATASET
######################################################################


# learning rate schedule
def lr_schedule(epoch):
    """Creates a learning rate schedule for during training. An initial warmup (increasing lr) followed by decay (decreasing lr)"""
    if epoch < TRAINING_LR_INIT_EPOCHS:
        lr = (TRAINING_LR_MAX - TRAINING_LR_INIT) * (
            float(epoch) / TRAINING_LR_INIT_EPOCHS
        ) + TRAINING_LR_INIT
    else:
        lr = (TRAINING_LR_MAX - TRAINING_LR_FINAL) * max(
            0.0,
            math.cos(
                (
                    (float(epoch) - TRAINING_LR_INIT_EPOCHS)
                    / (TRAINING_LR_FINAL_EPOCHS - 1.0)
                )
                * (math.pi / 2.0)
            ),
        ) + TRAINING_LR_FINAL
    return lr


def plot_training_curves(history):
    """Plots accuracy and loss curves for training and validation data"""
    # training and validation data accuracy
    acc = history.history["accuracy"]
    val_acc = history.history["val_accuracy"]

    # training and validation data loss
    loss = history.history["loss"]
    val_loss = history.history["val_loss"]

    # plot accuracy
    plt.figure(figsize=(8, 8))
    plt.subplot(2, 1, 1)
    plt.plot(acc, label="Training Accuracy")
    plt.plot(val_acc, label="Validation Accuracy")
    plt.legend(loc="lower right")
    plt.ylabel("Accuracy")
    plt.ylim([min(plt.ylim()), 1])
    plt.title("Training and Validation Accuracy")

    # plot loss
    plt.subplot(2, 1, 2)
    plt.plot(loss, label="Training Loss")
    plt.plot(val_loss, label="Validation Loss")
    plt.legend(loc="upper right")
    plt.ylabel("Cross Entropy")
    plt.ylim([0, 2.0])
    plt.title("Training and Validation Loss")
    plt.xlabel("epoch")
    plt.show()


def train(MODEL, train, test, model_name, logs=False, save=True):
    """
    Trains the MODEL using the train and test datasets. Utilizes lr_scheduler and early stopping as well as
    optional Model checkpointing and csvlogging of epoch acc/loss scores.


    Inputs:
    MODEL: tf.keras.Model - used for training
    train, tests: tf.Datasets
    model_name: string - name of the trained model
    logs: Bool - whether to print logs for each training epoch
    save: Bool - whether to save the model

    Trains MODEL for TRAINING_NUM_EPOCHS epochs, saving best model at
    each epoch. Plots the training curve and evaluates the final model on
    the validation dataset.

    """
    print("######################################################")
    print(model_name)
    print("######################################################")

    callbacks = [tf.keras.callbacks.LearningRateScheduler(lr_schedule)]
    # tf.keras.callbacks.EarlyStopping(patience=4)]
    if save:
        # CREATE PATH TO SAVEDMODEL if not exist
        save_path = Path(str(SAVE_MODEL_PATH) + model_name + "/")
        save_path.mkdir(parents=True, exist_ok=True)
        callbacks.append(
            tf.keras.callbacks.ModelCheckpoint(
                filepath=str(save_path),
                save_best_only=True,
                period=10,
                monitor="val_loss",
                verbose=0,
            )
        )
        callbacks.append(tf.keras.callbacks.CSVLogger(str(save_path / "train_log.csv")))

    # training
    initial_epoch_num = 0
    print("Training model {}...".format(model_name))
    history = MODEL.fit(
        x=train,
        epochs=TRAINING_NUM_EPOCHS,
        verbose=logs,
        callbacks=callbacks,
        validation_data=test,
        initial_epoch=initial_epoch_num,
    )

    print("Training complete.")
    return history


def benchmark(MODEL, test, history, model_name):
    """Plots training curves and prints final val accuracy/loss"""
    # plot accuracy and loss curves
    plot_training_curves(history)
    # test
    test_loss, test_accuracy = MODEL.evaluate(x=test)
    print("Test loss:     ", test_loss)
    print("Test accuracy: ", test_accuracy)


######################################################################
# COMPARING MODEL PERFORMANCES
######################################################################


def get_hists(list_of_model_names):
    """
    Loads the archived training csv logs into dataframes returns a list of pandas dataframes

    input: list of strings: model names to be compared
    """
    hists = []
    for model_name in list_of_model_names:
        path = Path(str(SAVE_MODEL_PATH) + model_name + "/train_log.csv")
        hist = pd.read_csv(path)
        hists.append(hist)
    return hists


def plot_multiple_training_curves(model_names):
    """
    Plots the side-by-side validation losses and accuracies for multiple models from their training csv logs.


    input
    model_names: list of strings - the name of the directory the model was saved to in train()

    """
    list_of_hists = get_hists(model_names)

    plt.figure(figsize=(8, 8))
    plt.subplot(2, 1, 1)
    for C, hist in zip(model_names, list_of_hists):
        # training and validation data accuracy
        val_acc = hist["val_accuracy"]
        # plot accuracy
        plt.plot(val_acc, label="Validation Accuracy: {}".format(C))
    plt.legend(loc="lower right")
    plt.ylabel("Accuracy")
    plt.ylim([min(plt.ylim()), 1])
    plt.title("Validation Accuracies")

    plt.subplot(2, 1, 2)
    for C, hist in zip(model_names, list_of_hists):
        # training and validation data loss
        val_loss = hist["val_loss"]
        # plot loss
        plt.plot(val_loss, label="Validation Loss: {}".format(C))
    plt.legend(loc="upper right")
    plt.ylabel("Cross Entropy")
    plt.ylim([0, 2.0])
    plt.title("Validation Losses")
    plt.xlabel("epoch")
    plt.show()


def timeit(MODEL, ds, steps=100):
    """
    Timing method for data pipeline iterator.
    Outputs the time for one-thousand calls to the iterator
    """
    start = time.time()
    it = iter(ds)
    for i in range(steps):
        X, y = next(it)
        if i % 10 == 0:
            print(".", end="")
        MODEL.predict(X)

    print()
    end = time.time()
    avg = (end - start) / steps
    print("{} batches: {}s/batch".format(steps, avg))

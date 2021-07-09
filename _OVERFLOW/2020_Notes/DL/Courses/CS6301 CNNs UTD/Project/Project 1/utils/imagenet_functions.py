"""
IMAGENET_FUNCTIONS

A collection of utility functions to speed up the process of model implementations. The idea being to reduce the amount of boilerplate code in each notebook, so the focus can be on the coding of the model architecture.

"""
import tensorflow as tf
import numpy as np
from pathlib import Path
import os

######################################################################
# TRAINING HYPERPARAMETERS
######################################################################


DATA_NUM_CLASSES = 200
DATA_CHANNELS = 3
DATA_ROWS = 64
DATA_COLS = 64
DATA_CROP_ROWS = 56
DATA_CROP_COLS = 56
DATA_MEAN = np.array([[[0.485, 0.456, 0.406]]])  # IMAGENET
DATA_STD_DEV = np.array([[[0.229, 0.224, 0.225]]])  # IMAGENET

# model
MODEL_LEVEL_0_BLOCKS = 2
MODEL_LEVEL_1_BLOCKS = 2
MODEL_LEVEL_2_BLOCKS = 3
MODEL_LEVEL_3_BLOCKS = 4
BLOCK_REPEATS = [
    MODEL_LEVEL_0_BLOCKS,
    MODEL_LEVEL_1_BLOCKS,
    MODEL_LEVEL_2_BLOCKS,
    MODEL_LEVEL_3_BLOCKS,
]

# training
TRAINING_BATCH_SIZE = 32
TRAINING_SHUFFLE_BUFFER = 5000
TRAINING_BN_MOMENTUM = 0.9
TRAINING_BN_EPSILON = 0.001

TRAINING_LR_MAX = 0.001
TRAINING_LR_INIT_SCALE = 0.01
TRAINING_LR_INIT_EPOCHS = 10
TRAINING_LR_FINAL_SCALE = 0.01
TRAINING_LR_FINAL_EPOCHS = 50

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
# DATA PROCESSING TINY IMAGENET DATASET
######################################################################

# Need a function to map to the datafle dataset above
def get_label(file_path):
    # convert the path to a list of path components
    parts = tf.strings.split(file_path, os.path.sep)
    # The second to last is the class-directory
    return tf.argmax(tf.dtypes.cast(parts[-2] == CLASS_NAMES, tf.int8), axis=0)


def decode_image(img, train=True):
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = tf.math.divide(
        tf.math.subtract(tf.dtypes.cast(img, tf.float32), DATA_MEAN), DATA_STD_DEV
    )
    if train:
        img = tf.image.random_flip_left_right(img)
        img = tf.image.random_crop(img, size=[56, 56, 3])
    else:
        img = tf.image.crop_to_bounding_box(img, (64 - 56) // 2, (64 - 56) // 2, 56, 56)
    return img


def process_train_path(path):
    """
    Input: file_path of a sample image
    Output: image in 3x64x64 float32 Tensor and one hot tensor
    """
    label = get_label(path)
    image = tf.io.read_file(path)
    image = decode_image(image, train=True)
    return image, label


def process_test_path(path):
    """
    Input: file_path of a sample image
    Output: image in 3x64x64 float32 Tensor and one hot tensor
    """
    label = get_label(path)
    image = tf.io.read_file(path)
    image = decode_image(image, train=False)
    return image, label


def prepare_for_training(ds, cache=True):
    if cache:
        if isinstance(cache, str):
            ds = ds.cache(cache)
        else:
            ds = ds.cache()
    ds = ds.shuffle(buffer_size=TRAINING_SHUFFLE_BUFFER)
    ds = ds.batch(TRAINING_BATCH_SIZE)
    ds = ds.prefetch(buffer_size=AUTOTUNE)
    return ds


def load_imagenet(imagenet_path=None):
    global AUTOTUNE
    AUTOTUNE = tf.data.experimental.AUTOTUNE
    if imagenet_path is None:
        imagenet_path = "F://Data/Images/ImageNet/tiny-imagenet-200"

    global CLASS_NAMES
    CLASS_NAMES = np.array(os.listdir(imagenet_path + "/train/"))

    # TRAIN DATASET
    train_root = Path(imagenet_path) / "train"
    train_files = tf.data.Dataset.list_files(str(train_root / "*/*"))
    # map dataset of fiple-paths to (image, label) pairs
    train_imgs = train_files.map(process_train_path, num_parallel_calls=AUTOTUNE)
    train_ds_cachefile = prepare_for_training(
        train_imgs, cache="F://Data/Images/ImageNet/tf-cachefiles/imagenet.tfcache"
    )

    # TEST DATASET
    test_root = Path(imagenet_path) / "val"
    test_files = tf.data.Dataset.list_files(str(test_root / "*/*"))
    # map dataset of fiple-paths to (image, label) pairs
    test_imgs = test_files.map(process_test_path, num_parallel_calls=AUTOTUNE)
    test_ds_nocache = prepare_for_training(test_imgs, cache=False)
    return train_ds_cachefile, test_ds_nocache

import random
import sys
import zipfile
import os
import torch
from torch.utils.data import TensorDataset, DataLoader
import torch.nn as nn
from torch import optim
import torch.nn.functional as F


if len(sys.argv) < 4:
    print("First arg is path to dataset")
    print("Second arg is path to W2V")
    print("Third is GPU")

GPU = False
if len(sys.argv) == 4:
    if sys.argv[3] == "gpu":
        print("Turning on GPU Mode...")
        GPU = True
    else:
        print("Third argument must be 'gpu'")


def read_file(path_to_dataset, train=True):
    """
    :param path_to_dataset: a path to the tar file (dataset)
    :return: two lists, one containing the movie reviews and another containing the corresponding labels
    """
    if train:
        basepath = os.path.join("movie_reviews", "train")
    else:
        basepath = os.path.join("movie_reviews", "test")

    with zipfile.ZipFile(path_to_dataset, "r") as zip_ref:
        zip_ref.extractall(".")

    negs = os.listdir(os.path.join(basepath, "neg"))
    pos = os.listdir(os.path.join(basepath, "pos"))
    reviews = []
    sentiment = []
    for path in negs:
        if not path[-3:] == "txt":
            continue
        with open(os.path.join(basepath, "neg", path)) as f:
            reviews.append(f.read())
            sentiment.append("NEGATIVE")
    for path in pos:
        if not path[-3:] == "txt":
            continue
        with open(os.path.join(basepath, "pos", path)) as f:
            reviews.append(f.read())
            sentiment.append("POSITIVE")

    reviews = [
        i.replace("\n", "").replace("'", " ").replace("-", " ").lower() for i in reviews
    ]

    return (reviews, sentiment)


def make_vocab(text):
    """
    :param text: list of sentences or movie reviews
    :return: a dict of all tokens you encounter in the dataset. i.e. the vocabulary of the dataset
    Associate each token with a unique integer
    """

    if type(text) is not list:
        sys.exit("Please provide a list to the method")

    vocab = dict()
    vocab["<UNKNOWN>"] = 0
    i = 1
    for review in text:
        for word in review.split():
            if word in vocab:
                continue
            else:
                vocab[word] = i
                i += 1
    return vocab


def encode_review(vocab, text):
    """
    :param vocab: the vocabulary dictionary you obtained from the previous method
    :param text: list of movie reviews obtained from the previous method
    :return: encoded reviews
    """

    if type(vocab) is not dict or type(text) is not list:
        sys.exit("Please provide a list to the method")
    encoded_reviews = []
    for review in text:
        rev = []
        for word in review.split():
            if word in vocab:
                rev.append(vocab[word])
            else:
                rev.append(0)
        encoded_reviews.append(rev)
    return encoded_reviews


def encode_labels(
    labels,
):  # Note this method is optional (if you have not integer-encoded the labels)
    """
    :param labels: list of labels associated with the reviews
    :return: encoded labels
    """

    if type(labels) is not list:
        sys.exit("Please provide a list to the method")

    return [1 if lab == "POSITIVE" else 0 for lab in labels]


def pad_zeros(encoded_reviews, seq_length=200):
    """
    :param encoded_reviews: integer-encoded reviews obtained from the previous method
    :param seq_length: maximum allowed sequence length for the review
    :return: encoded reviews after padding zeros
    """

    if type(encoded_reviews) is not list:
        sys.exit("Please provide a list to the method")
    out = []
    for review in encoded_reviews:
        if len(review) > seq_length:
            out.append(review[:seq_length])
        elif len(review) < seq_length:
            x = [] + review
            for i in range(seq_length - len(review)):
                x.append(0)
            out.append(x)
        else:
            out.append(review)
    return out


def load_embedding_file(embedding_file, token_dict):
    """
    :param embedding_file: path to the embedding file
    :param token_dict: token-integer mapping dict obtained from previous step
    :return: embedding dict: embedding vector-integer mapping
    """

    if not os.path.isfile(embedding_file):
        sys.exit("Input embedding path is not a file")
    if type(token_dict) is not dict:
        sys.exit("Input a dictionary!")

    vocab_length = len(token_dict)
    w2v = torch.zeros(vocab_length + 1, 300)

    with zipfile.ZipFile(embedding_file, "r") as zip_ref:
        zip_ref.extractall(".")

    header = True
    with open("wiki-news-300d-1M.vec", "r", encoding="latin1") as f:
        for vec in f:
            if header:
                header = False
                continue
            vec = vec.split()
            word = vec[0]
            vec = vec[1:]
            if word in token_dict:
                num = token_dict[word]
                w2v[num] = torch.FloatTensor([float(i) for i in vec])
            else:
                continue
    return w2v


# Task 3: Create a TensorDataset and DataLoader


def create_data_loader(encoded_reviews, labels, BATCH_SIZE=32, test=False):
    """
    :param encoded_reviews: zero-paddded integer-encoded reviews
    :param labels: integer-encoded labels
    :param batch_size: batch size for training
    :return: DataLoader object
    """

    if type(encoded_reviews) is not list or type(labels) is not list:
        sys.exit("Please provide a list to the method")

    encoded_reviews = torch.tensor(encoded_reviews, dtype=torch.long)
    labels = torch.tensor(labels, dtype=torch.float)
    if test:
        return TensorDataset(encoded_reviews, labels)
    Data = DataLoader(
        TensorDataset(encoded_reviews, labels), shuffle=True, batch_size=BATCH_SIZE
    )
    return Data


def make_dl(__vocab, __text, __labels, SEQ_LENGTH=100, BATCH_SIZE=300, test=False):
    encoded_text = encode_review(__vocab, __text)
    encoded_label = encode_labels(__labels)
    encoded_text = pad_zeros(encoded_text, seq_length=SEQ_LENGTH)
    dl = create_data_loader(
        encoded_text, encoded_label, BATCH_SIZE=BATCH_SIZE, test=test
    )
    return dl


def fit(
    model, Train_Data, Valid_Data, Test_Data, epochs, lr, gpu=False, model_name="model"
):
    loss_func = nn.BCEWithLogitsLoss()
    if gpu:
        device = torch.device("cuda")
        model = model.to(device)
        loss_func = loss_func.to(device)
    else:
        device = torch.device("cpu")
    opt = optim.Adam(model.parameters(), lr=lr)

    train_loss = []
    val_loss = []
    for epoch in range(epochs):
        model.train()
        for xb, yb in Train_Data:
            if gpu:
                xb = xb.to(device)
                yb = yb.to(device)

            pred = model(xb)
            loss = loss_func(pred, yb)
            loss.backward()
            opt.step()
            opt.zero_grad()

        train_loss.append(loss.item())
        model.eval()  # call this to keep models like batchnorm and dropout
        with torch.no_grad():
            xv, yv = Valid_Data[:1000]
            if gpu:
                xv, yv = xv.to(device), yv.to(device)
            valid = torch.mean(loss_func(model(xv), yv))
            val_loss.append(valid.item())

    model.eval()
    x_test, y_test = Test_Data[:]
    if gpu:
        x_test, y_test = x_test.to("cuda"), y_test.to("cuda")

    with torch.no_grad():
        preds = torch.round(torch.sigmoid(model(x_test)))
        correct = (preds == y_test).float()
        acc = correct.sum() / len(correct)
        print("accuracy", acc.item())
    return train_loss, val_loss


batch_size = 500

# READ IN THE DATA -> Make training set
path_to_dataset = sys.argv[1]
embedding_file = sys.argv[2]

print("READING IN THE DATA...")
text, labels = read_file(path_to_dataset, train=True)
vocab = make_vocab(text)

print("making dataloaders for train, validation, and test...")
train_dl = make_dl(vocab, text, labels, BATCH_SIZE=batch_size)


# READ IN VALIDATION AND TEST DATA
text, labels = read_file(path_to_dataset, train=False)

to_shuff = list(zip(text, labels))
random.shuffle(to_shuff)
text, labels = zip(*to_shuff)
text, labels = list(text), list(labels)
split = len(text) // 2
val_text, val_labels = text[:split], labels[:split]
test_text, test_labels = text[split:], labels[split:]

val_dl = make_dl(vocab, val_text, val_labels, BATCH_SIZE=batch_size, test=True)
test_dl = make_dl(vocab, test_text, test_labels, BATCH_SIZE=batch_size, test=True)

print("loading word2vec embeddings...")
# EMBEDDINGS
w2v = load_embedding_file(embedding_file, vocab)
print()
print("BEGINNING MODEL TRAINING!")
print()
####################################################################################

# This is the baseline model that contains an embedding layer and an fcn for classification
class BaseSentiment(nn.Module):
    def __init__(self, embedding, seq_length=200):
        super(BaseSentiment, self).__init__()
        self.seq_length = seq_length
        self.embedding = nn.EmbeddingBag.from_pretrained(embedding)
        self.fc1 = nn.Linear(300, 1)

    def forward(self, input_words):
        emb = self.embedding(input_words)
        res = self.fc1(emb)
        return res.squeeze()


# Task 7: Start model training and testing
epochs = 100
lr = 0.01

print("Training baseline model (100 epochs, lr=0.01)...")
fcn = BaseSentiment(w2v)
train_loss, val_loss = fit(fcn, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()
####################################################################################


# This model contains an embedding layer, an rnn and an fcn for classification
class RNNSentiment(nn.Module):
    def __init__(
        self,
        embedding,
        num_layers=1,
        seq_length=200,
        hidden_size=30,
        bidirectional=False,
    ):
        super(RNNSentiment, self).__init__()
        self.embedding = nn.Embedding.from_pretrained(embedding)

        self.rnn = nn.RNN(
            input_size=300,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            bidirectional=bidirectional,
        )
        self.fc1 = nn.Linear(hidden_size, 1)

    def forward(self, input_words):
        emb = self.embedding(input_words)
        res, h = self.rnn(emb)
        return self.fc1(h.squeeze(0)).squeeze()


# Task 7: Start model training and testing
num_layers = 1
hidden_size = 50
epochs = 50
lr = 0.001

print("Training Vanilla RNN (50 epochs, hidden_size=50, 1 layer)")
rnn = RNNSentiment(w2v, num_layers=num_layers, hidden_size=hidden_size)
train_loss, val_loss = fit(rnn, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()

####################################################################################


class LSTMSentiment(nn.Module):
    def __init__(
        self,
        embedding,
        num_layers=2,
        seq_length=200,
        hidden_size=100,
        bidirectional=False,
        dropout=0.2,
    ):
        super().__init__()
        self.seq_length = seq_length

        self.embedding = nn.Embedding.from_pretrained(embedding)
        self.lstm = nn.LSTM(
            input_size=300,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            bidirectional=bidirectional,
            dropout=dropout,
        )

        self.fc1 = nn.Linear(hidden_size * 2, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, input_words):
        emb = self.dropout(self.embedding(input_words))
        lstm_out, (hidden, cell_state) = self.lstm(emb)
        out = self.dropout(torch.cat((hidden[-2, :, :], hidden[-1, :, :]), dim=1))
        vec = self.fc1(out)
        return vec.squeeze()


# Task 7: Start model training and testing
num_layers = 2
bidirectional = False
hidden_size = 100
epochs = 50
dropout = 0.8
lr = 0.001

print("Training LSTM (50 epochs, 2 layers, hidden_size=100, dropout=0.8)")
lstm = LSTMSentiment(
    w2v,
    num_layers=num_layers,
    bidirectional=bidirectional,
    hidden_size=hidden_size,
    dropout=dropout,
)
train_loss, val_loss = fit(lstm, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()
####################################################################################

# Task 7: Start model training and testing
num_layers = 2
bidirectional = True
hidden_size = 100
epochs = 50
dropout = 0.8
lr = 0.001

print("Training Bidirectional LSTM (50 epochs, 2 layers, hidden_size=100, dropout=0.8)")
bilstm = LSTMSentiment(
    w2v,
    num_layers=num_layers,
    bidirectional=bidirectional,
    hidden_size=hidden_size,
    dropout=dropout,
)
train_loss, val_loss = fit(bilstm, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()

####################################################################################


class GRUSentiment(nn.Module):
    def __init__(
        self,
        embedding,
        num_layers=1,
        seq_length=200,
        hidden_size=20,
        bidirectional=False,
        dropout=0.2,
    ):
        super().__init__()
        self.embedding = nn.Embedding.from_pretrained(embedding)
        self.rnn = nn.GRU(
            input_size=300,
            hidden_size=hidden_size,
            num_layers=num_layers,
            dropout=dropout,
            batch_first=True,
            bidirectional=bidirectional,
        )
        self.fc1 = nn.Linear(hidden_size * 2, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, input_words):
        emb = self.embedding(input_words)
        res, hidden = self.rnn(emb)
        out = self.dropout(torch.cat((hidden[-2, :, :], hidden[-1, :, :]), dim=1))
        vec = self.fc1(out)
        return vec.squeeze()


# Task 7: Start model training and testing
num_layers = 2
bidirectional = False
hidden_size = 100
epochs = 50
dropout = 0.5
lr = 0.001

print("Training GRU (50 epochs, 2 layers, hidden_size=100, dropout=0.8)")
gru = GRUSentiment(
    w2v,
    num_layers=num_layers,
    bidirectional=bidirectional,
    hidden_size=hidden_size,
    dropout=dropout,
)
train_loss, val_loss = fit(gru, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()
####################################################################################

# This model contains an embedding layer, self-attention and an fcn for classification
class ConvSentiment(nn.Module):
    def __init__(self, embedding, n_filters=30, dropout=0.2):
        super(ConvSentiment, self).__init__()
        self.embedding = nn.Embedding.from_pretrained(embedding)
        self.conv_0 = nn.Conv2d(
            in_channels=1, out_channels=n_filters, kernel_size=(2, 300)
        )
        self.conv_1 = nn.Conv2d(
            in_channels=1, out_channels=n_filters, kernel_size=(3, 300)
        )
        self.conv_2 = nn.Conv2d(
            in_channels=1, out_channels=n_filters, kernel_size=(5, 300)
        )
        self.fc1 = nn.Linear(3 * n_filters, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, input_words):
        emb = self.embedding(input_words).unsqueeze(1)
        conv0 = F.relu(self.conv_0(emb).squeeze(3))
        conv1 = F.relu(self.conv_1(emb).squeeze(3))
        conv2 = F.relu(self.conv_2(emb).squeeze(3))
        pool0 = F.max_pool1d(conv0, conv0.shape[2]).squeeze(2)
        pool1 = F.max_pool1d(conv1, conv1.shape[2]).squeeze(2)
        pool2 = F.max_pool1d(conv2, conv2.shape[2]).squeeze(2)
        comb = self.dropout(torch.cat((pool0, pool1, pool2), dim=1))
        return self.fc1(comb).squeeze()


# Task 7: Start model training and testing
n_filters = 40
dropout = 0.8
epochs = 70
lr = 0.001


print("Training ConvNet (70 epochs, 40 filters, dropout=0.8)")
conv = ConvSentiment(w2v, n_filters=n_filters, dropout=dropout)
train_loss, val_loss = fit(conv, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)
print()
####################################################################################


# This model contains an embedding layer, self-attention and an fcn for classification
class AttentionSentiment(nn.Module):
    def __init__(self, embedding, seq_length=200):
        super(AttentionSentiment, self).__init__()
        self.embedding = nn.Embedding.from_pretrained(embedding)
        self.MultiheadAttention = nn.MultiheadAttention(300, 1)
        self.fc1 = nn.Linear(30000, 1)

    def forward(self, input_words):
        emb = self.embedding(input_words)
        res, _ = self.MultiheadAttention(emb, emb, emb)
        res = res.reshape(res.shape[0], -1)
        return self.fc1(res).squeeze()


# Task 7: Start model training and testing
num_layers = 2
bidirectional = False
hidden_size = 40
epochs = 50
dropout = 0.5
lr = 0.01


print("Training Attention Model epochs = 50, lr=0.01")
att = AttentionSentiment(w2v)
train_loss, val_loss = fit(att, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)

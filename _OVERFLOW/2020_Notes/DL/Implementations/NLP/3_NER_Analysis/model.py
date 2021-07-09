from nltk.stem import PorterStemmer
import nltk

nltk.download("wordnet")
from nltk.corpus import wordnet as wn
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score, f1_score
from sklearn.metrics import recall_score, precision_score
import pandas as pd
import torch
from torch.utils.data import TensorDataset, DataLoader
import torch.nn as nn
import torch.nn.functional as F
from torch import optim
import os
import sys
import random

print("\n\n")
if len(sys.argv) < 2:
    print("First arg is path to W2V")
    print("Second is GPU")

GPU = False
if len(sys.argv) == 3:
    if sys.argv[2] == "gpu":
        print("Turning on GPU Mode...")
        GPU = True
    else:
        print("Second argument must be 'gpu'")


######################################################################
# data extraction
with open("train.txt", "r") as f:
    data = []
    sentence = []
    for line in f:
        if line == "\n":
            data.append(sentence)
            sentence = []
        else:
            sentence.append(line.split())
data = data[1:]


porter = PorterStemmer()
X = []
print("Extracting Data...")
for sentence in data:
    for i, word in enumerate(sentence):
        features = {
            "Word": None,
            "POS": None,
            "Prev_POS": None,
            "Is_Capitalized": None,
            "Hypernym": None,
            "Hyponym": None,
            "Holonym": None,
            "Meronym": None,
            "Target": None,
        }

        features["Word"] = porter.stem(word[0].lower())
        features["POS"] = word[1]
        if i == 0:
            pass
        else:
            features["Prev_POS"] = sentence[i - 1][1]
        features["Is_Capitalized"] = word[0][0].isupper()
        ss = wn.synsets(word[0].lower())
        if len(ss) == 0:
            pass
        else:
            for j, sym in enumerate(ss):
                name = sym.name()
                if name[: name.find(".")] != word[0].lower():
                    continue
                else:
                    if len(ss[j].hypernyms()) > 0:
                        Hypernym = ss[j].hypernyms()[0].name()
                        features["Hypernym"] = Hypernym[: Hypernym.find(".")]

                    if len(ss[j].hyponyms()) > 0:
                        Hyponym = ss[j].hyponyms()[0].name()
                        features["Hyponym"] = Hyponym[: Hyponym.find(".")]

                    if len(ss[j].part_holonyms()) > 0:
                        Holonym = ss[j].part_holonyms()[0].name()
                        features["Holonym"] = Holonym[: Holonym.find(".")]

                    if len(ss[j].part_meronyms()) > 0:
                        Meronym = ss[j].part_meronyms()[0].name()
                        features["Meronym"] = Meronym[: Meronym.find(".")]
                    break

        features["Target"] = word[-1]
        X.append(features)


df = pd.DataFrame(X)
df["Text"] = df.Word.str.cat(
    [df.Hyponym, df.Hypernym, df.Meronym, df.Holonym, df.POS, df.Prev_POS],
    sep=" ",
    na_rep="",
)
df.drop(
    ["Holonym", "Hypernym", "Hyponym", "Meronym", "Word", "POS", "Prev_POS"],
    axis=1,
    inplace=True,
)


#########################################################################################
# Logistic Regression with Sklearn


y = df.Target
df = df.drop(["Target"], axis=1)
X_train, X_test, y_train, y_test = train_test_split(df, y, shuffle=True, random_state=0)

print("Training logistic regression...")
vc = CountVectorizer()
X_train = vc.fit_transform(X_train.Text)
X_test = vc.transform(X_test.Text)
print()
lr = LogisticRegression()
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)
print("Logistic Regression results")
print("Accuracy: ", accuracy_score(y_test, y_pred))
print("Recall: ", recall_score(y_test, y_pred, average="weighted"))
print("Precision: ", precision_score(y_test, y_pred, average="weighted"))
print("F1 Score: ", f1_score(y_test, y_pred, average="weighted"))
print()
print(classification_report(y_test, y_pred))

######################################################################################
# Deep Learning
print("\n")


def load_data(train=True):
    if train:
        path = "train.txt"
    else:
        path = "test.txt"
    with open(path, "r") as f:
        data = []
        labels = []
        sentence = []
        sentence_labels = []
        for line in f:
            if line == "\n":
                data.append(sentence)
                labels.append(sentence_labels)
                sentence = []
                sentence_labels = []
            else:
                sentence.append(line.split()[0])
                sentence_labels.append(line.split()[-1])
    return data[1:], labels[1:]


def make_vocab(text, label=False):
    """
    :param text: list of sentences or movie reviews
    :return: a dict of all tokens you encounter in the dataset. i.e. the vocabulary of the dataset
    Associate each token with a unique integer
    """
    if type(text) is not list:
        sys.exit("Please provide a list to the method")

    vocab = dict()
    if not label:
        vocab["<UNKNOWN>"] = 0
        vocab["<PAD>"] = 1
        i = 2
    else:
        i = 0
    for sentence in text:
        for word in sentence:
            if word in vocab:
                continue
            else:
                vocab[word] = i
                i += 1
    return vocab


def encode_text(vocab, text):
    """
    :param vocab: the vocabulary dictionary you obtained from the previous method
    :param text: list of movie reviews obtained from the previous method
    :return: encoded reviews
    """
    if type(vocab) is not dict or type(text) is not list:
        sys.exit("Please provide a list to the method")
    encoded_text = []
    for sentence in text:
        rev = []
        for word in sentence:
            if word in vocab:
                rev.append(vocab[word])
            else:
                rev.append(vocab["<UNKNOWN>"])
        encoded_text.append(rev)
    return encoded_text


def encode_labels(labels, label_vocab):
    encoded_labels = encode_text(label_vocab, labels)
    return encoded_labels


def pad_data(encoded_text, encoded_labels):
    max_len = max([len(s) for s in encoded_text])
    batch_data = torch.ones((len(encoded_text), max_len))
    batch_labels = -1 * torch.ones((len(encoded_labels), max_len))
    for j in range(len(encoded_text)):
        length = len(encoded_text[j])
        batch_data[j][:length] = torch.tensor(encoded_text[j])
        batch_labels[j][:length] = torch.tensor(encoded_labels[j])
    return batch_data.type(torch.LongTensor), batch_labels.type(torch.LongTensor)


def create_data_loader(encoded_text, encoded_labels, BATCH_SIZE=32, test=False):
    """
    :param encoded_reviews: zero-paddded integer-encoded reviews
    :param labels: integer-encoded labels
    :param batch_size: batch size for training
    :return: DataLoader object
    """
    if type(encoded_text) is not list or type(labels) is not list:
        sys.exit("Please provide a list to the method")

    encoded_text, encoded_labels = pad_data(encoded_text, encoded_labels)
    if test:
        return TensorDataset(encoded_text, encoded_labels)
    else:
        return DataLoader(
            TensorDataset(encoded_text, encoded_labels),
            shuffle=True,
            batch_size=BATCH_SIZE,
        )


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

    header = True
    with open(embedding_file, "r", encoding="latin1") as f:
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


def prepare_dl(text, text_vocab, label_vocab, labels, test=False):
    encoded_text = encode_text(text_vocab, text)
    encoded_label = encode_labels(labels, label_vocab)
    data = create_data_loader(encoded_text, encoded_label, BATCH_SIZE=32, test=test)
    return data


def loss_fn(outputs, labels):
    labels = labels.view(-1)
    mask = (labels >= 0).float()
    num_tokens = int(torch.sum(mask).item())
    outputs = outputs[range(outputs.shape[0]), labels] * mask
    return -torch.sum(outputs) / num_tokens


def print_metrics(outputs, labels):
    labels = labels.view(-1)
    outputs = outputs.argmax(dim=1)
    mask = labels >= 0
    y_test = labels[mask].cpu()
    y_pred = outputs[mask].cpu()
    print("Accuracy: ", accuracy_score(y_test, y_pred))
    print("Recall: ", recall_score(y_test, y_pred, average="weighted"))
    print("Precision: ", precision_score(y_test, y_pred, average="weighted"))
    print("F1 Score: ", f1_score(y_test, y_pred, average="weighted"))
    print()
    print(classification_report(y_test, y_pred, target_names=label_names))


def fit(
    model, Train_Data, Valid_Data, Test_Data, epochs, lr, gpu=False, model_name="model"
):
    if gpu:
        device = torch.device("cuda")
        model = model.to(device)
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
            loss = loss_fn(pred, yb)
            loss.backward()
            opt.step()
            opt.zero_grad()

        train_loss.append(loss.item())
        model.eval()  # call this to keep models like batchnorm and dropout
        with torch.no_grad():
            xv, yv = Valid_Data[:1000]
            if gpu:
                xv, yv = xv.to(device), yv.to(device)
            valid = loss_fn(model(xv), yv)
            val_loss.append(valid.item())
            print("Epoch {} Validation Loss: {}".format(epoch + 1, valid.item()))

    model.eval()
    with torch.no_grad():
        x_test, y_test = Test_Data[:]
        if gpu:
            x_test, y_test = x_test.to("cuda"), y_test.to("cuda")
        preds = model(x_test)
        print_metrics(preds, y_test)
    model.to(torch.device("cpu"))
    return train_loss, val_loss


class LSTM(nn.Module):
    def __init__(self, embedding, hidden_size=100, num_tags=9, bidirectional=False):
        super(LSTM, self).__init__()

        self.embedding = nn.Embedding.from_pretrained(embedding)

        self.lstm = nn.LSTM(
            input_size=300,
            hidden_size=hidden_size,
            batch_first=False,
            bidirectional=bidirectional,
        )
        self.fc1 = nn.Linear(hidden_size * 2, num_tags)

    def forward(self, input_words):
        emb = self.embedding(input_words)
        out, _ = self.lstm(emb)
        out = out.view(-1, out.shape[2])
        vec = self.fc1(out)
        res = F.log_softmax(vec, dim=1)
        return res


print()


print("Loading embeddings...")
text, labels = load_data(train=True)
text_vocab = make_vocab(text)
label_vocab = make_vocab(labels, label=True)

embedding_file = sys.argv[1]
w2v = load_embedding_file(embedding_file, text_vocab)

train_dl = prepare_dl(text, text_vocab, label_vocab, labels, test=False)
print()
print("Loading Validation Data...")
text, labels = load_data(train=False)

split = len(text) // 2
val_text, val_labels = text[:split], labels[:split]
test_text, test_labels = text[split:], labels[split:]

val_dl = prepare_dl(val_text, text_vocab, label_vocab, val_labels, test=True)
test_dl = prepare_dl(test_text, text_vocab, label_vocab, test_labels, test=True)

import operator

label_names = [i[0] for i in sorted(label_vocab.items(), key=operator.itemgetter(1))]

print()


bidirectional = True
hidden_size = 36
num_tags = 9

epochs = 7
lr = 0.001

bilstm = LSTM(
    w2v, num_tags=num_tags, bidirectional=bidirectional, hidden_size=hidden_size
)

print("Training Bidirectional LSTM")
print()
train_loss, val_loss = fit(bilstm, train_dl, val_dl, test_dl, epochs, lr, gpu=GPU)

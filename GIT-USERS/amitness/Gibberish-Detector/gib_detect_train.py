#!/usr/bin/python

import math
import pickle

accepted_chars = "abcdefghijklmnopqrstuvwxyz "

pos = dict([(char, idx) for idx, char in enumerate(accepted_chars)])


def normalize(line):
    """ Return only the subset of chars from accepted_chars.
    This helps keep the  model relatively small by ignoring punctuation, 
    infrequently symbols, etc. """
    return [c.lower() for c in line if c.lower() in accepted_chars]


def ngram(n, l):
    """ Return all n grams from l after normalizing """
    filtered = normalize(l)
    for start in range(0, len(filtered) - n + 1):
        yield "".join(filtered[start : start + n])


def get_lines():
    datasets = ["big.txt"]
    for filename in datasets:
        with open(filename) as fp:
            for line in fp:
                yield line


def train():
    """ Write a simple model as a pickle file """
    k = len(accepted_chars)
    # Assume we have seen 10 of each character pair.  This acts as a kind of
    # prior or smoothing factor.  This way, if we see a character transition
    # live that we've never observed in the past, we won't assume the entire
    # string has 0 probability.
    counts = [[[10 for _ in range(k)] for _ in range(k)] for _ in range(k)]

    # Count transitions from big text file, taken
    # from http://norvig.com/spell-correct.html
    for line in get_lines():
        for a, b, c in ngram(3, line):
            counts[pos[a]][pos[b]][pos[c]] += 1

    # Normalize the counts so that they become log probabilities.
    # We use log probabilities rather than straight probabilities to avoid
    # numeric underflow issues with long texts.
    # This contains a justification:
    # http://squarecog.wordpress.com/2009/01/10/dealing-with-underflow-in-joint-probability-calculations/
    for i, first in enumerate(counts):
        for j, second in enumerate(first):
            s = float(sum(second))
            for k, third in enumerate(second):
                counts[i][j][k] = math.log(third / s)

    # Find the probability of generating a few arbitrarily chosen good and
    # bad phrases.
    good_probs = [avg_transition_prob(l, counts) for l in open("good.txt")]
    bad_probs = [avg_transition_prob(l, counts) for l in open("bad.txt")]

    # Assert that we actually are capable of detecting the junk.
    # assert min(good_probs) > max(bad_probs)

    # And pick a threshold halfway between the worst good and best bad inputs.
    thresh = (min(good_probs) + max(bad_probs)) / 2
    pickle.dump({"mat": counts, "thresh": thresh}, open("gib_model.pki", "wb"))


def avg_transition_prob(l, log_prob_mat):
    """ Return the average transition prob from l through log_prob_mat. """
    log_prob = 0.0
    transition_ct = 0
    for a, b, c in ngram(3, l):
        log_prob += log_prob_mat[pos[a]][pos[b]][pos[c]]
        transition_ct += 1
    # The exponentiation translates from log probs to probs.
    return math.exp(log_prob / (transition_ct or 1))


if __name__ == "__main__":
    train()

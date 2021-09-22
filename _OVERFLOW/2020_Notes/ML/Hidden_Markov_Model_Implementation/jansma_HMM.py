import os
import io
import sys


class Tagger:
    def __init__(self):
        self.initial_tag_probability = None
        self.transition_probability = None
        self.emission_probability = None
        self.suffix_probability = None

    def load_corpus(self, path):
        if not os.path.isdir(path):
            sys.exit("Input path is not a directory")
        for filename in os.listdir(path):
            filename = os.path.join(path, filename)
            try:
                reader = io.open(filename)
                data = reader.readlines()

                # remove header and footer
                data = data[2:-2]

                # replace utf-16 formatting
                # data = [sentence.replace("\n",'') for sentence in data]
                data = [sentence.replace("\n", "") for sentence in data]
                data = [sentence.replace("\00", "") for sentence in data]

                # split sentence into list on spaces
                data = [sentence.split() for sentence in data]

                output = []
                for innerlist in data:
                    # skip sentences of len < 2
                    if len(innerlist) < 3:
                        continue
                    inneroutput = []
                    for pair in innerlist:
                        pair = pair.split("/")
                        # remove PAIRs that dont split in two
                        if len(pair) != 2:
                            continue
                        # Getting rid of these suckers
                        if pair[0] == "brown_modified":
                            continue
                        else:
                            inneroutput.append((pair[0].lower(), pair[1]))
                    # dont include sentences with 1 or fewer pairs
                    if len(inneroutput) < 2:
                        continue
                    output.append(inneroutput)

                return output
            except IOError:
                sys.exit("Cannot read file")

    def initialize_probabilities(self, sentences):
        if type(sentences) != list:
            sys.exit("Incorrect input to method")

        def ifin_add(var, dic):
            # Helper function to count
            if var in dic:
                dic[var] += 1
            else:
                dic[var] = 1

        def ifin_div(var, dic, divisor, v_size):
            # Helper function to divide WITH SMOOTHING
            if var in dic:
                dic[var] = (dic[var] + 1) / (divisor + v_size)
            else:
                dic[var] = 1 / (divisor + v_size)

        TAG = {}
        WORD = {}
        TAG2 = {}
        INIT = {}
        SUFFIX = {}
        for sentence in sentences:
            for i in range(len(sentence)):
                word, tag = sentence[i][0], sentence[i][1]
                # count initial tag of sentence
                if i == 0:
                    ifin_add(tag, INIT)

                # Tag counts for all sentences C(ti)
                ifin_add(tag, TAG)

                # Tag_counts for word-tag C(ti,wi)
                if word not in WORD:
                    WORD[word] = {}
                ifin_add(tag, WORD[word])

                suffix = word[-2:]
                # Tag_counts for suffix-tag C(ti,wi-2)
                if suffix not in SUFFIX:
                    SUFFIX[suffix] = {}
                ifin_add(tag, SUFFIX[suffix])

                # tag-tag counts C(ti,ti-1)
                if i > 0:
                    to_tag = tag
                    from_tag = sentence[i - 1][1]
                    if from_tag not in TAG2:
                        TAG2[from_tag] = {}
                    ifin_add(to_tag, TAG2[from_tag])

        # Convert counts to probabilities
        tags = list(TAG.keys())
        words = list(WORD.keys())
        suffixes = list(SUFFIX.keys())
        vocab_size = len(words)
        for tag in tags:
            # initial probabilities
            ifin_div(tag, INIT, len(sentences), vocab_size)

            # emission probabilities
            for word in words:
                ifin_div(tag, WORD[word], TAG[tag], vocab_size)
            # suffix probabilities
            for suff in suffixes:
                ifin_div(tag, SUFFIX[suff], TAG[tag], len(suffixes))

            # transition probabilities
            for to_tag in tags:
                ifin_div(to_tag, TAG2[tag], TAG[tag], vocab_size)

        self.initial_tag_probability = INIT
        self.transition_probability = TAG2
        self.emission_probability = WORD
        self.suffix_probability = SUFFIX
        return

    def viterbi_decode(self, sentence):
        if type(sentence) != str:
            sys.exit("Incorrect input to method")

        sentence = sentence.lower().split()

        tags = list(self.initial_tag_probability.keys())

        # List of dictionaries so i dont have to remember which POS is which index
        viterb = [
            {tag: j for (tag, j) in zip(tags, range(len(tags)))}
            for i in range(len(sentence))
        ]
        backp = [
            {tag: j for (tag, j) in zip(tags, range(len(tags)))}
            for i in range(len(sentence))
        ]

        # Calculate the self.initial_tag_probabilityial probabilities
        for tag in tags:
            if sentence[0] in self.emission_probability:
                viterb[0][tag] = (
                    self.initial_tag_probability[tag]
                    * self.emission_probability[sentence[0]][tag]
                )
            else:
                viterb[0][tag] = 0.0
            backp[0][tag] = 0

        # Calculating the lattice
        for t in range(1, len(sentence)):
            for tag in tags:
                # The backwards probability for POS = P(t-1,s')*P(s'->s)*P(w,s)
                if sentence[t] in self.emission_probability:
                    vals = {
                        prev_tag: viterb[t - 1][prev_tag]
                        * self.transition_probability[prev_tag][tag]
                        * self.emission_probability[sentence[t]][tag]
                        for prev_tag in tags
                    }
                else:
                    vals = {
                        prev_tag: viterb[t - 1][prev_tag]
                        * self.transition_probability[prev_tag][tag]
                        * self.suffix_probability[sentence[t][-2:]][tag]
                        for prev_tag in tags
                    }
                viterb[t][tag] = vals[max(vals, key=vals.get)]
                backp[t][tag] = max(vals, key=vals.get)

        # extracting highest value POS
        prob_seq = []
        t = len(sentence) - 1
        best_backpath = max(viterb[t], key=viterb[t].get)
        prob_seq.append(best_backpath)
        for i in range(0, len(sentence) - 1):
            t = len(sentence) - i - 1
            best_backpath = backp[t][best_backpath]
            prob_seq.append(best_backpath)
        return prob_seq[::-1]


if __name__ == "__main__":
    PATH = "C:\\Users\\harri\\Desktop\\NLP Assignment 2\\brown_modified_pos"
    SENTENCE1 = "The Secretariat is expected to race tomorrow ."
    SENTENCE2 = "People continue to enquire the reason for the race for outer space ."

    tag = Tagger()
    sentences = tag.load_corpus(PATH)
    tag.initialize_probabilities(sentences)
    print("Encoding probabilities...", "\n")
    print("INPUT: ", SENTENCE1)
    print(tag.viterbi_decode(SENTENCE1))
    print("INPUT: ", SENTENCE2)
    print(tag.viterbi_decode(SENTENCE2))

---
title: "A Visual Survey of Data Augmentation in NLP"
date: 2020-05-16T22:22:30-04:00
last_modified_at: 2020-10-08T00:00:00-00:00
categories:
  - nlp
  - data augmentation
classes: wide
excerpt: An extensive overview of text data augmentation techniques for Natural Language Processing
header:
  og_image: /images/semantic-invariance-nlp.png
  teaser: /images/semantic-invariance-nlp.png
---

Unlike Computer Vision where using image data augmentation is standard practice, augmentation of text data in NLP is pretty rare. Trivial operations for images such as rotating an image a few degrees or converting it into grayscale doesn't change its semantics. This presence of semantically invariant transformation made augmentation an essential toolkit in Computer Vision research.

![Challenge of Semantically Invariant Transformation in NLP](/images/semantic-invariance-nlp.png){: .align-center}

I was curious if there were attempts at developing augmentation techniques for NLP and explored the existing literature. In this post, I will give an overview of the current approaches for text data augmentation based on my findings.

## NLP Data Augmentation Techniques

## 1. Lexical Substitution

This line of work tries to substitute words present in a text without changing the meaning of the sentence.

### a. Thesaurus-based substitution

In this technique, we take a random word from the sentence and replace it with its synonym using a Thesaurus. For example, we could use the [WordNet](https://wordnet.princeton.edu/) database for English to look up the synonyms and then perform the replacement. It is a manually curated database with relations between words.

![Thesaurus-based substitution](/images/nlp-aug-wordnet.png){: .align-center}

[Zhang et al.](https://arxiv.org/abs/1509.01626) used this technique in their 2015 paper "Character-level Convolutional Networks for Text Classification". [Mueller et al.](https://www.aaai.org/ocs/index.php/AAAI/AAAI16/paper/download/12195/12023) used a similar strategy to generate additional 10K training examples for their sentence similarity model. This technique was also used by [Wei et al.](https://arxiv.org/abs/1901.11196) as one of the techniques in their pool of four random augmentations in the "Easy Data Augmentation" paper.

For implementation, NLTK provides a programmatic [access](https://www.nltk.org/howto/wordnet.html) to WordNet. You can also use the [TextBlob API](https://textblob.readthedocs.io/en/dev/quickstart.html#wordnet-integration). Additionally, there is a database called [PPDB](http://paraphrase.org/#/download) containing millions of paraphrases that you can download and use programmatically.

### b. Word-Embeddings Substitution

In this approach, we take pre-trained word embeddings such as Word2Vec, GloVe, FastText, Sent2Vec, and use the nearest neighbor words in the embedding space as the replacement for some word in the sentence.

[Jiao et al.](https://arxiv.org/abs/1909.10351) used this technique with GloVe embeddings in their paper "_TinyBert_" to improve the generalization of their language model on downstream tasks. [Wang et al.](https://www.aclweb.org/anthology/D15-1306.pdf) used it to augment tweets needed to learn a topic model.

![Nearest Neighbors with Word Vectors](/images/nlp-aug-embedding.png){: .align-center}

For example, you can replace the word with the 3-most similar words and get three variations of the text.

![Augmenting text with word embeddings](/images/nlp-aug-embedding-example.png){: .align-center}

It's easy to use packages like Gensim to access pre-trained word vectors and get the nearest neighbors. For example, here we find the synonyms for the word 'awesome' using word vectors trained on tweets.

```python
# pip install gensim
import gensim.downloader as api

model = api.load('glove-twitter-25')
model.most_similar('awesome', topn=5)
```

You will get back the 5 most similar words along with the cosine similarities.

```python
[('amazing', 0.9687871932983398),
 ('best', 0.9600659608840942),
 ('fun', 0.9331520795822144),
 ('fantastic', 0.9313924312591553),
 ('perfect', 0.9243415594100952)]
```

### c. Masked Language Model

Transformer models such as BERT, ROBERTA, and ALBERT have been trained on a large amount of text using a pretext task called "Masked Language Modeling" where the model has to predict masked words based on the context.

This can be used to augment some text. For example, we could use a pre-trained BERT model, mask some parts of the text, and ask the BERT model to predict the token for the mask.

![Masked Word Prediction](/images/nlp-aug-bert-mlm.png){: .align-center}

Thus, we can generate variations of a text using the mask predictions. Compared to previous approaches, the generated text is more grammatically coherent as the model takes context into account when making predictions.

![Text Augmentation using BERT](/images/nlp-aug-bert-augmentations.png){: .align-center}

This is easy to implement with open-source libraries such as [transformers](https://huggingface.co/transformers/) by Hugging Face. You can set the token you want to replace with `<mask>` and generate predictions.

```python
from transformers import pipeline
nlp = pipeline('fill-mask')
nlp('This is <mask> cool')
```

```python
[{'score': 0.515411913394928,
  'sequence': '<s> This is pretty cool</s>',
  'token': 1256},
 {'score': 0.1166248694062233,
  'sequence': '<s> This is really cool</s>',
  'token': 269},
 {'score': 0.07387523353099823,
  'sequence': '<s> This is super cool</s>',
  'token': 2422},
 {'score': 0.04272908344864845,
  'sequence': '<s> This is kinda cool</s>',
  'token': 24282},
 {'score': 0.034715913236141205,
  'sequence': '<s> This is very cool</s>',
  'token': 182}]
```

However, one caveat of this method is that deciding which part of the text to mask is not trivial. You will have to use heuristics to decide the mask, otherwise, the generated text might not retain the meaning of the original sentence.

[Garg. et al.](https://arxiv.org/abs/2004.01970) use this idea for generating adversarial examples for text classification.

![](/images/bae-adversarial-attack.jpeg){:.align-center}  
Figure: MLM augmentation via replacement or insertion ([Source](https://arxiv.org/abs/2004.01970))
{: .text-center}

### d. TF-IDF based word replacement

This augmentation method was proposed by [Xie et al.](https://arxiv.org/abs/1904.12848) in the Unsupervised Data Augmentation paper. The basic idea is that words that have <span style="color: #d52f2f;">low TF-IDF scores</span> are uninformative and thus can be replaced without affecting the ground-truth labels of the sentence.

![TF-IDF based word replacement](/images/nlp-aug-tf-idf-word-replacement.png){: .align-center}

The words that replace the original word are chosen by calculating TF-IDF scores of words over the whole document and taking the lowest ones. You can refer to the [code implementation](https://github.com/google-research/uda/blob/master/text/augmentation/word_level_augment.py) for this in the original paper.

## 2. Back Translation

In this approach, we leverage machine translation to paraphrase a text while retraining the meaning. [Xie et al.](https://arxiv.org/abs/1904.12848) used this method to augment the unlabeled text and learn a semi-supervised model on IMDB dataset with only 20 labeled examples. Their model outperformed the previous state-of-the-art model trained on 25,000 labeled examples.

The back-translation process is as follows:

- Take some sentence (e.g. in English) and translate to another Language e.g. French
- Translate the French sentence back into an English sentence
- Check if the new sentence is different from our original sentence. If it is, then we use this new sentence as an augmented version of the original text.

![Idea of Back-Translation](/images/nlp-aug-back-translation.png){: .align-center}

You can also run back-translation using different languages at once to generate more variations. As shown below, we translate an English sentence to a target language and back again to English for three target languages: French, Mandarin, and Italian.

![Multi-step Back-Translation](/images/nlp-aug-backtranslation-multi.png){: .align-center}

This technique was also used in the [1st place solution](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/discussion/52557) for the "Toxic Comment Classification Challenge" on Kaggle. The winner used it for both training-data augmentations as well as during test-time where the predicted probabilities for English sentence along with back-translation using three languages(French, German, Spanish) were averaged to get the final prediction.

For the implementation of back-translation, you can use TextBlob. Alternatively, you can also use [Google Sheets](https://amitness.com/2020/02/back-translation-in-google-sheets/) to apply Google Translate for free. You can also use [MarianMT](https://amitness.com/back-translation/) for back-translation.

## 3. Text Surface Transformation

These are simple pattern matching transformations applied using regex and was introduced by [Claude Coulombe](https://arxiv.org/abs/1812.04718) in his paper.

In the paper, he gives an example of transforming verbal forms from contraction to expansion and vice versa. We can generate augmented texts by applying this.

![Contraction and Expansion of Text](/images/nlp-aug-contraction.png){: .align-center}

Since the transformation should not change the meaning of the sentence, we can see that this can fail in case of expanding ambiguous verbal forms like:

![Ambiguity in verbal form expansion](/images/nlp-aug-contraction-ambiguity.png){: .align-center}

To resolve this, the paper proposes that we allow ambiguous contractions but skip ambiguous expansion.

![Resolving ambiguity in verbal form expansion](/images/nlp-aug-contraction-solution.png){: .align-center}

You can find a list of contractions for the English language [here](https://en.wikipedia.org/wiki/Wikipedia%3aList_of_English_contractions). For expansion, you can use the [contractions](https://github.com/kootenpv/contractions) library in Python.

## 4. Random Noise Injection

The idea of these methods is to inject noise in the text so that the model trained is robust to perturbations.

### a. Spelling error injection

In this method, we add spelling errors to some random word in the sentence. These spelling errors can be added programmatically or using a mapping of common spelling errors such as [this list](https://github.com/makcedward/nlpaug/blob/master/model/spelling_en.txt) for English.

![Spelling Error Injection](/images/nlp-aug-spelling-example.png){: .align-center}

### b. QWERTY Keyboard Error Injection

This method tries to simulate common errors that happen when typing on a QWERTY layout keyboard due to keys that are very near to each other. The errors are injected based on keyboard distance.

![QUERTY Keyboard Error Injection](/images/nlp-aug-keyboard-error-example.png){: .align-center}

### c. Unigram Noising

This method has been used by [Xie et al.](https://arxiv.org/abs/1703.02573) and the [UDA](https://arxiv.org/abs/1904.12848) paper. The idea is to perform replacement with words sampled from the unigram frequency distribution. This frequency is basically how many times each word occurs in the training corpus.

![Unigram Noising](/images/nlp-aug-unigram-noise.png){: .align-center}

### d. Blank Noising

This method has been proposed by [Xie et al.](https://arxiv.org/abs/1703.02573) in their paper. The idea is to replace a random word with a placeholder token. The paper uses "\_" as the placeholder token. In the paper, they use it as a way to avoid overfitting on specific contexts as well as a smoothing mechanism for the language model. The technique helped improve perplexity and BLEU scores.

![Blank Noising](/images/nlp-aug-blank-noising.png){: .align-center}

### e. Sentence Shuffling

This is a naive technique where we shuffle sentences present in a training text to create an augmented version.

![Sentence Shuffling](/images/nlp-aug-sentence-shuffle.png){: .align-center}

### f. Random Insertion

This technique was proposed by [Wei et al.](https://arxiv.org/abs/1901.11196) in their paper "Easy Data Augmentation". In this technique, we first choose a random word from the sentence that is not a stop word. Then, we find its synonym and insert that into a random position in the sentence.

![Random Insertion](/images/nlp-aug-random-insertion.png){: .align-center}

### g. Random Swap

This technique was also proposed by [Wei et al.](https://arxiv.org/abs/1901.11196) in their paper "Easy Data Augmentation". The idea is to randomly swap any two words in the sentence.

![Random Swap](/images/nlp-aug-random-swap.png){: .align-center}

### h. Random Deletion

This technique was also proposed by [Wei et al.](https://arxiv.org/abs/1901.11196) in their paper "Easy Data Augmentation". In this, we randomly remove each word in the sentence with some probability p.

![Random Deletion](/images/nlp-aug-random-deletion.png){: .align-center}

## 5. Instance Crossover Augmentation

This technique was introduced by [Luque](https://arxiv.org/abs/1909.11241) in his paper on sentiment analysis for TASS 2019. It is inspired by the chromosome crossover operation that happens in genetics.  
In the method, a tweet is divided into two halves and two random tweets of the same polarity(i.e. positive/negative) have their halves swapped. The hypothesis is that even though the result will be ungrammatical and semantically unsound, the new text will still preserve the sentiment.

![Instance Crossover Augmentation](/images/nlp-aug-instance-crossover.png){: .align-center}

This technique had no impact on the accuracy but helped with the F1 score in the paper showing that it helps minority classes such as the Neutral class with fewer tweets.

![Instance Crossover Augmentation Impact on F1](/images/nlp-aug-instance-crossover-result.png){: .align-center}

## 6. Syntax-tree Manipulation

This technique has been used in the paper by [Coulombe](https://arxiv.org/abs/1812.04718). The idea is to parse and generate the dependency tree of the original sentence, transform it using rules, and generate a paraphrased sentence.  
For example, one transformation that doesn't change the meaning of the sentence is the transformation from active voice to the passive voice of sentence and vice versa.

![Syntax Tree Manipulation for Voice Change](/images/nlp-aug-syntax-tree-manipulation.png){: .align-center}

## 7. MixUp for Text

Mixup is a simple yet effective image augmentation technique introduced by [Zhang et al.](https://arxiv.org/abs/1710.09412) in 2017. The idea is to combine two random images in a mini-batch in some proportion to generate synthetic examples for training. For images, this means combining image pixels of two different classes. It acts as a form of regularization during training.

![Original Mixup Algorithm for Vision](/images/nlp-aug-mixup-image.png){: .align-center}

Bringing this idea to NLP, [Guo et al.](https://arxiv.org/abs/1905.08941) modified Mixup to work with text. They propose two novel approaches for applying Mixup to text:

### a. wordMixup:

In this method, two random sentences in a mini-batch are taken and they are zero-padded to the same length. Then, their word embeddings are combined in some proportion. The resulting word embedding is passed to the usual flow for text classification. The cross-entropy loss is calculated for both the labels of the original text in the given proportion.

![Mixup on Word Embeddings](/images/nlp-aug-wordmixup.png){: .align-center}

### b. sentMixup:

In this method, two sentences are taken and they are zero-padded to the same length. Then, their word embeddings are passed through LSTM/CNN encoder and we take the last hidden state as sentence embedding. These embeddings are combined in a certain proportion and then passed to the final classification layer. The cross-entropy loss is calculated based on both the labels of original sentences in the given proportion.

![Mixup on Sentence Embeddings](/images/nlp-aug-sentmixup.png){: .align-center}

## 8. Generative Methods

This line of work tries to generate additional training data while preserving the class label.

### a. Conditional Pre-trained Language Models

This technique was first proposed by Anaby-Tavor et al. in their paper ["Not Enough Data? Deep Learning to the Rescue!](https://arxiv.org/abs/1911.03118). A recent paper from [Kumar et al.](https://arxiv.org/abs/2003.02245) evaluated this idea across multiple transformer-based pre-trained models. The problem formulation is as follows:

- Prepend the class label to each text in your training data

![Adding SEP and EOS tokens](/images/nlp-aug-generation-training.png){: .align-center}

- Finetune a large pre-trained language model(BERT/GPT2/BART) on this modified training data. For GPT2, the fine-tuning task is generation while for BERT, the goal would be a masked token prediction.

![Finetuning GPT-2 on labels and text](/images/nlp-aug-gpt2-finetuning.png){: .align-center}

- Using the fine-tuned language model, new samples can be generated by using the class label and a few initial words as the prompt for the model. The paper uses 3 initial words of each training text and also generates one synthetic example for each point in the training data.

![Generating new samples with GPT-2](/images/nlp-aug-gpt2.png){: .align-center}

## Implementation

Libraries like [nlpaug](https://github.com/makcedward/nlpaug) and [textattack](https://github.com/QData/TextAttack) provide simple and consistent API to apply the above NLP data augmentation methods in Python. They are framework agnostic and can be easily integrated into your pipeline.

## Conclusion

My takeaway from the literature review is that many of these NLP augmentation methods are very task-specific and their impact on performance has been studied for some particular use-cases only. It would be an interesting research to systematically compare these methods and analyze their impact on performance for many tasks.

## Citation Info (BibTex)

If you found this blog post useful, please consider citing it as:

```
@misc{chaudhary2020nlpaugment,
  title   = {A Visual Survey of Data Augmentation in NLP},
  author  = {Amit Chaudhary},
  year    = 2020,
  note    = {\url{https://amitness.com/2020/05/data-augmentation-for-nlp}
}
```

## References

- Qizhe Xie, et al. ["Unsupervised Data Augmentation for Consistency Training"](https://arxiv.org/abs/1904.12848)
- Claude Coulombe ["Text Data Augmentation Made Simple By Leveraging NLP Cloud APIs"](https://arxiv.org/abs/1812.04718)
- Xiaoqi Jiao, et al. ["TinyBERT: Distilling BERT for Natural Language Understanding"](https://arxiv.org/abs/1909.10351)
- Xiang Zhang, et al. ["Character-level Convolutional Networks for Text Classification"](https://arxiv.org/abs/1509.01626)
- Franco M. Luque ["Atalaya at TASS 2019: Data Augmentation and Robust Embeddings for Sentiment Analysis"](https://arxiv.org/abs/1909.11241)
- Ziang Xie, et al. ["Data Noising as Smoothing in Neural Network Language Models"](https://arxiv.org/abs/1703.02573)
- Hongyu Guo, et al. ["Augmenting Data with Mixup for Sentence Classification: An Empirical Study"](https://arxiv.org/abs/1905.08941)
- Hongyi Zhang, et al. ["mixup: Beyond Empirical Risk Minimization"](https://arxiv.org/abs/1710.09412)
- Varun Kumar, et al. ["Data Augmentation using Pre-trained Transformer Models"](https://arxiv.org/abs/2003.02245)
- Jason Wei, et al. ["EDA: Easy Data Augmentation Techniques for Boosting Performance on Text Classification Tasks"](https://arxiv.org/abs/1901.11196)
- Ateret Anaby-Tavor, et al. ["Not Enough Data? Deep Learning to the Rescue!"](https://arxiv.org/abs/1911.03118)

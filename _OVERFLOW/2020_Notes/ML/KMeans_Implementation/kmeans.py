import pandas as pd
import string
import numpy as np
import copy
import argparse

############################################################################


class Kmeans:
    def __init__(self, k=3):
        self.K = k
        self.centroids = [0 for i in range(k)]

    def Jaccard(self, set1, set2):
        return 1 - (len(set1.intersection(set2)) / len(set1.union(set2)))

    def Compare_Distances_LT(self, dis1, prev_min_dis, set1, prev_min_set):
        if dis1 < prev_min_dis:
            return dis1, set1
        else:
            return prev_min_dis, prev_min_set

    def NearestCluster(self, sentence_set):
        nearest_cluster = -1
        min_distance = 2
        for i, centroid in enumerate(self.centroids):
            cluster_distance = self.Jaccard(sentence_set, centroid)
            min_distance, nearest_cluster = self.Compare_Distances_LT(
                cluster_distance, min_distance, i, nearest_cluster
            )
        return nearest_cluster

    def AssignClusters(self, data):
        cluster_assignments = []
        for sentence_set in data:
            cluster_assignments.append(self.NearestCluster(sentence_set))
        return np.array(cluster_assignments)

    def IntraCentroidDistanceFromPoint(self, point, cluster_data):
        cluster_sse = 0
        for sentence_set in cluster_data:
            cluster_sse += (self.Jaccard(sentence_set, point)) ** 2
        return cluster_sse

    def UpdateCentroids(self, data, cluster_assignments):
        for cluster in range(self.K):
            min_distance = 1e15
            min_set = set()
            cluster_data = data[cluster_assignments == cluster]
            for sentence_set in cluster_data:
                set_distance = self.IntraCentroidDistanceFromPoint(
                    sentence_set, cluster_data
                )
                min_distance, min_set = self.Compare_Distances_LT(
                    set_distance, min_distance, sentence_set, min_set
                )
            self.centroids[cluster] = min_set

    def SSE(self, data):
        cluster_assignments = self.predict(data)
        sse = 0
        for i, centroid in enumerate(self.centroids):
            cluster_data = data[cluster_assignments == i]
            sse += self.IntraCentroidDistanceFromPoint(centroid, cluster_data)
        return sse

    def Random_Initialization(self, data):
        self.centroids = np.random.choice(data, size=self.K, replace=False)

    def fit(self, data, stopping_rounds=2):
        self.Random_Initialization(data)
        stopping = False
        i = 0
        rounds_same = 0
        while not stopping:
            print("round: ", i)
            np.random.shuffle(data)
            prev_centroids = copy.deepcopy(self.centroids)
            cluster_assignments = self.AssignClusters(data)
            self.UpdateCentroids(data, cluster_assignments)
            same = (prev_centroids == self.centroids).all()
            if same:
                rounds_same += 1
            else:
                rounds_same = 1
            if rounds_same > stopping_rounds:
                stopping = True
            print(np.bincount(cluster_assignments))

            i += 1

    def predict(self, data):
        return self.AssignClusters(data)


######################################################################

df = pd.read_csv("Health-Tweets/usnewshealth.txt", sep="|", header=None)
df.drop([0, 1], axis=1, inplace=True)
df.columns = ["tweet"]
df.tweet = df.tweet.str.replace("#", "")
df.tweet = df.tweet.str.replace("@\w+", "")
df.tweet = df.tweet.str.replace("http\S+|www.\S+", "")
df.tweet = df.tweet.str.lower()
df.tweet = df.tweet.apply(
    lambda x: "".join([i for i in x if i not in string.punctuation])
)
df = df.tweet
df = df.str.split()


data = []
for _list in df.values:
    data.append(set(_list))
data = np.array(data)

np.random.seed(seed=0)

ap = argparse.ArgumentParser()

ap.add_argument(
    "-k", "--kclusters", required=True, help="Number of clusters for KMeans"
)
args = vars(ap.parse_args())


k = int(args["kclusters"])

kmeans = Kmeans(k=k)
print("Clustering data with {} clusters".format(k))
kmeans.fit(data)
print("\n")
print("Final CLuster Sizes:")
print(np.bincount(kmeans.predict(data)))
print("\n")
print("Centroids")
print(kmeans.centroids, "\n")
print("Kmeans SSE ({} clusters): ".format(k), kmeans.SSE(data))

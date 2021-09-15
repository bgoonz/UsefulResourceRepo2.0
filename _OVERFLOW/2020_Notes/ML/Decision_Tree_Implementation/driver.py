from DecisionTree import *
import pandas as pd
from sklearn import model_selection

# https://archive.ics.uci.edu/ml/datasets/Adult
header = ["sex", "Higher-Ed", "education-num", "hours-per-week", "class"]
df = pd.read_csv(
    "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
    header=None,
    names=[
        "age",
        "workclass",
        "fnlwgt",
        "education",
        "education-num",
        "marital-status",
        "occupation",
        "relationship",
        "race",
        "sex",
        "capital-gain",
        "capital-loss",
        "hours-per-week",
        "native-country",
        "class",
    ],
)
df["sex"] = pd.get_dummies(df["sex"])
df["Higher-Ed"] = df["education"].isin([" Bachelors", " Masters", " Doctorate"])

df.drop(df.columns[~df.columns.isin(header)], axis=1, inplace=True)
df = df.loc[:, header]

lst = df.values.tolist()
t = build_tree(lst, 0, 0, header)
print_tree(t)

print("********** Leaf nodes ****************")
leaves = getLeafNodes(t)
for leaf in leaves:
    print("id = " + str(leaf.id) + " depth =" + str(leaf.depth))
print("********** Non-leaf nodes ****************")
innerNodes = getInnerNodes(t)
for inner in innerNodes:
    print("id = " + str(inner.id) + " depth =" + str(inner.depth))

trainDF, testDF = model_selection.train_test_split(df, test_size=0.2)
train = trainDF.values.tolist()
test = testDF.values.tolist()

t = build_tree(train, 0, 0, header)
print("*************Tree before pruning*******")
print_tree(t)
acc = computeAccuracy(test, t)
print("Accuracy on test = " + str(acc))

t_pruned = post_pruning(test, t)
print("*************Tree after pruning*******")
print_tree(t_pruned)
acc = computeAccuracy(test, t_pruned)
print("Accuracy on test = " + str(acc))

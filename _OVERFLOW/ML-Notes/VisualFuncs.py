import matplotlib.pyplot as plt
import numpy as np
from os import system
from sklearn import tree
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd
from matplotlib.colors import ListedColormap


def Visual_Decision_Regions(cols, X, y, clf):
    x_min, x_max = X[:, cols[0]].min() - 1, X[:, cols[0]].max() + 1
    y_min, y_max = X[:, cols[1]].min() - 1, X[:, cols[1]].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01),
                         np.arange(y_min, y_max,0.01))

    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    fig_ = plt.figure()
    axis_ = fig_.add_subplot(111)
    axis_.scatter(X[:, cols[0]], X[:, cols[1]], c=y, s=20, edgecolor='k')
    axis_.contourf(xx, yy, Z, alpha=0.4)
    plt.show()

def Visual_Dec_Tree(X, trees):
    dotfile = open("dtree2.dot", 'w')
    tree.export_graphviz(trees, out_file = dotfile)
    dotfile.close()
    system('$ dot -Tpng dtree2.dot -o tree.png')


    
def LogisticVDR( X, y, clf):
    """
    2D Visualization function for logistic regression. Must input a DataFrame and a fitted classifier. Will ouput the decision boundary.
    """
    if type(X)=='pd.core.frame.DataFrame':
        X = X.values
    if type(y)=='pd.core.frame.DataFrame':
        y = y.values 
            
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01),
                         np.arange(y_min, y_max, 0.01))
    grid = np.c_[xx.ravel(), yy.ravel()]
    probs = clf.predict_proba(grid)[:,1].reshape(xx.shape)
    f, ax = plt.subplots(figsize=(8, 6))
    contour = ax.contourf(xx, yy, probs, 25, cmap="RdBu",
                      vmin=0, vmax=1)
    ax_c = f.colorbar(contour)
    ax_c.set_label("$P(y = 1)$")
    ax_c.set_ticks([0, .25, .5, .75, 1])

    ax.scatter(X[:,0], X[:, 1], c=y, s=50,
           cmap="RdBu", vmin=-.2, vmax=1.2,
           edgecolor="white", linewidth=1)
    plt.title('Decision Boundary')
    plt.show()
        
    
    

def VDR(X, y, classifier, resolution=0.02, figsize = (12,8), class_names=['class1', 'class2']):
   # setup marker generator and color map
   markers = ('s', 'o', '^', 'v')
   colors = ('red', 'green', 'purple', 'blue', 'cyan')
   cmap = ListedColormap(colors[:len(np.unique(y))])

   # plot the decision surface
   x1_min, x1_max = X[:, 0].min() - 1, X[:, 0].max() + 1
   x2_min, x2_max = X[:, 1].min() - 1, X[:, 1].max() + 1
   xx1, xx2 = np.meshgrid(np.arange(x1_min, x1_max, resolution),
   np.arange(x2_min, x2_max, resolution))
   Z = classifier.predict(np.array([xx1.ravel(), xx2.ravel()]).T)
   Z = Z.reshape(xx1.shape)
   plt.figure(figsize=figsize)
   plt.contourf(xx1, xx2, Z, alpha=0.5, cmap= cmap)
   plt.xlim(xx1.min(), xx1.max())
   plt.ylim(xx2.min(), xx2.max())

   # plot all samples
   X_test, y_test = X[:, :], y[:]
   
   for idx, cl in enumerate(np.unique(y)):
      plt.scatter(x=X[y == cl, 0], y=X[y == cl, 1],
               alpha=0.8, c=cmap(idx),
               marker=markers[idx], label=class_names[idx])
   plt.legend()
   return None



def FeatureImportances(X, Y):
    f,ax=plt.subplots(2,2,figsize=(15,12))
    model=RandomForestClassifier(n_estimators=100,random_state=0)
    model.fit(X,Y)
    pd.Series(model.feature_importances_,X.columns).sort_values(ascending=True).plot.barh(width=0.8,ax=ax[0,0])
    ax[0,0].set_title('Feature Importance in Random Forests')
    model=AdaBoostClassifier(n_estimators=200,random_state=0)
    model.fit(X,Y)
    pd.Series(model.feature_importances_,X.columns).sort_values(ascending=True).plot.barh(width=0.8,ax=ax[0,1],color='#ddff11')
    ax[0,1].set_title('Feature Importance in AdaBoost')
    model=GradientBoostingClassifier(n_estimators=500,random_state=0)
    model.fit(X,Y)
    pd.Series(model.feature_importances_,X.columns).sort_values(ascending=True).plot.barh(width=0.8,ax=ax[1,0],cmap='RdYlGn_r')
    ax[1,0].set_title('Feature Importance in Gradient Boosting')
    model=xg.XGBClassifier(n_estimators=900)
    model.fit(X,Y)
    pd.Series(model.feature_importances_,X.columns).sort_values(ascending=True).plot.barh(width=0.8,ax=ax[1,1],color='#FD0F00')
    ax[1,1].set_title('Feature Importance in XgBoost')
    plt.show()

def OneClassVDR(X, y, clf, resolution = 0.02):
    """
    Visual Decision Region function for Anomaly Detection w/ OneClassSVM in Sklearn
    """
    x1_min, x1_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    x2_min, x2_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x1_min, x1_max, resolution),
   np.arange(x2_min, x2_max, resolution))
    # plot the line, the points, and the nearest vectors to the plane
    Z = clf.decision_function(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    plt.figure()
    plt.contourf(xx, yy, Z, levels=np.linspace(Z.min(), 0, 7), cmap=plt.cm.PuBu)
    a = plt.contour(xx, yy, Z, levels=[0], linewidths=2, colors='darkred')
    plt.contourf(xx, yy, Z, levels=[0, Z.max()], colors='palevioletred')
    s = 40
    b1 = plt.scatter(X[:, 0], X[:, 1], c='white', s=s, edgecolors='k')
    plt.axis('tight')
    plt.title("Novelty Detection")
    plt.legend([a.collections[0]],
               ['Learned Frontier'],
        loc="upper left")
    plt.show()
 

def plot_svc_decision_function(model, ax=None, plot_support=True):
    """Plot the decision function for a 2D SVC"""
    if ax is None:
        ax = plt.gca()
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()
    
    # create grid to evaluate model
    x = np.linspace(xlim[0], xlim[1], 30)
    y = np.linspace(ylim[0], ylim[1], 30)
    Y, X = np.meshgrid(y, x)
    xy = np.vstack([X.ravel(), Y.ravel()]).T
    P = model.decision_function(xy).reshape(X.shape)
    
    # plot decision boundary and margins
    ax.contour(X, Y, P, colors='k',
               levels=[-1, 0, 1], alpha=0.5,
               linestyles=['--', '-', '--'])
    
    # plot support vectors
    if plot_support:
        ax.scatter(model.support_vectors_[:, 0],
                   model.support_vectors_[:, 1],
                   s=300, linewidth=1, facecolors='none');
    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    
    plt.scatter(X[:, 0], X[:, 1], c=y, s=50, cmap='autumn')
    

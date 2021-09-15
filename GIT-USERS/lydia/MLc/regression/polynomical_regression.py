import numpy as np 
import matplotlib.pyplot as plt 
import pandas as pd 

dataset = pd.read_csv('Salaries.csv')
X = dataset.iloc[:, 1:2].values 
y = dataset.iloc[:, 2].values

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X, y)

from sklearn.preprocessing import PolynomicalFeatures
poly_reg = PolynomicalFeatures(degree = 2)
X_poly = poly_reg.fit_transform(X)
poly_reg.fit(X_poly, y)
lin_reg = LinearRegression()
lin_reg.fit(X_poly, y)

plt.scatter(X, y, color = 'red')
plt.plot(X, lin_reg.predict(poly_reg.fit_transform(X)), color = 'blue')
plt.title('True or false')
plt.xlabel('Position')
plt.ylabel('Salary')
plt.show()

regressor.predict(5)

lin_reg.predict(poly_reg.fit_transform(5))
class Solution:
    # @param A : list of integers
    # @param B : list of integers
    # @return an integer
    def coverPoints(self, X, Y):
        totalStep = 0
        currentX = X[0]
        currentY = Y[0]
        for i in range(1, len(X)):
            totalStep += max(abs(currentX - X[i]), abs(currentY - Y[i]))
            currentX = X[i]
            currentY = Y[i]
        return totalStep

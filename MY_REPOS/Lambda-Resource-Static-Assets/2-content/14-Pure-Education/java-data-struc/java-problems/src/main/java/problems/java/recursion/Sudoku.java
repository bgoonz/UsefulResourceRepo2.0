package problems.java.recursion;

public class Sudoku
{
    //  backtracking
    private Integer[][] board;
    public Sudoku(Integer[][] board)
    {
        this.board = board;
    }

    boolean solve()
    {
        for(int row = 0; row < 9; ++row)
        {
            for(int col = 0; col < 9; ++col)
            {
                if(board[row][col] != null)
                {
                    continue;
                }

                for(int val = 1; val <= 9; ++val)
                {
                    if(isValid(row, col, val))
                    {
                        board[row][col] = val;
                        if(solve())
                        {
                            return true;
                        }
                        board[row][col] = null;
                    }
                }
                return false;
            }
        }
        return true;
    }



    boolean isValid(int row, int col, Integer val)
    {
        for(int i = 0; i < 9; ++i)
        {
            if(board[i][col] != null && board[i][col] == val)
            {
                return false;
            }
            if(board[row][i] != null && board[row][i] == val)
            {
                return false;
            }

            int rowBoxIdx = 3 * (row / 3) + i / 3;
            int colBoxIdx = 3 * (col / 3) + i % 3;

            if(board[rowBoxIdx][colBoxIdx] != null && board[rowBoxIdx][colBoxIdx] == val)
            {
                return false;
            }
        }
        return true;
    }

    private void printSolution()
    {
        for(int i = 0; i < board.length; ++i)
        {
            for (int j = 0; j < board[0].length; ++j)
            {
                System.out.printf(" %2d ", board[i][j]);
            }
            System.out.println("\n");
        }
    }

    public static void main(String... args)
    {
        Integer[][] board = new Integer[][] {
                {   5,    3, null, null,    7, null, null, null, null},
                {   6, null, null,    1,    9,    5, null, null, null},
                {null,    9,    8, null, null, null, null,    6, null},
                {   8, null, null, null,    6, null, null, null,    3},
                {   4, null, null,    8, null,    3, null, null,    1},
                {   7, null, null, null,    2, null, null, null,    6},
                {null,    6, null, null, null, null,    2,    8, null},
                {null, null, null,    4,    1,    9, null, null,    5},
                {null, null, null, null,    8, null, null,    7,    9}
        };
        Sudoku sudoku = new Sudoku(board);

        if(sudoku.solve())
        {
            sudoku.printSolution();
        }
        else
        {
            System.out.println("Solution does not exist.");
        }
    }
}

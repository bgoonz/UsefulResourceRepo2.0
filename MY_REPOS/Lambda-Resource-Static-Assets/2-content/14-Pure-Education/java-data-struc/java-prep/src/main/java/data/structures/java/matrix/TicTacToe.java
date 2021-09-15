package data.structures.java.matrix;

public class TicTacToe
{
  public static Integer whoWon(Integer[][] board)
  {
    for(int i = 0; i < board.length; ++i)
    {
      if(board[i][0] != null && board[i][0] == board[i][1] && board[i][0] == board[i][2])
      {
        return board[i][0];
      }
      if(board[0][i] != null && board[0][i] == board[1][i] && board[0][i] == board[2][i])
      {
        return board[0][i];
      }
    }

    if(board[0][0] != null && board[0][0] == board[1][1] & board[0][0] == board[2][2])
    {
      return board[0][0];
    }
    if(board[2][0] != null && board[2][0] == board[1][1] && board[2][0] == board[0][2])
    {
      return board[2][0];
    }

    return null;
  }
}

package data.structures.java.matrix;

import org.junit.Test;

import static org.junit.Assert.*;

public class TicTacToeTest
{

  @Test
  public void whoWon()
  {
    Integer [][] board = {
        {0, 1, 0},
        {0, 1, 1},
        {1, 1, 0}
    };

    assertEquals(Integer.valueOf(1),TicTacToe.whoWon(board) );
  }
}
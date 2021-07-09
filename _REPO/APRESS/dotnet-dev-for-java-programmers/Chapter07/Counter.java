

public class Counter implements Runnable
{
    private int count;


    public Counter( int count )
    {
	this.count = count;
    }

    public void run()
    {
	for ( int i = 0; i < count; i++ )
	{
	    System.out.println( "Reached " + i );
	}
    }

    public static void main( String[] args )
    {
	Counter c = new Counter( 10 );
	Thread t = new Thread( c );
	t.start();
    }
}

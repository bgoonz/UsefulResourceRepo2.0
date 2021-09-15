package problems.java.arrays;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static problems.java.common.Common.randomRange;

public class ShuffleCards
{
    static void shuffle(int[] cards)
    {
        for(int i = 0; i < cards.length; ++i)
        {
            int randomIdx = randomRange(i, cards.length);

            int temp = cards[randomIdx];
            cards[randomIdx] = cards[i];
            cards[i] = temp;
        }

    }

    static int[] shuffleWithStreams(int[] cards)
    {
        List<Integer> list = Arrays.stream(cards).boxed().collect(Collectors.toList());
        Collections.shuffle(list);
        return list.stream().mapToInt(x -> x).toArray();
    }

    public static void main(String... args)
    {
        int[] cards = IntStream.rangeClosed(1, 10).toArray();
        ShuffleCards.shuffle(cards);
        System.out.println(Arrays.toString(cards));
        cards = IntStream.rangeClosed(1, 10).toArray();
        ShuffleCards.shuffleWithStreams(cards);
        System.out.println(Arrays.toString(cards));
    }

}

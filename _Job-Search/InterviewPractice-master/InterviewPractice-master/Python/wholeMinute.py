def playlist(songs):

    target = 60

    for i in songs:
        results = 0
        for j in songs:
            x = (i + j)
            if x % target == 0:
                results += 1

    return results


def main():
    songs1 = [4, 10, 50, 90, 30]
    songs2 = [5, 30, 20, 150, 100, 40]
    songs3 = [3, 60, 60, 60]
    print (playlist(songs1))
    print ()
    print (playlist(songs2))
    print ()
    print (playlist(songs3))

main()
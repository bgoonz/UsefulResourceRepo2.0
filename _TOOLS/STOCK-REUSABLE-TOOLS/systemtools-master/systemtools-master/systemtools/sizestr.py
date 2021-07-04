import sys

KB = 1024
MB = KB*1024
GB = MB*1024


def size_str(byte_size):
    """Truncate number to highest significant power of 2 and add suffix."""
    if byte_size > GB:
        return str(round(float(byte_size) / GB, 1)) + 'G'
    if byte_size > MB:
        return str(round(float(byte_size) / MB, 1)) + 'M'
    if byte_size > KB:
        return str(round(float(byte_size) / KB, 1)) + 'K'
    return str(byte_size)


def main():
    import argparse
    ap = argparse.ArgumentParser(
        description='Convert bytes to K, M, or G value')
    ap.add_argument('bytes', type=int,
                    help='integer number of bytes to convert')
    args = ap.parse_args()
    print(size_str(args.bytes))
    return 0


if __name__ == '__main__':
    sys.exit(main())

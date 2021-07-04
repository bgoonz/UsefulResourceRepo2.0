#
# RUN THIS USING py.test
#
from __future__ import print_function
import random
import time

# Search parent directory for imports.
import sys
sys.path.append('../')
from progressbar import ProgressBar


class TestProgressBar(object):

    def test_progress_small(self):
        data_size = 10
        print('Sending', data_size, 'bytes total.')
        bar = ProgressBar(data_size)
        assert not bar
        for i in range(10):
            bar.update(1)

        assert bar
        bar.finish()

        assert len(bar) == data_size


    def test_progress_partial(self):
        data_size = 100
        print('Sending', data_size, 'bytes total.')
        bar = ProgressBar(data_size, 50, '|', fraction=False)
        total = 0
        while data_size > 0:
            send_size = 17
            if send_size > data_size:
                break
            data_size -= send_size
            bar.update(send_size)
            total += send_size
            assert total == len(bar)
            #time.sleep(1)

        bar.finish()
        data_size = 245438958
        bar = ProgressBar(data_size, 50)
        bar.update(data_size - 1)
        bar.finish()
        assert bar.incomplete_size() == 1
        assert bar.progress_size() == data_size - 1


    def test_progress(self):
        data_size = orig_size = 512324
        print('Sending', data_size, 'bytes total.')
        bar = ProgressBar(data_size)
        while data_size:
            send_size = int(random.random() * 65535)
            if send_size > data_size:
                send_size = data_size
                data_size = 0
            else:
                data_size -= send_size
            bar.update(send_size)
            time.sleep(0.25)

        assert len(bar) == orig_size
        assert bar.incomplete_size() == 0

        # Send extra data in error.  This should not cause failure.
        for i in range(3):
            send_size = int(random.random() * 65535)
            bar.update(send_size)

        assert len(bar) == orig_size
        assert bar.incomplete_size() == 0

        bar.finish()

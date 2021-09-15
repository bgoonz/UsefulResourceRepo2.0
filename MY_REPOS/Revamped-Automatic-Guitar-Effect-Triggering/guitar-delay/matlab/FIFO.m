function result = FIFO (command, arg)

    if strcmp(command, 'read')
        result = read_fifo(arg);
    else

        if strcmp(command, 'write')
            write_fifo(arg);
        else

            if strcmp(command, 'init')
                init_fifo();
            end

        end

    end

end

function init_fifo()
    global fifo_buf write_ptr MAX_DELAY; % globalizing variables
    MAX_DELAY = 20000; %Max delay of 20kHz
    fifo_buf = zeros(MAX_DELAY, 1); %buffer = array of all zeros
    write_ptr = 1;
end

function val = read_fifo(delay)% Val = fifo output
    global fifo_buf write_ptr MAX_DELAY;
    % Read delayed values
    % Delay read_ptr by an amount of samples, based on ‘delay'
    read_ptr = mod((write_ptr — 2) — delay + MAX_DELAY, MAX_DELAY) + 1;
    val = fifo_buf(read_ptr);
end

function write_fifo(val)%using output of read_fifo
    global fifo_buf write_ptr MAX_DELAY;
    fifo_buf(write_ptr) = val;
    write_ptr = write_ptr + 1; %increment write_ptr by 1

    if (write_ptr > MAX_DELAY)%0nce write_ptr is greater than max delay, restart
        write_ptr = 1;
    end

end

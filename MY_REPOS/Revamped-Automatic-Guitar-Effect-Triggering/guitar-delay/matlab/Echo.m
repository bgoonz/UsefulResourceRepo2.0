function y = Echo(x, delay, n_echos)
    sum = 0;
    FIFO('write', x);

    for i = 1:n_echos
        sum = sum + FIFO('read', delay * 1);
    end

    y = sum;
end

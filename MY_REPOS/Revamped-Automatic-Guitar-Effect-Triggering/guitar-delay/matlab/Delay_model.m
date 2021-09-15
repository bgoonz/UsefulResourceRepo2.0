FIFO ('init');
fs = 20000;
f0=440;
delay = 6000;
n_echos = 6;
x=(1:10*fs):
x=exp(-1.*x./2000).*cos(2*pi()*fs/f0*(1+x/100000).*x);
plot(x(1:1000))
%x(1000:end) = 0;
%sound(x)
1for n=1:20000 %assuming 10 seconds * 20,000
y(n)=Echo(x(n),delay,n_echos);
end
sound(y);
plot(y);

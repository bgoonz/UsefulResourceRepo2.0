format long
P = 100:100:6000; %Range of Pressure values used
v0 = 0.553; %Initial guess used for Newton's method
V=ones(1,size(P,2));%Array that initially has all value of 1 for specific volume
error = 1; %Initial value of error
for i = 1:size(P,2)%for loop that iterates over every value of pressure
    while error >= 0.0001 %While loop used for newton's method
     f0 =  f(P(i),v0);%VDW equation evaluated at a value of pressure and specific volume
     f0p = df(P(i),v0);%VDW derivative evaluated at a value of pressure and specific volume
     if f0p == 0 %If statement that checks if derivative is 0
        disp('Derivative is 0')
        disp('Cannot find specific volume');
     return
     end
     V(i) = v0 - f0/f0p;%Newtons method
     error = abs(V(i) - v0); %Error used for comparison to original error in while loop
     v0 = V(i); %Resets initial guess for specific volume to previous iteration from Newton's method
    end 
    v0 = 0.553;%Reset
    error = 1;
end
disp(P)
disp(V)
plot(V,P)
title('Pressure vs. Specific volume : CO2  Van Der Waals EOS')
legend('Temperature of 293 Kelvin')
xlabel('v (m^3/kg)')
ylabel('P (kPa)')
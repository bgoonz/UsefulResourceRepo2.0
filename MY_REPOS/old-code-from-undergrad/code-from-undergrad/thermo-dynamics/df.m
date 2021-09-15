function Dvanderwaals = df(P,v)%Function used to evaluate Van Der Waals derivative at a pressure and specific volume
    T = 293; %Constants for equation 
    Tcr = 304.1;
    Pcr = 7380;
    Rbar = 8.31451;
    M = 44.01;
    R = Rbar/M;
    a = (27*(R^2)*(Tcr^2))/(64*Pcr);
    b = (R*Tcr)/(8*Pcr);
    Dvanderwaals = 3*P*v^2 - 2*P*v*b - 2*R*T*v + a;
    %Van Der Waals Derivative set equal to 0
end

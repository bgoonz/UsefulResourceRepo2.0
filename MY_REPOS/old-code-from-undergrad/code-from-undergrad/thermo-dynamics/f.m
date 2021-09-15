function Vanderwaals = f(P,v) %Function used to evaluate Van Der Waals equation at a pressure and specific volume
    T = 293; %Constants for equation 
    Tcr = 304.1;
    Pcr = 7380;
    Rbar = 8.31451;
    M = 44.01;
    R = Rbar/M;
    a = (27*(R^2)*(Tcr^2))/(64*Pcr);
    b = (R*Tcr)/(8*Pcr);
    Vanderwaals = P*v^3 - P*v^2*b - R*T*v^2 + a*v - a*b;
    %Van Der Waals Equation set equal to 0
end
